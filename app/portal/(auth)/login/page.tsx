"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function PortalLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("E-Mail oder Passwort falsch.");
      } else {
        router.push("/portal/dashboard");
        router.refresh();
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    }
    setLoading(false);
  }

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 8,
    border: "1px solid #dde9f0",
    backgroundColor: "#f8fafc",
    fontSize: 14,
    color: "#1e3a4a",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f6fa", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/">
            <div style={{ display: "inline-block", backgroundColor: "#002e40", borderRadius: 8, padding: "8px 18px", marginBottom: 12 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: "#ffffff", letterSpacing: "0.05em" }}>AUTOKLINIK</span>
            </div>
          </Link>
          <p style={{ fontSize: 14, color: "#64849a", margin: 0 }}>Mein Bereich</p>
        </div>

        {/* Card */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: 16, padding: "36px", border: "1px solid #dde9f0", boxShadow: "0 4px 24px rgba(0,46,64,0.07)" }}>
          {success ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <span style={{ fontSize: 22 }}>✓</span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#002e40", margin: "0 0 8px" }}>Fast geschafft!</h2>
              <p style={{ fontSize: 14, color: "#64849a", lineHeight: 1.6 }}>
                Wir haben Ihnen eine Bestätigungs-E-Mail gesendet. Bitte klicken Sie auf den Link, um Ihr Konto zu aktivieren.
              </p>
            </div>
          ) : (
            <>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: "#002e40", margin: "0 0 6px" }}>
                {mode === "login" ? "Willkommen zurück" : "Konto erstellen"}
              </h1>
              <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 28px" }}>
                {mode === "login" ? "Melden Sie sich bei Ihrem Kundenportal an." : "Erstellen Sie Ihr persönliches Kundenportal."}
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64849a", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    E-Mail
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="ihre@email.de"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64849a", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Passwort
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    style={inputStyle}
                  />
                </div>

                {error && (
                  <p style={{ fontSize: 13, color: "#ef4444", backgroundColor: "#fef2f2", padding: "10px 14px", borderRadius: 8, margin: 0 }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "13px",
                    borderRadius: 8,
                    backgroundColor: loading ? "#94a3b8" : "#002e40",
                    color: "#ffffff",
                    fontSize: 14,
                    fontWeight: 600,
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    marginTop: 4,
                  }}
                >
                  {loading ? "Wird geladen..." : mode === "login" ? "Anmelden" : "Konto erstellen"}
                </button>
              </form>

              <p style={{ textAlign: "center", fontSize: 13, color: "#94a3b8", marginTop: 20 }}>
                {mode === "login" ? "Noch kein Konto?" : "Bereits registriert?"}{" "}
                <button
                  onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
                  style={{ color: "#0074a2", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontSize: 13 }}
                >
                  {mode === "login" ? "Jetzt registrieren" : "Anmelden"}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
