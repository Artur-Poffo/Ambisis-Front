import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navigation/components/Navbar";
import { Toaster } from "sonner";
import { MobileMenu } from "@/components/Navigation/components/MobileMenu";

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
        <MobileMenu />

        <main className="mt-24 px-4 lg:px-10 pb-10">{children}</main>

        <Toaster />
      </body>
    </html>
  );
}
