import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleCanvas from "@/components/ParticleCanvas";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060813",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://brandyuga.in'),
  title: "BrandYuga | We Build Brands That Dominate Online | E-Commerce, D2C & Marketplace Scaling",
  description:
    "BrandYuga delivers end-to-end e-commerce solutions: Product Research, D2C Website Development, Product Photography, Video Shoots, Amazon & Flipkart Operations, PPC Marketing, and Profit Analytics.",
  keywords: [
    "BrandYuga",
    "Product Research India",
    "D2C Website Development",
    "Amazon Account Management",
    "Flipkart Seller Growth",
    "Product Photography Shoots",
    "E-Commerce PPC Advertising",
    "Shopify Next.js Agency India",
  ],
  authors: [{ name: "BrandYuga" }],
  openGraph: {
    title: "BrandYuga - We Build Brands That Dominate Online",
    description:
      "Scale your e-commerce business across Amazon, Flipkart, and your own D2C storefront with BrandYuga.",
    url: "https://brandyuga.in",
    siteName: "BrandYuga",
    images: [
      {
        url: "/assets/images/logo.png",
        width: 1200,
        height: 630,
        alt: "BrandYuga",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/assets/images/logo.png",
    apple: "/assets/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/assets/images/logo.png" />
      </head>
      <body className="bg-[#060813] text-slate-100 antialiased min-h-screen relative flex flex-col selection:bg-purple-600 selection:text-white">
        <ParticleCanvas />
        <Navbar />
        <main className="flex-grow relative z-10">{children}</main>
        <FloatingWhatsApp />
        <Footer />
      </body>
    </html>
  );
}
