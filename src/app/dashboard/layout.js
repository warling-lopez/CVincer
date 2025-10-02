import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CVincer - mejora tu CV y Destaca en el mercado laboral",
  description: "mejora tu CV y Destaca en el mercado laboral",
};

export default function RootLayout({ children }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
    </div>
  );
}
