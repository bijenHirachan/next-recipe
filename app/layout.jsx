import Navbar from "@components/Navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import NextSessionProvider from "@components/Providers/NextSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Recipe",
  description: "This app helps to search, create and update recipes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-amber-300`}>
        <NextSessionProvider>
          <Toaster />
          <Navbar />
          {children}
        </NextSessionProvider>
      </body>
    </html>
  );
}
