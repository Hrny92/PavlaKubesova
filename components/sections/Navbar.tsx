"use client";
import { useState, useEffect } from "react";

const links = [
  { label: "O mně",       href: "#o-mne" },
  { label: "Proč já",     href: "#proc-ja" },
  { label: "Služby",      href: "#sluzby" },
  { label: "Nemovitosti", href: "#nemovitosti" },
  { label: "Reference",   href: "#reference" },
  { label: "Blog",        href: "#blog" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted]  = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Zamkni scroll stránky když je menu otevřené
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#0C0E1A]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <a href="#" className="flex flex-col leading-none" onClick={close}>
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

          {/* Desktop CTA — zaoblené rohy */}
          <a
            href="#kontakt"
            className="hidden lg:inline-flex items-center bg-[#C9A84C] text-[#0C0E1A] text-[12px] font-bold px-6 py-2.5 rounded-full hover:bg-[#D4B56A] transition-colors uppercase tracking-widest"
          >
            Kontakt
          </a>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative z-[60] flex flex-col justify-center items-center w-9 h-9"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          >
            {/* 3 čáry → X animace */}
            <span className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${open ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 my-[3.5px] ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${open ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile overlay — fullscreen panel */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Tmavý backdrop */}
        <div
          className="absolute inset-0 bg-[#0C0E1A]/80 backdrop-blur-sm"
          onClick={close}
        />

        {/* Panel sjede shora */}
        <div
          className={`absolute top-0 inset-x-0 bg-[#111525] border-b border-white/5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {/* Horní lišta se logem + zavírací tlačítko */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
            <a href="#" className="flex flex-col leading-none" onClick={close}>
              <span className="text-white font-bold text-sm tracking-[0.15em] uppercase">Pavla Kubešová</span>
              <span className="text-[#C9A84C] text-[10px] tracking-[0.25em] uppercase">Realitní makléřka</span>
            </a>
          </div>

          {/* Navigační položky */}
          <nav className="px-6 pt-4 pb-6">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 group"
                style={{
                  transitionDelay: open ? `${i * 50 + 80}ms` : "0ms",
                  transform: mounted && open ? "translateX(0)" : "translateX(-16px)",
                  opacity: mounted && open ? 1 : 0,
                  transition: "transform 0.4s cubic-bezier(0.32,0.72,0,1), opacity 0.4s ease",
                }}
              >
                <span className="text-[#9AA0B2] group-hover:text-white text-[15px] font-medium transition-colors">
                  {l.label}
                </span>
                <svg
                  width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 duration-200"
                >
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            ))}

            {/* CTA tlačítko */}
            <a
              href="#kontakt"
              onClick={close}
              className="mt-6 flex items-center justify-center bg-[#C9A84C] text-[#0C0E1A] font-bold text-[13px] uppercase tracking-widest py-4 rounded-full hover:bg-[#D4B56A] transition-colors"
              style={{
                transitionDelay: open ? `${links.length * 50 + 80}ms` : "0ms",
                transform: mounted && open ? "translateY(0)" : "translateY(12px)",
                opacity: mounted && open ? 1 : 0,
                transition: "transform 0.4s cubic-bezier(0.32,0.72,0,1), opacity 0.4s ease",
              }}
            >
              Kontaktovat mě
            </a>

            {/* Sociální sítě */}
            <div
              className="mt-6 flex items-center gap-4 justify-center"
              style={{
                transitionDelay: open ? `${links.length * 50 + 140}ms` : "0ms",
                transform: mounted && open ? "translateY(0)" : "translateY(12px)",
                opacity: mounted && open ? 1 : 0,
                transition: "transform 0.4s cubic-bezier(0.32,0.72,0,1), opacity 0.4s ease",
              }}
            >
              <a
                href="https://www.instagram.com/pavlakubesova.bidli/"
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#9AA0B2] hover:text-[#C9A84C] hover:border-[#C9A84C]/40 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/pavla.chudomska"
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#9AA0B2] hover:text-[#C9A84C] hover:border-[#C9A84C]/40 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
