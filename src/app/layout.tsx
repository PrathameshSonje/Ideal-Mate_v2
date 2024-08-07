import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

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
      <body className={`${inter.className}  antialiased h-screen`}>
        <div className="flex">
          <Sidebar />
          <div className="w-full flex flex-col">
            <Navbar />
            <div className="flex-grow">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
