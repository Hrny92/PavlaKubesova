"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "O mně", href: "#o-mne" },
  { label: "Proč já", href: "#proc-ja" },
  { label: "Služby", href: "#sluzby" },
  { label: "Nemovitosti", href: "#nemovitosti" },
  { label: "Reference", href: "#reference" },
  { label: "Blog", href: "#blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0C0E1A]/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-18">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none">
          <span className="text-white font-bold text-sm tracking-[0.15em] uppercase">Pavla Kubešová</span>
          <span className="text-[#C9A84C] text-[10px] tracking-[0.25em] uppercase">Realitní makléřka</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-[13px] text-[#9AA0B2] hover:text-white transition-colors font-medium tracking-wide">
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#kontakt"
          className="hidden lg:inline-flex items-center bg-[#C9A84C] text-[#0C0E1A] text-[13px] font-bold px-5 py-2.5 hover:bg-[#D4B56A] transition-colors uppercase tracking-wider">
          Kontakt
        </a>

        {/* Mobile toggle */}
        <button className="lg:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#111525] border-t border-white/5">
          <div className="px-6 py-5 flex flex-col gap-0">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="py-3 text-[#9AA0B2] hover:text-white text-sm font-medium border-b border-white/5 last:border-0 transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#kontakt" onClick={() => setOpen(false)}
              className="mt-4 bg-[#C9A84C] text-[#0C0E1A] text-sm font-bold py-3 text-center uppercase tracking-wider">
              Kontakt
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
