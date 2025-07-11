import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import SessionProvider from "@/utils/SessionProvider";
import Providers from "@/Providers";
import { getServerSession } from "next-auth";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession();
  return (
    <body className={`${roboto.className} font-roboto bg-mopao-bg`}>
      <SessionProvider session={session}>
        <Header />
        <Providers>
          {children}
        </Providers>
        <Footer />
      </SessionProvider>
    </body>
  );
}
