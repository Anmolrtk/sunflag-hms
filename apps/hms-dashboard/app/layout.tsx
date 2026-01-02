import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Ensure you have globals.css or remove this line if not using it

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MedCore HMS",
  description: "Hospital Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
