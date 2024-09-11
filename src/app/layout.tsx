import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SidebarV2 } from "@/components/SidebarV2";
import Providers from "@/components/providers";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "IdealMate.",
  description: "Best way to study from Documents",
  // icons: {
  //   icon: '/mylogo.ico'
  // }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head key='iconOnly'>
        <link rel="icon" href="favicon.ico" type="image/x-icon" sizes="256x256"></link>
      </Head>
      <Providers>
        <body className={`${inter.className} font-sans antialiased h-screen`}>
          {children}
        </body>
      </Providers>
    </html>
  );
}
