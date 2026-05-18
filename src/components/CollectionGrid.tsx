"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";

const CATEGORIES = [
  { key: "tous", label: "Tous" },
  { key: "bague", label: "Bagues" },
  { key: "bracelet", label: "Bracelets" },
  { key: "collier", label: "Colliers" },
];

function interleave(products: typeof PRODUCTS) {
  const groups: Record<string, typeof PRODUCTS> = {};
  products.forEach((p) => {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  });
  const buckets = Object.values(groups);
  const result: typeof PRODUCTS = [];
  const maxLen = Math.max(...buckets.map((g) => g.length));
  for (let i = 0; i < maxLen; i++) {
    for (const bucket of buckets) {
      if (bucket[i]) result.push(bucket[i]);
    }
  }
  return result;
}

export default function CollectionGrid() {
  const [activeCategory, setActiveCategory] = useState("tous");

  const filtered = activeCategory === "tous"
    ? interleave(PRODUCTS)
    : PRODUCTS.filter((p) => p.category.toLowerCase().includes(activeCategory));

  return (
    <section id="collection" className="py-20 lg:py-28 bg-[#FAF8F3]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">
            Notre sélection
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1a1a]">
            La Collection
          </h2>
          <div className="divider-gold mx-auto mt-5" />
        </div>

        {/* Filtres catégories */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`text-xs tracking-[0.2em] uppercase px-6 py-2.5 rounded-full border transition-all duration-200 ${
                activeCategory === cat.key
                  ? "bg-[#C9A84C] text-white border-[#C9A84C] font-semibold"
                  : "bg-white text-[#8a8178] border-[#e0d8cc] hover:border-[#C9A84C] hover:text-[#C9A84C]"
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="text-[10px] tracking-[0.15em] uppercase text-[#C9A84C]/70 border border-dashed border-[#C9A84C]/30 px-4 py-2.5 rounded-full">
            + à venir…
          </span>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
            const discount = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            );
            return (
              <Link
                key={product.slug}
                href={`/produit/${product.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1 border border-transparent hover:border-[#C9A84C]/20"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-[#F5F0E8]">
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    fill
                    className="object-cover product-img"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {product.slug === "bague-mandalorian-argent" && (
                    <div className="absolute top-0 left-0 w-full h-[35%] bg-gradient-to-b from-white via-white to-transparent z-[1]" />
                  )}
                  {/* Badges */}
                  <div className="absolute top-0 left-0 flex flex-col gap-1.5 p-3">
                    {product.featured && (
                      <span className="bg-[#C9A84C] text-white text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-full font-semibold shadow-md">
                        ★ Bestseller
                      </span>
                    )}
                    <span className="bg-white/90 text-[#1a1a1a] text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full font-medium">
                      -{discount}%
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="bg-white text-[#1a1a1a] text-xs tracking-[0.15em] uppercase px-5 py-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex items-center gap-2 shadow-lg">
                      Voir le produit <ArrowRight size={12} />
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} className="text-[#C9A84C] fill-[#C9A84C]" />
                    ))}
                    <span className="text-[10px] text-[#8a8178] ml-1">4.9</span>
                  </div>
                  <h3 className="font-serif text-lg text-[#1a1a1a] mb-1 leading-snug group-hover:text-[#C9A84C] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[#8a8178] text-xs mb-4 line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xl text-[#1a1a1a]">
                      {product.price.toFixed(2)}{product.currency}
                    </span>
                    <span className="text-sm line-through text-[#8a8178]">
                      {product.originalPrice.toFixed(2)}{product.currency}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Coming soon */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col items-center gap-3 bg-white border border-[#C9A84C]/20 rounded-2xl px-10 py-7 shadow-sm">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C9A84C]">Bientôt disponible</span>
            <p className="font-serif text-xl text-[#1a1a1a]">De nouveaux bijoux arrivent</p>
            <p className="text-[#8a8178] text-xs max-w-xs leading-relaxed">
              Nous enrichissons continuellement la collection. Revenez régulièrement pour découvrir les nouvelles pièces.
            </p>
            <div className="divider-gold mx-auto mt-1" />
          </div>
        </div>

      </div>
    </section>
  );
}
