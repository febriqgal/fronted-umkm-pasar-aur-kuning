import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import { Toaster } from "react-hot-toast";
import { appConfig } from "../_constant/appConfig";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${appConfig.appName}`,
  description: `${appConfig.appDesc}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster position="bottom-right" />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
