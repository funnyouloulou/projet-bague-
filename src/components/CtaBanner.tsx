import { ShoppingBag, ArrowRight } from "lucide-react";
import { PRODUCT } from "@/data/product";

export default function CtaBanner() {
  return (
    <section className="py-20 bg-[#1a1a1a] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.08)_0%,_transparent_70%)]" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-6">
          Offre limitée
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl text-white leading-tight mb-4">
          Ne laissez pas passer
          <br />
          <span className="shimmer italic">votre pièce signature</span>
        </h2>
        <p className="text-[#8a8178] mb-3">
          Il ne reste que <strong className="text-white">{PRODUCT.stockUrgency.replace("Plus que ", "").replace(" en stock", "")}</strong> en stock.
        </p>

        {/* Price block */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="font-serif text-4xl text-[#C9A84C]">
            {PRODUCT.price.toFixed(2)}{PRODUCT.currency}
          </span>
          <span className="text-xl line-through text-[#8a8178]">
            {PRODUCT.originalPrice.toFixed(2)}{PRODUCT.currency}
          </span>
        </div>

        {/* CTA */}
        <a
          href="#buy"
          className="inline-flex items-center gap-3 bg-[#C9A84C] hover:bg-[#A07830] text-white text-sm tracking-[0.15em] uppercase px-10 py-5 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#C9A84C]/25 hover:-translate-y-0.5 font-medium"
        >
          <ShoppingBag size={16} />
          Commander maintenant
          <ArrowRight size={16} />
        </a>

        <p className="mt-5 text-[11px] text-[#8a8178] tracking-wide">
          {PRODUCT.priceNote}
        </p>
      </div>
    </section>
  );
}
