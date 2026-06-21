import type { Metadata } from "next";
import { Playfair_Display, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gió Từ Làng — Hành trình khám phá làng nghề Chàng Sơn",
    template: "%s — Gió Từ Làng",
  },
  description:
    "Gió Từ Làng là hành trình kể chuyện về làng nghề Chàng Sơn: nghề quạt, nghề mộc, nghề sơn và nghề tre. Mỗi nghề là một ải khám phá, một câu chuyện thủ công Việt Nam.",
  keywords: [
    "Chàng Sơn",
    "làng nghề",
    "quạt Chàng Sơn",
    "thủ công Việt Nam",
    "Gió Từ Làng",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${beVietnam.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
