import "./globals.css";
import { DM_Sans } from "next/font/google";
import { ChatWidget } from "@/components/chat-widget";

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
  icons: {
    icon: "/assets/images/6937e76d5753525e801ff711_logo-autoklinik2.png",
    apple: "/assets/images/6937e76d5753525e801ff711_logo-autoklinik2.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${dmSans.variable} bg-background`}>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
