import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lakenow.app"),

  title: {
    default: "LakeNow",
    template: "%s | LakeNow",
  },

  description:
    "Reliable rides and delivery across Lake of the Ozarks. Car rides, delivery, water taxi, boat delivery, and captain services.",

  keywords: [
    "Lake of the Ozarks",
    "LakeNow",
    "Lake rides",
    "Water taxi",
    "Boat delivery",
    "Captain services",
    "Transportation",
    "Delivery",
    "Dock delivery",
  ],

  authors: [{ name: "LakeNow" }],

  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "LakeNow",
    description:
      "Reliable rides and delivery across Lake of the Ozarks.",
    url: "https://lakenow.app",
    siteName: "LakeNow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "LakeNow",
    description:
      "Reliable rides and delivery across Lake of the Ozarks.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}