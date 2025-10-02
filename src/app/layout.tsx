import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navigation/components/Navbar";
import { Toaster } from "sonner";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ambisis",
  description: "Projeto do processo seletivo da Ambisis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.className} ${roboto.variable} font-roboto antialiased bg-gray-200 text-black`}
      >
        <Navbar />

        <main>{children}</main>

        <Toaster />
      </body>
    </html>
  );
}
