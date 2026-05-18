import { CheckCircle, Package, Mail } from "lucide-react";
import { PRODUCT } from "@/data/product";

export default function MerciPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F3] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-[#C9A84C]/15 flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={40} className="text-[#C9A84C]" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl text-[#1a1a1a] mb-3">
          Commande confirmée !
        </h1>
        <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-8">
          {PRODUCT.brandName}
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent mb-8" />

        {/* Info steps */}
        <div className="flex flex-col gap-4 mb-10 text-left">
          {[
            {
              icon: <Mail size={16} />,
              title: "Email de confirmation",
              desc: "Vous allez recevoir un email récapitulatif dans quelques minutes.",
            },
            {
              icon: <Package size={16} />,
              title: "Expédition sous 24–48h",
              desc: "Votre colis sera expédié et un numéro de suivi vous sera envoyé.",
            },
            {
              icon: <CheckCircle size={16} />,
              title: "Livraison 7–14 jours",
              desc: "Livraison offerte directement à votre adresse.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="w-9 h-9 rounded-lg bg-[#C9A84C]/10 text-[#C9A84C] flex items-center justify-center shrink-0 mt-0.5">
                {step.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-[#1a1a1a] mb-0.5">{step.title}</p>
                <p className="text-xs text-[#8a8178] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-[#C9A84C] border border-[#C9A84C]/40 hover:border-[#C9A84C] px-8 py-3 rounded-full transition-colors"
        >
          Retour à la boutique
        </a>
      </div>
    </main>
  );
}
