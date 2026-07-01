import "./globals.css";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "Autoklinik Reutlingen",
  description:
    "Werkstatt in Reutlingen: Inspektion, Reparatur & TÜV. Faire Preise, kurze Wartezeiten. Jetzt Termin vereinbaren – schnell & zuverlässig.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
