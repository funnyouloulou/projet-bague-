import { notFound } from "next/navigation";
import { PRODUCTS, TESTIMONIALS, FAQ } from "@/data/products";
import Navbar from "@/components/Navbar";
import ProductPageClient from "@/components/ProductPageClient";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQ";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} – AURUM`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <main>
      <Navbar />
      <ProductPageClient product={product} />
      <Testimonials testimonials={TESTIMONIALS} />
      <FAQSection faq={FAQ} />
      <Footer />
    </main>
  );
}
