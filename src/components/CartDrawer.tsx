"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer({ onClose }: { onClose: () => void }) {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        alert("Erreur lors de la création du paiement. Réessayez.");
      }
    } catch {
      alert("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#FAF8F3] w-full max-w-md h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8D5A3]/40">
          <h2 className="font-serif text-xl text-[#1a1a1a]">Mon panier</h2>
          <button onClick={onClose} className="text-[#8a8178] hover:text-[#1a1a1a] transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-[#C9A84C]/40" />
              <p className="text-[#8a8178]">Votre panier est vide</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.productSlug}-${item.size}`} className="flex gap-4 bg-white rounded-xl p-4 shadow-sm">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#F5F0E8]">
                  <Image src={item.image} alt={item.productName} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm text-[#1a1a1a] leading-snug mb-1">{item.productName}</p>
                  {item.size && <p className="text-xs text-[#8a8178] mb-2">Taille : {item.size}</p>}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productSlug, item.size, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-[#E8D5A3] flex items-center justify-center text-[#8a8178] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium text-[#1a1a1a] w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productSlug, item.size, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-[#E8D5A3] flex items-center justify-center text-[#8a8178] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-sm text-[#1a1a1a]">
                        {(item.price * item.quantity).toFixed(2)}{item.currency}
                      </span>
                      <button
                        onClick={() => removeItem(item.productSlug, item.size)}
                        className="text-[#8a8178] hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#E8D5A3]/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#8a8178]">Total</span>
              <span className="font-serif text-2xl text-[#1a1a1a]">{totalPrice.toFixed(2)}€</span>
            </div>
            <p className="text-xs text-[#8a8178] text-center">Livraison offerte · 7–14 jours ouvrés</p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] disabled:opacity-60 text-white text-sm tracking-[0.15em] uppercase py-4 rounded-xl transition-all duration-200 font-medium"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Redirection...</> : <><ShoppingBag size={16} /> Commander</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
