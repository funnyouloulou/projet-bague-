"use client";

import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
      {/* Background texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2420] to-[#1a1a1a]" />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#C9A84C]/30 to-transparent ml-16 hidden lg:block" />
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#C9A84C]/30 to-transparent mr-16 hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Pre-title */}
        <p className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase mb-6 animate-fadeInUp">
          Collection Exclusive
        </p>

        {/* Main title */}
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.1] mb-6 animate-fadeInUp delay-100">
          Portez
          <br />
          <span className="shimmer italic font-light">qui vous êtes</span>
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-6 animate-fadeInUp delay-200">
          <div className="flex-1 max-w-[80px] h-px bg-gradient-to-r from-transparent to-[#C9A84C]/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
          <div className="flex-1 max-w-[80px] h-px bg-gradient-to-l from-transparent to-[#C9A84C]/60" />
        </div>

        {/* Subtitle */}
        <p className="text-[#8a8178] text-sm sm:text-base tracking-wide leading-relaxed max-w-xl mx-auto mb-10 animate-fadeInUp delay-300">
          Bagues, bracelets et colliers pour hommes et femmes. Des bijoux uniques pensés pour affirmer votre style au quotidien.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center animate-fadeInUp delay-400">
          <a
            href="#collection"
            className="group flex items-center gap-3 bg-[#C9A84C] hover:bg-[#A07830] text-white text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A84C]/25 hover:-translate-y-0.5"
          >
            Découvrir la collection
            <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-2 mt-10 text-[#8a8178] text-xs animate-fadeInUp delay-400">
          <div className="flex -space-x-1.5">
            {["TM", "AD", "SR"].map((initials) => (
              <div
                key={initials}
                className="w-7 h-7 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center text-[9px] text-[#C9A84C] font-medium"
              >
                {initials}
              </div>
            ))}
          </div>
          <span className="ml-1">
            <strong className="text-white font-medium">+247</strong> clients satisfaits ce mois
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#C9A84C]/60 animate-bounce">
        <span className="text-[9px] tracking-[0.3em] uppercase">Défiler</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
}
