import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleCanvas from "@/components/ParticleCanvas";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import StructuredData from "@/components/StructuredData";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060813",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://brandyuga.in'),
  title: {
    default: "BrandYuga | We Build Brands That Dominate Online | E-Commerce, D2C & Marketplace Scaling",
    template: "%s | BrandYuga",
  },
  description:
    "BrandYuga delivers end-to-end e-commerce solutions: Product Research, Custom D2C Store Development, E-Commerce Product Photography, High-CTR Video Shoots, Amazon & Flipkart Marketplace Management, PPC Advertising, and Profit Analytics in India.",
  keywords: [
    "BrandYuga",
    "E-commerce agency India",
    "Amazon account management agency",
    "Flipkart seller management services",
    "D2C website development India",
    "Shopify agency India",
    "Next.js ecommerce development",
    "Amazon PPC management",
    "Flipkart PLA advertising",
    "Product research India",
    "Product photography shoots India",
    "Video shoots for ecommerce ads",
    "E-commerce growth agency Delhi Mumbai Bangalore",
    "Amazon FBA optimization",
    "D2C brand scaling agency",
  ],
  authors: [{ name: "BrandYuga Team", url: "https://brandyuga.in" }],
  creator: "BrandYuga",
  publisher: "BrandYuga Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://brandyuga.in",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "BrandYuga | We Build Brands That Dominate Online",
    description:
      "Scale your e-commerce revenue on Amazon, Flipkart, and your own high-speed D2C storefront with BrandYuga's 360° growth stack.",
    url: "https://brandyuga.in",
    siteName: "BrandYuga",
    images: [
      {
        url: "/assets/images/logo.png",
        width: 1200,
        height: 630,
        alt: "BrandYuga E-Commerce Agency",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandYuga - We Build Brands That Dominate Online",
    description:
      "Scale your e-commerce revenue across Amazon, Flipkart, and your own D2C storefront with BrandYuga.",
    images: ["/assets/images/logo.png"],
    creator: "@brandyuga",
    site: "@brandyuga",
  },
  icons: {
    icon: [
      { url: "/assets/images/logo.png" },
      { url: "/assets/images/logo-icon.png", sizes: "32x32" },
    ],
    apple: "/assets/images/logo.png",
  },
  category: "technology",
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
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
        <link rel="canonical" href="https://brandyuga.in" />
      </head>
      <body className="bg-[#060813] text-slate-100 antialiased min-h-screen relative flex flex-col selection:bg-purple-600 selection:text-white">
        <StructuredData />
        <ParticleCanvas />
        <Navbar />
        <main className="flex-grow relative z-10">{children}</main>
        <FloatingWhatsApp />
        <Footer />
      </body>
    </html>
  );
}

