import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
}

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">Ce que disent nos clients</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-white">Ils l&apos;ont adopté</h2>
          <div className="divider-gold mx-auto mt-5" />
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} className="text-[#C9A84C] fill-[#C9A84C]" />)}
            </div>
            <span className="text-[#E8D5A3] font-medium">4.9</span>
            <span className="text-[#8a8178] text-sm">· 247 avis vérifiés</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-[#2a2420] rounded-2xl p-6 flex flex-col gap-4 border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C] text-xs font-semibold">{t.avatar}</div>
                  <div>
                    <p className="text-white text-sm font-medium">{t.name}</p>
                    <p className="text-[#8a8178] text-[11px]">{t.location}</p>
                  </div>
                </div>
                <Quote size={16} className="text-[#C9A84C]/40 shrink-0 mt-1" />
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={11} className={j < t.rating ? "text-[#C9A84C] fill-[#C9A84C]" : "text-[#8a8178]"} />)}
              </div>
              <p className="text-[#8a8178] text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
              <p className="text-[10px] text-[#C9A84C]/50">{t.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
