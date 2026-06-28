import "./globals.css";

export const metadata = {
  title: "Autoklinik Reutlingen",
  description:
    "Werkstatt in Reutlingen: Inspektion, Reparatur & TÜV. Faire Preise, kurze Wartezeiten. Jetzt Termin vereinbaren – schnell & zuverlässig.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
