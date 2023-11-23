import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";

import NavbarComponent from "../_components/M/navbarMain";
import FooterComponent from "../_components/M/footer";
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
          <Toaster position="bottom-center" />
          <NavbarComponent />
          <main className="container mx-auto py-4">{children}</main>
          <FooterComponent />
        </Providers>
      </body>
    </html>
  );
}
