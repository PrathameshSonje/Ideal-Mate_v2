import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { SidebarV2 } from "@/components/SidebarV2";
import Providers from "@/components/providers";
import { auth } from "../../auth";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "IdealMate.",
  description: "Best way to study from Documents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className} font-sans  antialiased h-screen`}>
          <div className="flex">
            <SidebarV2 />
            <div className="w-full flex flex-col">
              <Navbar />
              <div className="flex-grow">
                {children}
              </div>
            </div>
          </div>
        </body>
      </Providers>
    </html>
  );
}
