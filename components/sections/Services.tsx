"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const font = "var(--font-poppins), Poppins, system-ui, sans-serif";
const GAP = 14;

/* ── Ikony ─────────────────────────────────────── */
const IconHome = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconCamera = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
  </svg>
);
const IconCredit = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const IconBuyout = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>
  </svg>
);
const IconZap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconInvest = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const IconScale = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="3" x2="12" y2="21"/><path d="M3 7l9-4 9 4"/><path d="M3 17l9-4 9 4"/>
    <line x1="3" y1="7" x2="3" y2="17"/><line x1="21" y1="7" x2="21" y2="17"/>
  </svg>
);

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

/* ── Shared ─────────────────────────────────────── */
const IconBadge = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    width: 44, height: 44, borderRadius: "50%",
    border: "1px solid rgba(201,168,76,0.35)",
    background: "rgba(201,168,76,0.07)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#C9A84C", flexShrink: 0,
  }}>
    {children}
  </div>
);

const cardBase: React.CSSProperties = {
  background: "rgba(17,21,37,0.55)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 16,
  padding: "28px 28px 32px",
  display: "flex",
  flexDirection: "column",
  fontFamily: font,
  backdropFilter: "blur(8px)",
  height: "100%",
};

const services = [
  { icon: <IconHome />, title: "Prodej a pronájem", text: "Prodám nebo pronajmu vaši nemovitost tak, aby vám to dávalo smysl finančně i lidsky. Vy řešíte plány do budoucna, já vyřeším vše kolem smluv, prohlídek, vyjednávání i předání nemovitosti." },
  { icon: <IconCamera />, title: "Špičková prezentace", text: "Fotky z mobilu necháme influencerům. Vaši nemovitost připravím tak, aby zaujala během prvních 5 vteřin – home staging, profi foto, 3D Matterport, video." },
  { icon: <IconCredit />, title: "Hypotéky a financování", text: "Spolupracuji s prověřenými finančními specialisty a společně najdeme řešení, které bude dávat smysl dnes i za pár let." },
  { icon: <IconBuyout />, title: "Výkup nemovitostí", text: "Potřebujete prodat rychle nebo řešíte exekuci? Zajistím férový výkup bez zdlouhavého čekání, bez nejistoty a bez stresu." },
  { icon: <IconZap />, title: "Energie a přepisy", text: "Papírování s elektřinou a plynem nechte klidně na mně. Postarám se o přepisy energií, komunikaci s dodavateli i všechny administrativní detaily." },
  { icon: <IconInvest />, title: "Investiční projekty", text: "Pomohu vám najít investici, která vydělává dnes, ale i za několik let. Počítám čísla, hlídám rizika a přemýšlím jako investor." },
  { icon: <IconScale />, title: "Odhady nemovitostí", text: "Dostanete realistickou cenu podloženou daty, zkušeností a skutečnou znalostí trhu. Přesnost je cennější než optimismus." },
];

/* ── Carousel (mobile only) ─────────────────────── */
function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setCardWidth(containerRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const maxIndex = services.length - 1;
  const goTo = (i: number) => setCurrentIndex(Math.max(0, Math.min(i, maxIndex)));
  const translateX = currentIndex * (cardWidth + GAP);

  return (
    <>
      <div ref={containerRef} style={{ overflow: "hidden" }}>
        <div style={{
          display: "flex",
          gap: GAP,
          transform: `translateX(-${translateX}px)`,
          transition: "transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
          {services.map((s) => (
            <div
              key={s.title}
              style={{
                flex: `0 0 ${cardWidth}px`,
                background: "#111525",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 18,
                padding: "28px 24px 30px",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
              }}
            >
              <div style={{ marginBottom: 20 }}><IconBadge>{s.icon}</IconBadge></div>
              <p style={{ color: "#fff", fontWeight: 800, fontSize: 17, lineHeight: 1.25, marginBottom: 12 }}>{s.title}</p>
              <p style={{ color: "#9AA0B2", fontSize: 13, lineHeight: 1.72 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigace */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 28 }}>
        <button
          onClick={() => goTo(currentIndex - 1)}
          disabled={currentIndex === 0}
          style={{
            width: 44, height: 44, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.18)", background: "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: currentIndex === 0 ? "rgba(255,255,255,0.2)" : "#fff",
            cursor: currentIndex === 0 ? "default" : "pointer",
          }}
        ><ChevronLeft /></button>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {services.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === currentIndex ? 24 : 8, height: 8, borderRadius: 999,
              background: i === currentIndex ? "#C9A84C" : "rgba(255,255,255,0.2)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "width 0.3s ease, background 0.3s ease",
            }} />
          ))}
        </div>

        <button
          onClick={() => goTo(currentIndex + 1)}
          disabled={currentIndex === maxIndex}
          style={{
            width: 44, height: 44, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.18)", background: "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: currentIndex === maxIndex ? "rgba(255,255,255,0.2)" : "#fff",
            cursor: currentIndex === maxIndex ? "default" : "pointer",
          }}
        ><ChevronRight /></button>
      </div>
    </>
  );
}

