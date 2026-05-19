"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { PRODUCT } from "@/data/product";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { totalItems } = useCart();

  const href = (anchor: string) => isHome ? `#${anchor}` : `/#${anchor}`;

  const scrollTo = (anchor: string) => (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAF8F3]/95 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="font-serif text-2xl tracking-[0.2em] shimmer font-semibold">
            {PRODUCT.brandName}
          </a>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.15em] uppercase text-[#8a8178]">
            <a href={href("collection")} onClick={scrollTo("collection")} className="hover:text-[#C9A84C] transition-colors">Collection</a>
            <a href={href("testimonials")} onClick={scrollTo("testimonials")} className="hover:text-[#C9A84C] transition-colors">Avis</a>
            <a href={href("faq")} onClick={scrollTo("faq")} className="hover:text-[#C9A84C] transition-colors">FAQ</a>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            {/* Icône panier */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-[#1a1a1a] hover:text-[#C9A84C] transition-colors"
              aria-label="Panier"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C9A84C] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className="md:hidden text-[#1a1a1a]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#FAF8F3] border-t border-[#E8D5A3]/40 px-6 py-6 flex flex-col gap-5">
            {["Collection", "Avis", "FAQ"].map((item, i) => (
              <a
                key={i}
                href={href(["collection", "testimonials", "faq"][i])}
                className="text-sm tracking-[0.12em] uppercase text-[#8a8178] hover:text-[#C9A84C] transition-colors"
                onClick={(e) => { setMenuOpen(false); scrollTo(["collection", "testimonials", "faq"][i])(e); }}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </>
  );
}
