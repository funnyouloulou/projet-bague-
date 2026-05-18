import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CollectionGrid from "@/components/CollectionGrid";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQ";
import Footer from "@/components/Footer";
import { TESTIMONIALS, FAQ } from "@/data/products";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CollectionGrid />
      <Testimonials testimonials={TESTIMONIALS} />
      <FAQSection faq={FAQ} />
      <Footer />
    </main>
  );
}
