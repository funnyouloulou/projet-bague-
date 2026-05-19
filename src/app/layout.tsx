import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "AURUM – Bagues & Chevalières d'Exception",
  description:
    "Découvrez notre collection de bagues et chevalières artisanales. Élégance intemporelle, qualité supérieure. Livraison offerte.",
  keywords: "bague, chevalière, bijoux, or, argent, homme, femme, luxe",
  openGraph: {
    title: "AURUM – Bagues & Chevalières d'Exception",
    description: "Élégance intemporelle, qualité supérieure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
