// Shared email template helpers for Autoklinik Reutlingen automations

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://autoklinik-reutlingen.de";
const FROM_NAME = "Autoklinik Reutlingen";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "info@autoklinik-reutlingen.de";
const BOOKING_URL = `${BASE_URL}/terminbuchung`;

function baseHtml(title: string, preheader: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f0f6fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<span style="display:none;max-height:0;overflow:hidden;">${preheader}</span>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f6fa;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
      <!-- Header -->
      <tr>
        <td style="background:#002e40;border-radius:12px 12px 0 0;padding:28px 36px;">
          <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">AUTOKLINIK</p>
          <p style="margin:2px 0 0;font-size:11px;font-weight:500;color:rgba(255,255,255,0.45);letter-spacing:0.15em;text-transform:uppercase;">Reutlingen</p>
        </td>
      </tr>
      <!-- Body -->
      <tr>
        <td style="background:#ffffff;padding:36px;border-left:1px solid #dde9f0;border-right:1px solid #dde9f0;">
          ${body}
        </td>
      </tr>
      <!-- Footer -->
      <tr>
        <td style="background:#f8fafc;border:1px solid #dde9f0;border-top:none;border-radius:0 0 12px 12px;padding:20px 36px;">
          <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
            Autoklinik Reutlingen &bull; Ihre Kfz-Werkstatt in Reutlingen<br/>
            <a href="${BASE_URL}" style="color:#0074a2;text-decoration:none;">${BASE_URL}</a>
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function ctaButton(label: string, url: string): string {
  return `<a href="${url}" style="display:inline-block;margin-top:24px;padding:14px 28px;background:#0074a2;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;">${label}</a>`;
}

// ─── TÜV Erinnerung ────────────────────────────────────────────────────────
export function tuevErinnerungEmail(opts: {
  vorname: string;
  nachname: string;
  kennzeichen: string;
  marke: string;
  modell: string;
  tuev_datum: string;
  wochen: number;
}) {
  const subject = `TÜV-Erinnerung: ${opts.kennzeichen} – Fälligkeit in ${opts.wochen} Wochen`;
  const body = `
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#002e40;">TÜV-Termin steht an</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#64849a;line-height:1.6;">Hallo ${opts.vorname} ${opts.nachname},</p>
    <p style="font-size:15px;color:#1e3a4a;line-height:1.7;margin:0 0 16px;">
      Ihr Fahrzeug <strong>${opts.marke} ${opts.modell}</strong> (Kennzeichen: <strong>${opts.kennzeichen}</strong>) 
      muss in etwa <strong>${opts.wochen} Wochen</strong> zur Hauptuntersuchung (TÜV).
    </p>
    <table style="background:#f0f6fa;border-radius:8px;padding:16px 20px;margin:16px 0;width:100%;box-sizing:border-box;" cellpadding="0" cellspacing="0">
      <tr><td style="font-size:13px;color:#64849a;">TÜV fällig am</td><td style="font-size:14px;font-weight:700;color:#002e40;text-align:right;">${opts.tuev_datum}</td></tr>
      <tr><td style="font-size:13px;color:#64849a;padding-top:6px;">HU inkl. AU</td><td style="font-size:14px;font-weight:700;color:#002e40;text-align:right;padding-top:6px;">165,00 € (Festpreis)</td></tr>
    </table>
    <p style="font-size:14px;color:#64849a;line-height:1.6;">Vereinbaren Sie jetzt Ihren Termin – wir bereiten Ihr Fahrzeug optimal vor.</p>
    ${ctaButton("Termin jetzt buchen", BOOKING_URL)}
  `;
  return { subject, html: baseHtml(subject, `TÜV fällig in ${opts.wochen} Wochen`, body), from: `${FROM_NAME} <${FROM_EMAIL}>` };
}

// ─── Geburtstag ─────────────────────────────────────────────────────────────
export function geburtstagEmail(opts: { vorname: string; nachname: string }) {
  const subject = `Herzlichen Glückwunsch, ${opts.vorname}!`;
  const body = `
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#002e40;">Herzlichen Glückwunsch!</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#64849a;line-height:1.6;">Liebre ${opts.vorname} ${opts.nachname},</p>
    <p style="font-size:15px;color:#1e3a4a;line-height:1.7;margin:0 0 16px;">
      Das gesamte Team der Autoklinik Reutlingen wünscht Ihnen alles Gute zum Geburtstag!
    </p>
    <p style="font-size:15px;color:#1e3a4a;line-height:1.7;margin:0 0 16px;">
      Als kleines Geburtstagsgeschenk erhalten Sie beim nächsten Werkstattbesuch einen 
      <strong>kostenlosen Fahrzeug-Check</strong> (Öl, Reifen, Bremsen, Lichter).
    </p>
    <p style="font-size:13px;color:#94a3b8;">Einfach diesen Gutschein vorzeigen oder bei der Terminbuchung erwähnen.</p>
    ${ctaButton("Termin buchen", BOOKING_URL)}
  `;
  return { subject, html: baseHtml(subject, "Ein Geburtstagsgeschenk von uns", body), from: `${FROM_NAME} <${FROM_EMAIL}>` };
}

// ─── Reaktivierung ──────────────────────────────────────────────────────────
export function reaktivierungEmail(opts: { vorname: string; nachname: string; tage_inaktiv: number }) {
  const subject = `Wir vermissen Sie, ${opts.vorname}!`;
  const body = `
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#002e40;">Lange nicht gesehen!</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#64849a;line-height:1.6;">Hallo ${opts.vorname} ${opts.nachname},</p>
    <p style="font-size:15px;color:#1e3a4a;line-height:1.7;margin:0 0 16px;">
      Es ist schon etwa <strong>${opts.tage_inaktiv} Tage</strong> her, seit wir Ihr Fahrzeug das letzte Mal 
      betreut haben. Wir würden uns freuen, Sie wieder bei uns begrüßen zu dürfen.
    </p>
    <p style="font-size:15px;color:#1e3a4a;line-height:1.7;margin:0 0 16px;">
      Vereinbaren Sie jetzt einen Termin – ob TÜV, Inspektion, Reifenwechsel oder einfach ein 
      kurzer Check. Wir sind für Sie da.
    </p>
    ${ctaButton("Jetzt Termin buchen", BOOKING_URL)}
  `;
  return { subject, html: baseHtml(subject, "Ihr Fahrzeug verdient Aufmerksamkeit", body), from: `${FROM_NAME} <${FROM_EMAIL}>` };
}

// ─── Termin Bestätigung ─────────────────────────────────────────────────────
export function terminBestaetigung(opts: {
  vorname: string;
  nachname: string;
  leistung: string;
  datum: string;
  uhrzeit: string;
  kennzeichen?: string;
}) {
  const subject = `Terminbestätigung: ${opts.leistung} am ${opts.datum}`;
  const body = `
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#002e40;">Ihr Termin ist bestätigt</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#64849a;line-height:1.6;">Hallo ${opts.vorname} ${opts.nachname},</p>
    <p style="font-size:15px;color:#1e3a4a;line-height:1.7;margin:0 0 16px;">
      Wir freuen uns, Sie bei uns begrüßen zu dürfen. Hier sind Ihre Termindetails:
    </p>
    <table style="background:#f0f6fa;border-radius:8px;padding:16px 20px;margin:16px 0;width:100%;box-sizing:border-box;" cellpadding="0" cellspacing="0">
      <tr><td style="font-size:13px;color:#64849a;">Leistung</td><td style="font-size:14px;font-weight:700;color:#002e40;text-align:right;">${opts.leistung}</td></tr>
      <tr><td style="font-size:13px;color:#64849a;padding-top:6px;">Datum</td><td style="font-size:14px;font-weight:700;color:#002e40;text-align:right;padding-top:6px;">${opts.datum}</td></tr>
      <tr><td style="font-size:13px;color:#64849a;padding-top:6px;">Uhrzeit</td><td style="font-size:14px;font-weight:700;color:#002e40;text-align:right;padding-top:6px;">${opts.uhrzeit} Uhr</td></tr>
      ${opts.kennzeichen ? `<tr><td style="font-size:13px;color:#64849a;padding-top:6px;">Kennzeichen</td><td style="font-size:14px;font-weight:700;color:#002e40;text-align:right;padding-top:6px;">${opts.kennzeichen}</td></tr>` : ""}
    </table>
    <p style="font-size:13px;color:#94a3b8;margin-top:16px;">
      Falls Sie den Termin nicht wahrnehmen können, bitten wir Sie, uns rechtzeitig zu informieren.
    </p>
  `;
  return { subject, html: baseHtml(subject, `Termin bestätigt: ${opts.datum} um ${opts.uhrzeit}`, body), from: `${FROM_NAME} <${FROM_EMAIL}>` };
}

// ─── Termin Erinnerung (24h vorher) ─────────────────────────────────────────
export function terminErinnerung(opts: {
  vorname: string;
  nachname: string;
  leistung: string;
  datum: string;
  uhrzeit: string;
}) {
  const subject = `Erinnerung: Ihr Termin morgen – ${opts.leistung}`;
  const body = `
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#002e40;">Termin morgen!</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#64849a;line-height:1.6;">Hallo ${opts.vorname} ${opts.nachname},</p>
    <p style="font-size:15px;color:#1e3a4a;line-height:1.7;margin:0 0 16px;">
      Dies ist eine freundliche Erinnerung an Ihren Termin <strong>morgen</strong>:
    </p>
    <table style="background:#f0f6fa;border-radius:8px;padding:16px 20px;margin:16px 0;width:100%;box-sizing:border-box;" cellpadding="0" cellspacing="0">
      <tr><td style="font-size:13px;color:#64849a;">Leistung</td><td style="font-size:14px;font-weight:700;color:#002e40;text-align:right;">${opts.leistung}</td></tr>
      <tr><td style="font-size:13px;color:#64849a;padding-top:6px;">Morgen</td><td style="font-size:14px;font-weight:700;color:#002e40;text-align:right;padding-top:6px;">${opts.datum} um ${opts.uhrzeit} Uhr</td></tr>
    </table>
    <p style="font-size:13px;color:#64849a;line-height:1.6;">Wir freuen uns auf Sie. Bitte bringen Sie ggf. Ihre Fahrzeugpapiere mit.</p>
  `;
  return { subject, html: baseHtml(subject, `Morgen: ${opts.datum} um ${opts.uhrzeit}`, body), from: `${FROM_NAME} <${FROM_EMAIL}>` };
}

// ─── Bewertungsanfrage ───────────────────────────────────────────────────────
export function bewertungsanfrageEmail(opts: { vorname: string; nachname: string; leistung: string }) {
  const subject = `Wie war Ihr Besuch bei uns, ${opts.vorname}?`;
  const body = `
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#002e40;">Wie war Ihr Besuch?</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#64849a;line-height:1.6;">Hallo ${opts.vorname} ${opts.nachname},</p>
    <p style="font-size:15px;color:#1e3a4a;line-height:1.7;margin:0 0 16px;">
      Vielen Dank für Ihren Besuch bei der Autoklinik Reutlingen. Wir hoffen, dass wir Sie mit 
      <strong>${opts.leistung}</strong> vollständig überzeugen konnten.
    </p>
    <p style="font-size:15px;color:#1e3a4a;line-height:1.7;margin:0 0 16px;">
      Würden Sie sich kurz die Zeit nehmen und uns eine Google-Bewertung hinterlassen? 
      Das hilft uns sehr und dauert nur 1 Minute.
    </p>
    ${ctaButton("Jetzt bewerten", "https://g.page/r/autoklinik-reutlingen/review")}
    <p style="font-size:13px;color:#94a3b8;margin-top:20px;">
      Herzlichen Dank – Ihr Team der Autoklinik Reutlingen
    </p>
  `;
  return { subject, html: baseHtml(subject, "Teilen Sie Ihre Erfahrung mit uns", body), from: `${FROM_NAME} <${FROM_EMAIL}>` };
}
