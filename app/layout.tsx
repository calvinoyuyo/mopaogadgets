import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import Providers from "@/Providers";
import 'svgmap/dist/svgMap.min.css';

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Mopao! - Premium Electronics Store",
  description: "Mopao! - Kenya's trusted source for premium electronics and gadgets. Quality products at competitive prices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} font-roboto bg-mopao-bg`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
