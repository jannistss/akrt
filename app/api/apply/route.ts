import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { Resend } from "resend";
import { encodeToken } from "@/app/api/cv-download/route";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const position = formData.get("position") as string;
    const message = formData.get("message") as string;
    const cvFile = formData.get("cv") as File | null;

    if (!name || !email || !position) {
      return NextResponse.json(
        { error: "Name, E-Mail und Stelle sind Pflichtfelder." },
        { status: 400 }
      );
    }

    // Upload CV to Blob if provided
    let cvUrl: string | null = null;
    if (cvFile && cvFile.size > 0) {
      if (cvFile.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Datei zu groß. Maximal 10 MB erlaubt." },
          { status: 400 }
        );
      }
      const blob = await put(
        `bewerbungen/${Date.now()}-${cvFile.name}`,
        cvFile,
        { access: "private" }
      );
      cvUrl = blob.url;
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : null) ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
      "https://akrt-iota.vercel.app";

    const cvDownloadLink = cvUrl
      ? `${baseUrl}/api/cv-download?token=${encodeToken(cvUrl)}`
      : null;

    const to = process.env.APPLICATION_EMAIL ?? "info@autoklinik-reutlingen.de";

    await resend.emails.send({
      from: "Autoklinik Karriere <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `Neue Bewerbung: ${position} - ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 12px;">
          <div style="background: #002e40; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Neue Bewerbung eingegangen</h1>
            <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">Autoklinik Reutlingen - Karriere</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 20px; font-size: 13px; font-weight: 600; color: #64748b; width: 140px;">Stelle</td>
              <td style="padding: 14px 20px; font-size: 14px; color: #0f172a; font-weight: 600;">${position}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 20px; font-size: 13px; font-weight: 600; color: #64748b;">Name</td>
              <td style="padding: 14px 20px; font-size: 14px; color: #0f172a;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 20px; font-size: 13px; font-weight: 600; color: #64748b;">E-Mail</td>
              <td style="padding: 14px 20px; font-size: 14px; color: #0074a2;">${email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 20px; font-size: 13px; font-weight: 600; color: #64748b;">Telefon</td>
              <td style="padding: 14px 20px; font-size: 14px; color: #0f172a;">${phone || "-"}</td>
            </tr>
            ${
              message
                ? `<tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 20px; font-size: 13px; font-weight: 600; color: #64748b; vertical-align: top;">Nachricht</td>
              <td style="padding: 14px 20px; font-size: 14px; color: #0f172a; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td>
            </tr>`
                : ""
            }
            ${
              cvDownloadLink
                ? `<tr>
              <td style="padding: 14px 20px; font-size: 13px; font-weight: 600; color: #64748b;">Lebenslauf</td>
              <td style="padding: 14px 20px; font-size: 14px;">
                <a href="${cvDownloadLink}" style="color: #0074a2; text-decoration: none; font-weight: 600;">Datei herunterladen &rarr;</a>
              </td>
            </tr>`
                : ""
            }
          </table>

          <p style="font-size: 12px; color: #94a3b8; margin-top: 24px; text-align: center;">
            Autoklinik Reutlingen &bull; Haldenhaustra&szlig;e 3, 72770 Reutlingen
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[v0] /api/apply error:", err);
    return NextResponse.json(
      { error: "Beim Senden ist ein Fehler aufgetreten. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
