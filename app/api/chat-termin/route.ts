import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { leistung, fahrzeug, kennzeichen, datum, extras, name, telefon, email, chatSummary } = await req.json();

    if (!telefon || !name) {
      return NextResponse.json({ error: "Name und Telefon fehlen" }, { status: 400 });
    }

    const to = process.env.APPLICATION_EMAIL ?? "info@autoklinik-reutlingen.de";

    await resend.emails.send({
      from: "Autoklinik Chat <onboarding@resend.dev>",
      to,
      subject: `Neue Terminanfrage via Chat - ${name} - ${leistung}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #002e40; padding: 28px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Neue Terminanfrage via Chat</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 6px 0 0; font-size: 13px;">Autoklinik Reutlingen - Chat-Assistent</p>
          </div>
          <div style="background: #ffffff; border: 1px solid #d5e8f0; border-top: none; border-radius: 0 0 12px 12px; padding: 0 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #f0f7fb;">
                <td style="padding: 16px 0; font-size: 13px; font-weight: 600; color: #64748b; width: 140px;">Name</td>
                <td style="padding: 16px 0; font-size: 14px; color: #002e40; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f7fb;">
                <td style="padding: 16px 0; font-size: 13px; font-weight: 600; color: #64748b;">Telefon</td>
                <td style="padding: 16px 0; font-size: 14px;">
                  <a href="tel:${telefon}" style="color: #0074a2; text-decoration: none; font-weight: 600;">${telefon}</a>
                </td>
              </tr>
              ${email ? `
              <tr style="border-bottom: 1px solid #f0f7fb;">
                <td style="padding: 16px 0; font-size: 13px; font-weight: 600; color: #64748b;">E-Mail</td>
                <td style="padding: 16px 0; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #0074a2; text-decoration: none; font-weight: 600;">${email}</a>
                </td>
              </tr>` : ""}
              <tr style="border-bottom: 1px solid #f0f7fb;">
                <td style="padding: 16px 0; font-size: 13px; font-weight: 600; color: #64748b;">Gewünschte Leistung</td>
                <td style="padding: 16px 0; font-size: 14px; color: #002e40;">${leistung || "-"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f7fb;">
                <td style="padding: 16px 0; font-size: 13px; font-weight: 600; color: #64748b;">Fahrzeug</td>
                <td style="padding: 16px 0; font-size: 14px; color: #002e40;">${fahrzeug || "-"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f7fb;">
                <td style="padding: 16px 0; font-size: 13px; font-weight: 600; color: #64748b;">Kennzeichen</td>
                <td style="padding: 16px 0; font-size: 14px; color: #002e40; font-weight: 600;">${kennzeichen || "-"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f7fb;">
                <td style="padding: 16px 0; font-size: 13px; font-weight: 600; color: #64748b;">Wunschtermin</td>
                <td style="padding: 16px 0; font-size: 14px; color: #002e40;">${datum || "-"}</td>
              </tr>
              ${extras && extras !== "Nein danke" ? `
              <tr style="border-bottom: 1px solid #f0f7fb;">
                <td style="padding: 16px 0; font-size: 13px; font-weight: 600; color: #64748b;">Extras</td>
                <td style="padding: 16px 0; font-size: 14px; color: #002e40;">${extras}</td>
              </tr>` : ""}
              ${chatSummary ? `
              <tr>
                <td style="padding: 16px 0; font-size: 13px; font-weight: 600; color: #64748b; vertical-align: top;">Chat-Verlauf</td>
                <td style="padding: 16px 0; font-size: 13px; color: #475569; line-height: 1.7; white-space: pre-line;">${chatSummary}</td>
              </tr>` : ""}
            </table>
          </div>
          <p style="text-align: center; font-size: 12px; color: #94a3b8; margin-top: 24px;">
            Autoklinik Reutlingen - Haldenhausstraße 3, 72770 Reutlingen
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[v0] chat-termin error:", err);
    return NextResponse.json({ error: "Senden fehlgeschlagen" }, { status: 500 });
  }
}
