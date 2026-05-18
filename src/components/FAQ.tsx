"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem { question: string; answer: string; }

export default function FAQSection({ faq }: { faq: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#FAF8F3]">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">Questions fréquentes</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1a1a]">Tout ce que vous voulez savoir</h2>
          <div className="divider-gold mx-auto mt-5" />
        </div>
        <div className="flex flex-col gap-3">
          {faq.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#1a1a1a]/5 overflow-hidden shadow-sm">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                <span className="text-sm font-medium text-[#1a1a1a] pr-4">{item.question}</span>
                <span className="shrink-0 w-7 h-7 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] flex items-center justify-center">
                  {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent mb-4" />
                  <p className="text-[#8a8178] text-sm leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
