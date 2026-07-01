import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, message } = body;

    if (!phone) {
      return NextResponse.json({ error: "Telefonnummer fehlt" }, { status: 400 });
    }

    const to = process.env.APPLICATION_EMAIL ?? "info@autoklinik-reutlingen.de";

    await resend.emails.send({
      from: "Autoklinik Reutlingen <onboarding@resend.dev>",
      to,
      subject: `Neue Kontaktanfrage von ${name || "Unbekannt"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #002e40; padding: 28px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Neue Kontaktanfrage</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 6px 0 0; font-size: 13px;">Autoklinik Reutlingen - Kontaktformular</p>
          </div>
          <div style="background: #ffffff; border: 1px solid #d5e8f0; border-top: none; border-radius: 0 0 12px 12px; padding: 0 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #f0f7fb;">
                <td style="padding: 16px 0; font-size: 13px; font-weight: 600; color: #64748b; width: 120px;">Name</td>
                <td style="padding: 16px 0; font-size: 14px; color: #002e40;">${name || "-"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f7fb;">
                <td style="padding: 16px 0; font-size: 13px; font-weight: 600; color: #64748b;">Telefon</td>
                <td style="padding: 16px 0; font-size: 14px;">
                  <a href="tel:${phone}" style="color: #0074a2; text-decoration: none; font-weight: 600;">${phone}</a>
                </td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 16px 0; font-size: 13px; font-weight: 600; color: #64748b; vertical-align: top;">Nachricht</td>
                <td style="padding: 16px 0; font-size: 14px; color: #002e40; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td>
              </tr>` : ""}
            </table>
          </div>
          <p style="text-align: center; font-size: 12px; color: #94a3b8; margin-top: 24px;">
            Autoklinik Reutlingen - Haldenhaustrasse 3, 72770 Reutlingen
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[v0] contact API error:", err);
    return NextResponse.json({ error: "Senden fehlgeschlagen" }, { status: 500 });
  }
}
