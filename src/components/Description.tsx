import { PRODUCT } from "@/data/product";

export default function Description() {
  return (
    <section className="py-20 bg-[#1a1a1a] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-[#C9A84C]/40" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-transparent to-[#C9A84C]/40" />

      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-8">
          L&apos;histoire derrière la pièce
        </p>

        <div className="space-y-6">
          {PRODUCT.longDescription.map((paragraph, i) => (
            <p
              key={i}
              className={`leading-relaxed ${
                i === 0
                  ? "font-serif text-2xl sm:text-3xl text-white italic font-light"
                  : "text-[#8a8178] text-base sm:text-lg"
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Divider ornament */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/40" />
          <div className="flex gap-1.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full bg-[#C9A84C] ${i === 1 ? "w-4" : "w-1"}`}
              />
            ))}
          </div>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/40" />
        </div>
      </div>
    </section>
  );
}
