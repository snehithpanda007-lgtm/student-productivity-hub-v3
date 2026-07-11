import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "Student Productivity Hub",
  description: "Manage tasks, notes and productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-900">
        <Navbar />

        <MobileNav />

        <div className="flex flex-1">
          <div className="hidden md:block">
            <Sidebar />
          </div>

          <main className="flex-1 p-8">
            {children}
          </main>
        </div>

        <Footer />
      </body>
    </html>
  );
}