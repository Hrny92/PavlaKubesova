"use client";
import { useState, useRef, useEffect } from "react";

const font = "var(--font-poppins), Poppins, system-ui, sans-serif";

const testimonials = [
  {
    id: 1,
    stars: 5,
    text: `„Děkujeme za zprostředkování nájmu nádherného bytu, jsme moc spokojeni a vyloženě jsme si byt zamilovali. Děkujeme především za Vaši ochotu a spolupráci! Přeji Vám mnoho úspěchů, jste skvělá profesionálka."`,
    name: "Eva",
    detail: "Pronájem bytu · Pardubice",
  },
  {
    id: 2,
    stars: 5,
    text: `„Profesionální, lidská a vždy dostupná. 3D prohlídka nám ušetřila spoustu zbytečných návštěv – byt se prodal na druhou prohlídku."`,
    name: "Jana K.",
    detail: "Prodej bytu · Praha 8",
  },
  {
    id: 3,
    stars: 5,
    text: `„Domek po rodičích jsme prodali rychleji a za víc, než jsme čekali. Pavla je férová – řekne, co umí, a slovo vždy dodrží."`,
    name: "Petr & Lucie M.",
    detail: "Prodej domu · Chrudim",
  },
  {
    id: 4,
    stars: 5,
    text: `„Pavla nám pomohla koupit první byt. Celý proces byl stresující, ale ona nás provázela každým krokem a vždy měla čas na naše otázky. Výsledek předčil očekávání."`,
    name: "Martin H.",
    detail: "Koupě bytu · Praha 5",
  },
  {
    id: 5,
    stars: 5,
    text: `„Hledali jsme pronájem v centru Brna a Pavla nám do týdne našla přesně to, co jsme chtěli. Rychlost a profesionalita na jedničku."`,
    name: "Tereza N.",
    detail: "Pronájem bytu · Brno",
  },
  {
    id: 6,
    stars: 5,
    text: `„Prodej domu s velkou zahradou není jednoduchý, ale Pavla měla vše pod kontrolou. Ocenili jsme její upřímnost a strategický přístup k ceně."`,
    name: "Jakub & Monika S.",
    detail: "Prodej domu · Středočeský kraj",
  },
  {
    id: 7,
    stars: 5,
    text: `„Zpočátku jsme měli obavy, zda byt prodáme za dobrou cenu. Pavla nás uklidnila, připravila skvělou prezentaci a výsledná cena překonala naše očekávání."`,
    name: "Radka V.",
    detail: "Prodej bytu · Pardubice",
  },
];

const VISIBLE = 3;
const GAP = 16;

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#C9A84C" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  const maxIndex = testimonials.length - VISIBLE;

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setCardWidth((containerRef.current.offsetWidth - (VISIBLE - 1) * GAP) / VISIBLE);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const goTo = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const translateX = currentIndex * (cardWidth + GAP);

  return (
    <section id="reference" className="py-24 lg:py-32 bg-[#0C0E1A]" style={{ fontFamily: font }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Nadpis */}
        <div className="text-center mb-14">
          <div className="section-label">Reference klientů</div>
          <h2
            className="text-white font-extrabold leading-tight"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}
          >
            Co o spolupráci<br />
            říkají <span style={{ color: "#C9A84C" }}>moji klienti</span>
          </h2>
        </div>

        {/* Slider */}
        <div ref={containerRef} style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              gap: GAP,
              transform: `translateX(-${translateX}px)`,
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {testimonials.map(t => (
              <div
                key={t.id}
                style={{
                  flex: `0 0 ${cardWidth}px`,
                  background: "#111525",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 18,
                  padding: "32px 28px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 300,
                  boxSizing: "border-box",
                }}
              >
                {/* Hvězdičky + text */}
                <div>
                  <div style={{ display: "flex", gap: 4, marginBottom: 22 }}>
                    {Array.from({ length: t.stars }).map((_, i) => <StarIcon key={i} />)}
                  </div>
                  <p style={{ color: "#D8DAE5", fontSize: 15, lineHeight: 1.78, margin: 0 }}>
                    {t.text}
                  </p>
                </div>

                {/* Autor */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20, marginTop: 28 }}>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                    {t.name}
                  </p>
                  <p style={{ color: "#9AA0B2", fontSize: 13 }}>
                    {t.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ovládání */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 40 }}>

          {/* Šipka vlevo */}
          <button
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            style={{
              width: 44, height: 44, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: currentIndex === 0 ? "rgba(255,255,255,0.18)" : "#fff",
              cursor: currentIndex === 0 ? "default" : "pointer",
              transition: "color 0.2s, border-color 0.2s",
              flexShrink: 0,
            }}
          >
            <ChevronLeft />
          </button>

          {/* Tečky */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === currentIndex ? 28 : 8,
                  height: 8,
                  borderRadius: 999,
                  background: i === currentIndex ? "#C9A84C" : "rgba(255,255,255,0.2)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.3s ease, background 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* Šipka vpravo */}
          <button
            onClick={() => goTo(currentIndex + 1)}
            disabled={currentIndex === maxIndex}
            style={{
              width: 44, height: 44, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: currentIndex === maxIndex ? "rgba(255,255,255,0.18)" : "#fff",
              cursor: currentIndex === maxIndex ? "default" : "pointer",
              transition: "color 0.2s, border-color 0.2s",
              flexShrink: 0,
            }}
          >
            <ChevronRight />
          </button>

        </div>

      </div>
    </section>
  );
}
