"use client";

import { useState } from "react";
import { ShoppingBag, Star, Users, Eye, Check, Loader2 } from "lucide-react";
import { PRODUCT } from "@/data/product";
import ProductCarousel from "./ProductCarousel";

export default function ProductSection() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const discount = Math.round(
    ((PRODUCT.originalPrice - PRODUCT.price) / PRODUCT.originalPrice) * 100
  );

  const handleBuy = async () => {
    if (!selectedSize) {
      alert("Veuillez sélectionner une taille avant de commander.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ size: selectedSize }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect vers Stripe Checkout
      } else {
        alert("Erreur lors de la création du paiement. Réessayez.");
      }
    } catch {
      alert("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Veuillez sélectionner une taille.");
      return;
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <section id="product" className="py-20 lg:py-28 bg-[#FAF8F3]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <div className="flex-1 max-w-[100px] h-px bg-gradient-to-r from-transparent to-[#C9A84C]/40" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C9A84C]">Notre pièce signature</span>
          <div className="flex-1 max-w-[100px] h-px bg-gradient-to-l from-transparent to-[#C9A84C]/40" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Carousel */}
          <ProductCarousel />

          {/* Right: Product info */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-6">
            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="text-[#C9A84C] fill-[#C9A84C]" />
                ))}
              </div>
              <span className="text-xs text-[#8a8178]">4.9/5 · 247 avis vérifiés</span>
            </div>

            {/* Title */}
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1a1a] leading-tight mb-2">
                {PRODUCT.name}
              </h2>
              <p className="text-xs tracking-[0.15em] uppercase text-[#C9A84C]">
                {PRODUCT.subtitle}
              </p>
            </div>

            {/* Price */}
            <div id="buy" className="flex items-end gap-4">
              <span className="font-serif text-4xl font-medium text-[#1a1a1a]">
                {PRODUCT.price.toFixed(2)}{PRODUCT.currency}
              </span>
              <div className="flex flex-col items-start">
                <span className="text-lg line-through text-[#8a8178]">
                  {PRODUCT.originalPrice.toFixed(2)}{PRODUCT.currency}
                </span>
                <span className="text-xs bg-[#C9A84C]/15 text-[#A07830] px-2 py-0.5 rounded font-medium">
                  -{discount}% de réduction
                </span>
              </div>
            </div>

            {/* Urgency indicators */}
            <div className="flex items-center gap-4 text-xs text-[#8a8178]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse inline-block" />
                {PRODUCT.stockUrgency}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye size={12} />
                {PRODUCT.viewersCount} personnes regardent
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs tracking-[0.15em] uppercase text-[#1a1a1a] font-medium">
                  Taille (tour de doigt en mm)
                </span>
                <button className="text-xs text-[#C9A84C] underline underline-offset-2 hover:text-[#A07830]">
                  Guide des tailles
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {PRODUCT.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 rounded-lg border text-sm transition-all duration-150 ${
                      selectedSize === size
                        ? "border-[#C9A84C] bg-[#C9A84C] text-white shadow-md"
                        : "border-[#1a1a1a]/20 text-[#1a1a1a] hover:border-[#C9A84C] hover:text-[#C9A84C]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleBuy}
                className="w-full flex items-center justify-center gap-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] disabled:opacity-60 text-white text-sm tracking-[0.15em] uppercase py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 font-medium"
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> Redirection...</>
                ) : (
                  <><ShoppingBag size={16} /> Acheter maintenant</>
                )}
              </button>

              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-3 border-2 text-sm tracking-[0.12em] uppercase py-4 rounded-xl transition-all duration-300 ${
                  addedToCart
                    ? "border-green-500 bg-green-50 text-green-600"
                    : "border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-white"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={16} />
                    Ajouté avec succès !
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    Ajouter au panier
                  </>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <p className="text-[11px] text-center text-[#8a8178] tracking-wide">
              {PRODUCT.priceNote}
            </p>

            {/* Trust icons */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: "🔒", label: "Paiement sécurisé" },
                { icon: "📦", label: "Suivi inclus" },
                { icon: "↩️", label: "Retour 30j" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-1.5 bg-white rounded-xl py-3 px-2 shadow-sm"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-[10px] text-[#8a8178] text-center tracking-wide">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Viewers */}
            <div className="flex items-center gap-2 text-xs text-[#8a8178] bg-[#C9A84C]/8 rounded-xl px-4 py-3 border border-[#C9A84C]/20">
              <Users size={13} className="text-[#C9A84C]" />
              <span>
                <strong className="text-[#1a1a1a]">{PRODUCT.viewersCount} personnes</strong> regardent ce produit en ce moment
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
