import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LakeNow | Rides • Delivery • At The Lake",
  description:
    "Request rides, delivery, water taxi, boat delivery, and captain services around Lake of the Ozarks.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
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