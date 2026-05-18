import { Shield, Sparkles, Ruler, Truck } from "lucide-react";
import { PRODUCT } from "@/data/product";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={22} strokeWidth={1.5} />,
  sparkles: <Sparkles size={22} strokeWidth={1.5} />,
  ruler: <Ruler size={22} strokeWidth={1.5} />,
  truck: <Truck size={22} strokeWidth={1.5} />,
};

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-[#FAF8F3]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">
            Pourquoi choisir cette pièce
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1a1a]">
            L&apos;excellence dans chaque détail
          </h2>
          <div className="divider-gold mx-auto mt-5" />
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCT.features.map((feature, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-[#C9A84C]/20"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 text-[#C9A84C] flex items-center justify-center mb-5 group-hover:bg-[#C9A84C] group-hover:text-white transition-colors duration-300">
                {iconMap[feature.icon]}
              </div>

              <h3 className="font-medium text-[#1a1a1a] mb-2 text-sm tracking-wide">
                {feature.title}
              </h3>
              <p className="text-[#8a8178] text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats band */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: "247+", label: "clients ce mois" },
            { value: "4.9/5", label: "note moyenne" },
            { value: "98%", label: "satisfaits" },
            { value: "30j", label: "retour garanti" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-[#1a1a1a] rounded-2xl py-7 px-4"
            >
              <p className="font-serif text-3xl text-[#C9A84C] mb-1">{stat.value}</p>
              <p className="text-[11px] tracking-[0.15em] uppercase text-[#8a8178]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