/* ── Hlavní komponenta ───────────────────────────── */
export default function Services() {
  return (
    <section id="sluzby" className="py-24 lg:py-32 bg-[#0C0E1A]" style={{ fontFamily: font }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <Reveal>
          <div className="text-center mb-12 lg:mb-14">
            <div className="section-label">Služby</div>
            <h2 className="text-white font-extrabold leading-tight" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}>
              Co pro vás<br />mohu <span style={{ color: "#C9A84C" }}>udělat</span>
            </h2>
          </div>
        </Reveal>

        {/* ═══════════════════════════════════════
            MOBILNÍ LAYOUT — fotka + carousel
        ═══════════════════════════════════════ */}
        <div className="lg:hidden">
          <Reveal>
            <div style={{
              position: "relative",
              height: 260,
              borderRadius: 18,
              overflow: "hidden",
              marginBottom: 16,
            }}>
              <Image
                src="/images/sluzby.webp"
                alt="Služby Pavly Kubešové"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(12,14,26,0.5) 0%, transparent 60%)",
              }} />
            </div>
          </Reveal>

          <Reveal delay={80} duration={800}>
            <ServicesCarousel />
          </Reveal>
        </div>

        {/* ═══════════════════════════════════════
            DESKTOPOVÝ LAYOUT — bento grid
        ═══════════════════════════════════════ */}
        <div className="hidden lg:block">

          {/* TOP řada — 3 sloupce */}
          <div className="grid grid-cols-3 gap-3 mb-3">

            {/* Foto */}
            <Reveal direction="left" style={{ borderRadius: 16, overflow: "hidden", minHeight: 260, position: "relative" }}>
              <Image src="/images/sluzby.webp" alt="Služby Pavly Kubešové" fill className="object-cover" sizes="33vw" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(12,14,26,0.2) 0%, transparent 100%)" }} />
            </Reveal>

            {/* Velká karta — Prodej a pronájem */}
            <Reveal delay={130} style={{ display: "flex" }}>
              <div className="service-card" style={{ ...cardBase, justifyContent: "space-between" }}>
                <div style={{ marginBottom: 24 }}><IconBadge><IconHome /></IconBadge></div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 800, fontSize: 22, marginBottom: 12, lineHeight: 1.2 }}>Prodej a pronájem</p>
                  <p style={{ color: "#9AA0B2", fontSize: 13, lineHeight: 1.7 }}>
                    Prodám nebo pronajmu vaši nemovitost tak, aby vám to dávalo smysl finančně i lidsky. Vy řešíte plány do budoucna, já vyřeším vše kolem smluv, prohlídek, vyjednávání i předání nemovitosti.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* 2 střední karty */}
            <Reveal direction="right" delay={260} style={{ display: "flex" }}>
              <div className="grid grid-rows-2 gap-3 w-full">
                <div className="service-card" style={cardBase}>
                  <div style={{ marginBottom: 16 }}><IconBadge><IconCamera /></IconBadge></div>
                  <p style={{ color: "#fff", fontWeight: 800, fontSize: 17, marginBottom: 8, lineHeight: 1.2 }}>Špičková prezentace</p>
                  <p style={{ color: "#9AA0B2", fontSize: 12, lineHeight: 1.65 }}>
                    Fotky z mobilu necháme influencerům. Vaši nemovitost připravím tak, aby zaujala během prvních 5 vteřin – home staging, profi foto, 3D Matterport, video.
                  </p>
                </div>
                <div className="service-card" style={cardBase}>
                  <div style={{ marginBottom: 16 }}><IconBadge><IconCredit /></IconBadge></div>
                  <p style={{ color: "#fff", fontWeight: 800, fontSize: 17, marginBottom: 8, lineHeight: 1.2 }}>Hypotéky a financování</p>
                  <p style={{ color: "#9AA0B2", fontSize: 12, lineHeight: 1.65 }}>
                    Spolupracuji s prověřenými finančními specialisty a společně najdeme řešení, které bude dávat smysl dnes i za pár let.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* DOLNÍ řada — 4 sloupce */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { title: "Výkup nemovitostí", text: "Potřebujete prodat rychle nebo řešíte exekuci? Zajistím férový výkup bez zdlouhavého čekání, bez nejistoty a bez stresu.", icon: <IconBuyout /> },
              { title: "Energie a přepisy", text: "Papírování s elektřinou a plynem nechte klidně na mně. Postarám se o přepisy energií, komunikaci s dodavateli i všechny administrativní detaily.", icon: <IconZap /> },
              { title: "Investiční projekty", text: "Pomohu vám najít investici, která vydělává dnes, ale i za několik let. Počítám čísla, hlídám rizika a přemýšlím jako investor.", icon: <IconInvest /> },
              { title: "Odhady nemovitostí", text: "Dostanete realistickou cenu podloženou daty, zkušeností a skutečnou znalostí trhu. Přesnost je cennější než optimismus.", icon: <IconScale /> },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 80} style={{ display: "flex" }}>
                <div className="service-card" style={cardBase}>
                  <div style={{ marginBottom: 18 }}><IconBadge>{s.icon}</IconBadge></div>
                  <p style={{ color: "#fff", fontWeight: 800, fontSize: 15, marginBottom: 8, lineHeight: 1.25 }}>{s.title}</p>
                  <p style={{ color: "#9AA0B2", fontSize: 12, lineHeight: 1.65 }}>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
