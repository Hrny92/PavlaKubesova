import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Ing. Pavla Kubešová – Realitní makléřka",
  description: "Realitní makléřka s lidským přístupem. Pomáhám klientům prodat, koupit nebo pronajmout nemovitost.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={poppins.variable}>
      <body style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
