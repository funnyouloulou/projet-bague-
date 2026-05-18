"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCT } from "@/data/product";

export default function ProductCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = PRODUCT.images;

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-xl shadow-black/10 group">
        <Image
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          fill
          className="object-cover product-img"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={activeIndex === 0}
        />
        {activeIndex === 0 && (
          <div className="absolute top-0 left-0 w-full h-[35%] bg-gradient-to-b from-white via-white to-transparent z-[1]" />
        )}
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white" aria-label="Image précédente">
              <ChevronLeft size={16} className="text-[#1a1a1a]" />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white" aria-label="Image suivante">
              <ChevronRight size={16} className="text-[#1a1a1a]" />
            </button>
          </>
        )}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {PRODUCT.badges.map((badge, i) => (
            <span key={i} className={`text-[10px] tracking-[0.1em] uppercase px-3 py-1 rounded-full font-medium ${i === 0 ? "bg-[#C9A84C] text-white" : "bg-white/90 text-[#1a1a1a]"}`}>
              {badge}
            </span>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActiveIndex(i)} className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${activeIndex === i ? "border-[#C9A84C] shadow-md shadow-[#C9A84C]/20" : "border-transparent opacity-60 hover:opacity-90"}`}>
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
