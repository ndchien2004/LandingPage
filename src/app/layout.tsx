import type { Metadata } from "next";
import { Playfair_Display, Be_Vietnam_Pro } from "next/font/google";
import { cloudinaryAssets } from "@/data/cloudinaryAssets";
import { PageTransitionProvider } from "@/components/transition/PageTransition";
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
    "Gió Từ Làng là hành trình kể chuyện về làng nghề Chàng Sơn: nghề quạt, nghề mộc, nghề sơn và nghề tre. Mỗi nghề là một chương riêng, một câu chuyện thủ công Việt Nam.",
  keywords: [
    "Chàng Sơn",
    "làng nghề",
    "quạt Chàng Sơn",
    "thủ công Việt Nam",
    "Gió Từ Làng",
  ],
  openGraph: {
    images: [
      {
        url: cloudinaryAssets.logo.normal.rawSrc,
        width: 1254,
        height: 1254,
        alt: cloudinaryAssets.logo.normal.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [cloudinaryAssets.logo.normal.rawSrc],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${beVietnam.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
