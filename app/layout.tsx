import type { Metadata } from "next";
import { Baloo_2, TikTok_Sans } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
});

const tikTokSans = TikTok_Sans({
  variable: "--font-tiktok-sans",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
  "http://localhost:3000";

const appName = "Mask For You - Referral";
const description =
  "Trang giới thiệu/referral: nhận mã giới thiệu và tải Mask For You - M4U.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: appName,
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description,
  keywords: ["Mask For You", "M4U", "referral", "giới thiệu", "voucher"],
  authors: [{ name: "ROMANA VIETNAM JOINT STOCK COMPANY" }],
  creator: "ROMANA VIETNAM JOINT STOCK COMPANY",
  publisher: "ROMANA VIETNAM JOINT STOCK COMPANY",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: appName,
    description,
    siteName: appName,
    locale: "vi_VN",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: appName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: appName,
    description,
    images: ["/thumbnail.png"],
  },
  appleWebApp: {
    capable: true,
    title: appName,
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${baloo.variable} ${tikTokSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
