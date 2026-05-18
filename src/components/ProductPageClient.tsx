"use client";

import { useState } from "react";
import { ShoppingBag, Star, Users, Eye, Check, Loader2, Shield, Sparkles, Ruler, Truck, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/data/products";
import ProductCarouselGeneric from "./ProductCarouselGeneric";

function SizeGuideModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 z-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#8a8178] hover:text-[#1a1a1a] transition-colors">
          <X size={20} />
        </button>
        <h2 className="font-serif text-2xl text-[#1a1a1a] text-center mb-1">Guide des tailles</h2>
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] text-center mb-8">Bagues</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { step: "1", emoji: "🧵", title: "Enroulez", desc: "Prenez un fil et enroulez-le autour du doigt où vous souhaitez porter la bague." },
            { step: "2", emoji: "✏️", title: "Marquez", desc: "Tracez un trait à la jonction du fil à l'aide d'un crayon ou d'un stylo." },
            { step: "3", emoji: "📏", title: "Mesurez", desc: "Déroulez le fil et mesurez la longueur entre les deux points à l'aide d'une règle." },
          ].map(({ step, emoji, title, desc }) => (
            <div key={step} className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full border-2 border-[#C9A84C] flex items-center justify-center text-[#C9A84C] font-serif text-lg font-medium">{step}</div>
              <span className="text-2xl">{emoji}</span>
              <p className="font-medium text-[#1a1a1a] text-sm">{title}</p>
              <p className="text-[#8a8178] text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#FAF8F3] rounded-xl p-4 text-center">
          <p className="text-sm text-[#1a1a1a] font-medium mb-1">La longueur obtenue correspond à votre taille</p>
          <p className="text-xs text-[#8a8178]">Ex : 60mm de fil → taille 60. En cas de doute, prenez la taille supérieure.</p>
        </div>
      </div>
    </div>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={20} strokeWidth={1.5} />,
  sparkles: <Sparkles size={20} strokeWidth={1.5} />,
  ruler: <Ruler size={20} strokeWidth={1.5} />,
  truck: <Truck size={20} strokeWidth={1.5} />,
};

export default function ProductPageClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null
  );
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
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
        body: JSON.stringify({ size: selectedSize, productSlug: product.slug, productName: product.name, price: product.price }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Erreur lors de la création du paiement. Réessayez.");
    } catch {
      alert("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) { alert("Veuillez sélectionner une taille."); return; }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-28 pb-4 px-6 max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-[#8a8178] hover:text-[#C9A84C] transition-colors tracking-wide">
          <ArrowLeft size={13} /> Retour à la collection
        </Link>
      </div>

      {showSizeGuide && <SizeGuideModal onClose={() => setShowSizeGuide(false)} />}

      {/* Product section */}
      <section className="pb-20 bg-[#FAF8F3]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Carousel */}
            <ProductCarouselGeneric images={product.images} badges={product.badges} showBrandOverlay={product.slug === "bague-guerrier-acier"} />

            {/* Info */}
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="text-[#C9A84C] fill-[#C9A84C]" />
                  ))}
                </div>
                <span className="text-xs text-[#8a8178]">4.9/5 · 247 avis vérifiés</span>
              </div>

              {/* Title */}
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1a1a] leading-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-xs tracking-[0.15em] uppercase text-[#C9A84C]">{product.subtitle}</p>
              </div>

              {/* Price */}
              <div className="flex items-end gap-4">
                <span className="font-serif text-4xl font-medium text-[#1a1a1a]">
                  {product.price.toFixed(2)}{product.currency}
                </span>
                <div className="flex flex-col items-start">
                  <span className="text-lg line-through text-[#8a8178]">{product.originalPrice.toFixed(2)}{product.currency}</span>
                  <span className="text-xs bg-[#C9A84C]/15 text-[#A07830] px-2 py-0.5 rounded font-medium">-{discount}%</span>
                </div>
              </div>

              {/* Urgency */}
              <div className="flex items-center gap-4 text-xs text-[#8a8178]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse inline-block" />
                  {product.stockUrgency}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye size={12} /> {product.viewersCount} personnes regardent
                </span>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

              {/* Description */}
              <p className="text-[#8a8178] text-sm leading-relaxed">{product.shortDescription}</p>

              {/* Size selector — masqué si une seule taille */}
              {product.sizes.length > 1 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs tracking-[0.15em] uppercase text-[#1a1a1a] font-medium">Taille (mm)</span>
                    <button onClick={() => setShowSizeGuide(true)} className="text-xs text-[#C9A84C] underline underline-offset-2">Guide des tailles</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
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
              )}

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleBuy}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] disabled:opacity-60 text-white text-sm tracking-[0.15em] uppercase py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 font-medium"
                >
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Redirection...</> : <><ShoppingBag size={16} /> Acheter maintenant</>}
                </button>
                <button
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center gap-3 border-2 text-sm tracking-[0.12em] uppercase py-4 rounded-xl transition-all duration-300 ${
                    addedToCart ? "border-green-500 bg-green-50 text-green-600" : "border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-white"
                  }`}
                >
                  {addedToCart ? <><Check size={16} /> Ajouté !</> : <><ShoppingBag size={16} /> Ajouter au panier</>}
                </button>
              </div>

              <p className="text-[11px] text-center text-[#8a8178] tracking-wide">{product.priceNote}</p>

              {/* Trust icons */}
              <div className="grid grid-cols-3 gap-3">
                {[{ icon: "🔒", label: "Paiement sécurisé" }, { icon: "📦", label: "Suivi inclus" }, { icon: "↩️", label: "Retour 30j" }].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-1.5 bg-white rounded-xl py-3 px-2 shadow-sm">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-[10px] text-[#8a8178] text-center">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Viewers */}
              <div className="flex items-center gap-2 text-xs text-[#8a8178] bg-[#C9A84C]/8 rounded-xl px-4 py-3 border border-[#C9A84C]/20">
                <Users size={13} className="text-[#C9A84C]" />
                <span><strong className="text-[#1a1a1a]">{product.viewersCount} personnes</strong> regardent ce produit en ce moment</span>
              </div>
            </div>
          </div>

          {/* Long description */}
          <div className="mt-16 max-w-2xl mx-auto text-center">
            <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent mb-12" />
            <div className="space-y-5">
              {product.longDescription.map((p, i) => (
                <p key={i} className={i === 0 ? "font-serif text-2xl text-[#1a1a1a] italic" : "text-[#8a8178] leading-relaxed"}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {product.features.map((f, i) => (
              <div key={i} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-[#C9A84C]/20">
                <div className="w-11 h-11 rounded-xl bg-[#C9A84C]/10 text-[#C9A84C] flex items-center justify-center mb-4 group-hover:bg-[#C9A84C] group-hover:text-white transition-colors">
                  {iconMap[f.icon]}
                </div>
                <h3 className="font-medium text-[#1a1a1a] text-sm mb-1">{f.title}</h3>
                <p className="text-[#8a8178] text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
