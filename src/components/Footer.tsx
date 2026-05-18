import { PRODUCT } from "@/data/product";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-[#8a8178] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-serif text-xl text-[#C9A84C] tracking-[0.2em] mb-1">
              {PRODUCT.brandName}
            </p>
            <p className="text-xs tracking-wider">{PRODUCT.brandTagline}</p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-xs tracking-[0.15em] uppercase">
            {["Mentions légales", "CGV", "Politique de retour", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-[#C9A84C] transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent my-8" />

        <p className="text-center text-[11px] tracking-wide">
          © {new Date().getFullYear()} {PRODUCT.brandName}. Tous droits réservés.
          &nbsp;·&nbsp; Site de dropshipping — produits expédiés depuis nos fournisseurs.
        </p>
      </div>
    </footer>
  );
}
