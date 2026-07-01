import "./globals.css";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata = {
  title: "Autoklinik Reutlingen",
  description:
    "Werkstatt in Reutlingen: Inspektion, Reparatur & TÜV. Faire Preise, kurze Wartezeiten. Jetzt Termin vereinbaren – schnell & zuverlässig.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
