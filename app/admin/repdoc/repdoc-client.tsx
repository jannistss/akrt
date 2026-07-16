"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, Clock, RefreshCw } from "lucide-react";

type ImportLog = {
  id: string;
  dateiname: string | null;
  typ: string;
  status: string;
  kunden_importiert: number;
  fahrzeuge_importiert: number;
  fehler: string[] | null;
  erstellt_am: string;
};

export function RepdocClient({ logs: initialLogs }: { logs: ImportLog[] }) {
  const [logs, setLogs] = useState<ImportLog[]>(initialLogs);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    kunden_importiert?: number;
    fahrzeuge_importiert?: number;
    fehler_anzahl?: number;
    fehler?: string[];
    error?: string;
  } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.name.endsWith(".csv")) {
      setResult({ success: false, error: "Nur CSV-Dateien werden akzeptiert." });
      return;
    }
    setUploading(true);
    setResult(null);

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch("/api/repdoc-import", { method: "POST", body: form });
      const data = await res.json();
      setResult(data);

      // Refresh logs
      const logsRes = await fetch("/api/repdoc-import?logs=1");
      if (logsRes.ok) {
        const { logs: newLogs } = await logsRes.json();
        if (newLogs) setLogs(newLogs);
      }
    } catch {
      setResult({ success: false, error: "Netzwerkfehler beim Upload." });
    } finally {
      setUploading(false);
    }
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const cardStyle = {
    backgroundColor: "#0d1f2d",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 12,
  };

  const labelStyle = { fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" as const };

  function statusIcon(status: string) {
    if (status === "abgeschlossen") return <CheckCircle size={14} style={{ color: "#4ade80" }} />;
    if (status === "fehlgeschlagen") return <AlertCircle size={14} style={{ color: "#f87171" }} />;
    return <Clock size={14} style={{ color: "#fbbf24" }} />;
  }

  return (
    <div style={{ maxWidth: 900 }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Repdoc Import</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            CSV-Export aus WM Repdoc Cloud importieren — Kunden & Fahrzeuge werden automatisch angelegt oder aktualisiert.
          </p>
        </div>
      </div>

      {/* Upload zone */}
      <div
        style={{
          ...cardStyle,
          border: isDragging ? "2px dashed #0074a2" : "2px dashed rgba(255,255,255,0.1)",
          backgroundColor: isDragging ? "rgba(0,116,162,0.08)" : "#0d1f2d",
          padding: "48px 36px",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.2s",
          marginBottom: 24,
        }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <RefreshCw size={32} style={{ color: "#0074a2" }} className="animate-spin" />
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15 }}>Wird importiert...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: "rgba(0,116,162,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Upload size={24} style={{ color: "#0074a2" }} />
            </div>
            <p style={{ color: "#ffffff", fontSize: 16, fontWeight: 600, margin: 0 }}>CSV-Datei hier ablegen</p>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, margin: 0 }}>oder klicken zum Auswählen</p>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, margin: "8px 0 0" }}>
              Unterstützt: Repdoc Cloud CSV-Export (Komma oder Semikolon)
            </p>
          </div>
        )}
      </div>

      {/* Result */}
      {result && (
        <div
          style={{
            ...cardStyle,
            border: `1px solid ${result.success ? "rgba(74,222,128,0.2)" : "rgba(248,113,113,0.2)"}`,
            padding: "20px 24px",
            marginBottom: 24,
          }}
        >
          <div className="flex items-start gap-3">
            {result.success
              ? <CheckCircle size={18} style={{ color: "#4ade80", marginTop: 1, flexShrink: 0 }} />
              : <AlertCircle size={18} style={{ color: "#f87171", marginTop: 1, flexShrink: 0 }} />
            }
            <div>
              {result.success ? (
                <>
                  <p style={{ color: "#4ade80", fontWeight: 600, margin: "0 0 4px" }}>Import erfolgreich</p>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, margin: 0 }}>
                    {result.kunden_importiert} Kunden importiert &bull; {result.fahrzeuge_importiert} Fahrzeuge importiert
                    {(result.fehler_anzahl ?? 0) > 0 && ` · ${result.fehler_anzahl} Fehler`}
                  </p>
                </>
              ) : (
                <p style={{ color: "#f87171", fontWeight: 600, margin: 0 }}>{result.error}</p>
              )}
              {result.fehler && result.fehler.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <p style={{ ...labelStyle, marginBottom: 6 }}>Fehler (max. 20)</p>
                  <div style={{ maxHeight: 160, overflowY: "auto" }}>
                    {result.fehler.map((f, i) => (
                      <p key={i} style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: "2px 0", fontFamily: "monospace" }}>{f}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CSV Format hint */}
      <div style={{ ...cardStyle, padding: "20px 24px", marginBottom: 32 }}>
        <p style={{ ...labelStyle, marginBottom: 12 }}>Erwartete CSV-Spalten</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 12px" }}>
          {["Vorname", "Nachname", "Email", "Telefon", "Geburtstag", "Adresse", "PLZ", "Ort", "Kennzeichen", "Marke", "Modell", "Baujahr", "Kraftstoff", "TUeV-Datum", "Kilometerstand", "Repdoc-ID"].map((col) => (
            <span key={col} style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", backgroundColor: "rgba(255,255,255,0.05)", padding: "3px 8px", borderRadius: 4, fontFamily: "monospace" }}>
              {col}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 10 }}>
          Spaltennamen werden normalisiert — Gross/Kleinschreibung und Sonderzeichen werden ignoriert.
        </p>
      </div>

      {/* Import history */}
      <div>
        <p style={{ ...labelStyle, marginBottom: 16 }}>Import-Verlauf</p>
        {logs.length === 0 ? (
          <div style={{ ...cardStyle, padding: "32px", textAlign: "center" }}>
            <FileText size={24} style={{ color: "rgba(255,255,255,0.15)", margin: "0 auto 8px" }} />
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>Noch keine Imports durchgeführt</p>
          </div>
        ) : (
          <div style={{ ...cardStyle, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Datei", "Datum", "Kunden", "Fahrzeuge", "Status"].map((h) => (
                    <th key={h} style={{ ...labelStyle, padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr
                    key={log.id}
                    style={{ borderBottom: i < logs.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                  >
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                      {log.dateiname ?? "—"}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                      {new Date(log.erstellt_am).toLocaleString("de-DE")}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                      {log.kunden_importiert}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                      {log.fahrzeuge_importiert}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div className="flex items-center gap-1.5">
                        {statusIcon(log.status)}
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textTransform: "capitalize" }}>
                          {log.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
