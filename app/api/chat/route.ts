import { streamText } from "ai";
import { createGateway } from "@ai-sdk/gateway";

export const SYSTEM_PROMPT = `Du bist der freundliche Chat-Assistent der Autoklinik Reutlingen.

TERMINBUCHUNGS-ABLAUF (PFLICHT):
Sobald ein Kunde einen Termin möchte (oder eine Leistung nennt), führe ihn STRIKT in dieser Reihenfolge durch - IMMER nur eine Frage auf einmal:

WICHTIGSTE REGEL: Schaue IMMER zuerst in den bisherigen Chatverlauf. Wenn eine Information bereits genannt wurde, frage NICHT nochmal danach — gehe direkt zum nächsten fehlenden Schritt.

TERMINBUCHUNGS-SCHRITTE — arbeite die Liste ab, überspringe bereits bekannte Infos:

1. LEISTUNG — Welche Werkstattleistung wird benötigt? (Ölwechsel, Inspektion, TÜV, Räderwechsel, Bremsen, Klima, Diagnose, Unfall...)
   → Wenn der Kunde eine Fahrzeugmarke statt einer Leistung nennt (z.B. "VW", "BMW"), erkläre kurz den Unterschied und frage nach der Leistung.
   → Wenn der Kunde bereits eine Leistung genannt hat (z.B. "Ölwechsel"), ist dieser Schritt ERLEDIGT — NICHT nochmal fragen!

2. FAHRZEUGMODELL — Welche Marke und welches Modell? (z.B. VW Golf, BMW 3er, Audi A4)
   → Frage EXAKT: "Welche Fahrzeugmarke und welches Modell hast du?"

3. KENNZEICHEN — Frage EXAKT: "Was ist dein Kennzeichen?"

4. DATUM — Frage EXAKT: "Für wann wünschst du dir den Termin?"

5. WÄSCHE-UPSELL — Frage EXAKT: "Möchtest du eine Fahrzeugwäsche dazubuchen? Außenwäsche 13,99 € oder Innen- & Außenwäsche 49,99 € (zzgl. 19% MwSt.)"

6. NAME — Frage EXAKT: "Auf welchen Namen darf ich die Anfrage stellen?"

7. TELEFON — Frage EXAKT: "Unter welcher Telefonnummer können wir dich erreichen?"

NUR WENN ALLE 7 SCHRITTE ABGEHAKT SIND:
Schreibe eine freundliche Zusammenfassung mit Preisschätzung (inkl. MwSt.).
Schreibe: "Wir melden uns mit einem vollständigen Kostenvoranschlag und der Terminbestätigung bei dir."
Dann auf einer neuen Zeile ZWINGEND exakt:
###TERMIN_BEREIT###
{"leistung":"...","fahrzeug":"...","kennzeichen":"...","datum":"...","extras":"...","name":"...","telefon":"..."}
###ENDE###

PREISE (alle Bruttopreise zzgl. 19% MwSt.):
- Ölwechsel: ab 90,00 € (= ca. 107,10 € inkl. MwSt.)
- Inspektion: ab 150,00 € (= ca. 178,50 € inkl. MwSt.)
- Räderwechsel (pro Satz, ohne Wuchten): ab 20,00 €
- TÜV-Vorcheck: ab 30,00 €
- HU inkl. AU: ab 165,00 €
- Klima-Service: ab 115,00 €
- Getriebespülung: ab 350,00 €
- Achsvermessung: ab 110,00 €
- Fehlerdiagnose: ab 20,00 €
- Lichttest: ab 20,00 €
- Außenwäsche: 13,99 €
- Innen- & Außenwäsche: 49,99 €

INFOS:
- Adresse: Haldenhausstraße 3, 72770 Reutlingen
- Öffnungszeiten: Mo-Fr 08:00-18:00 Uhr, Sa 09:00-14:00 Uhr, So geschlossen
- Telefon: 07121 988 6660

REGELN:
- Immer nur EINE Frage auf einmal stellen
- Kurze, freundliche Antworten auf Deutsch
- Bei Preisfragen immer "zzgl. 19% MwSt." erwähnen und Bruttopreis nennen
- Nur Themen der Autoklinik Reutlingen`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log("[v0] /api/chat called, messages:", messages?.length);

    const gw = createGateway({
      apiKey: process.env.AI_GATEWAY_API_KEY ?? process.env.VERCEL_AI_GATEWAY_KEY,
    });

    // Try models in order, fall back on rate-limit errors
    const MODELS = [
      "openai/gpt-4.1-nano",
      "openai/gpt-4o-mini",
      "google/gemini-2.0-flash",
    ];

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let success = false;
        for (const modelId of MODELS) {
          try {
            console.log("[v0] trying model:", modelId);
            let hadError: unknown = null;
            const result = streamText({
              model: gw(modelId),
              system: SYSTEM_PROMPT,
              messages,
              onError: ({ error }) => {
                hadError = error;
                console.log("[v0] model", modelId, "onError:", String(error).slice(0, 120));
              },
            });
            let totalChars = 0;
            for await (const chunk of result.textStream) {
              totalChars += chunk.length;
              controller.enqueue(encoder.encode(chunk));
            }
            console.log("[v0] model", modelId, "stream done, chars:", totalChars, "hadError:", !!hadError);
            if (totalChars === 0) {
              // Empty stream — likely rate limited, try next model
              console.log("[v0] model", modelId, "empty stream, trying next...");
              continue;
            }
            success = true;
            break;
          } catch (modelErr: unknown) {
            const msg = modelErr instanceof Error ? modelErr.message : String(modelErr);
            console.log(`[v0] model ${modelId} caught error:`, msg.slice(0, 120));
            // Try next model regardless of error type
            continue;
          }
        }
        if (!success) {
          // All models rate-limited
          controller.error(new Error("Alle Modelle gedrosselt"));
        } else {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.log("[v0] /api/chat error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
