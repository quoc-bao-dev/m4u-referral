import type { Metadata } from "next";
import { Baloo_2, TikTok_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "./providers/QueryProvider";

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

const appName = "M4U - Cộng đồng làm đẹp, thưởngg cực đã";
const description =
  "Trải nghiệm - chia sẻ - nhận thưởng: video review & giới thiệu bạn bè";

// Tạo absolute URL cho thumbnail
const thumbnailUrl = `${siteUrl}/thumbnail.jpeg`;

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
    url: siteUrl,
    title: appName,
    description,
    siteName: appName,
    locale: "vi_VN",
    images: [
      {
        url: thumbnailUrl,
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
    images: [thumbnailUrl],
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
    <html>
      <body
        className={`${baloo.variable} ${tikTokSans.variable} antialiased`}
      >
        <QueryProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2000,
              style: {
                background: "#fff",
                color: "#111827",
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
              },
              success: {
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
