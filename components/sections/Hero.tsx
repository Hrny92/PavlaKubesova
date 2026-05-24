"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

function norm(p: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (p - start) / (end - start)));
}
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 2);
}
function easeIn(t: number) {
  return t * t;
}

export default function Hero() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      setProgress(p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // ── FOTO: rozplývá se jako první (0 → 0.55) ───────────────────
  const photoFade    = easeOut(norm(progress, 0, 0.55));
  const photoOpacity = 1 - photoFade;
  const photoY       = photoFade * -20;
  const photoScale   = 1 + photoFade * 0.04;

  // ── TEXT: rozlétá se do stran (0.25 → 0.80) ──────────────────
  const tp = easeIn(norm(progress, 0.25, 0.80));
  const textOpacity = 1 - tp;

  // Každý element letí jinam
  const h1Line1X  = tp * -180;   // "Realitní makléřka" → doleva
  const h1Line1R  = tp * -6;     // lehký náklon
  const h1Line2X  = tp * 200;    // "s lidským přístupem" → doprava
  const h1Line2R  = tp * 5;

  const subLeftX  = tp * -120;   // subtitle vlevo → doleva
  const subLeftY  = tp * 40;
  const subRightX = tp * 130;    // subtitle vpravo → doprava
  const subRightY = tp * 30;

  const btn1X     = tp * -100;   // zlaté tlačítko → doleva dolů
  const btn1Y     = tp * 60;
  const btn2X     = tp * 110;    // outline tlačítko → doprava dolů
  const btn2Y     = tp * 50;

  const noPointer = tp > 0.5;
  // ───────────────────────────────────────────────────────────────

  return (
    <div style={{ height: "200vh", position: "relative" }}>
      <section
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          background: "#0C0E1A",
          overflow: "hidden",
        }}
      >
        {/* VRSTVA 1 — H1, rozlétá se do stran */}
        <div
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "0 1rem",
            zIndex: 1,
          }}
        >
          <h1
            className="w-full text-center font-extrabold leading-[1.06] tracking-tight"
            style={{
              fontFamily: "var(--font-poppins), Poppins, system-ui, sans-serif",
              fontSize: "clamp(2.6rem, 7vw, 7.5rem)",
            }}
          >
            {/* Řádek 1 — letí doleva */}
            <span
              className="block text-white"
              style={{
                display: "block",
                transform: `translateX(${h1Line1X}px) rotate(${h1Line1R}deg)`,
                opacity: textOpacity,
                willChange: "transform, opacity",
              }}
            >
              Realitní makléřka
            </span>
            {/* Řádek 2 — letí doprava */}
            <span
              className="block text-[#C9A84C]"
              style={{
                display: "block",
                transform: `translateX(${h1Line2X}px) rotate(${h1Line2R}deg)`,
                opacity: textOpacity,
                willChange: "transform, opacity",
              }}
            >
              s lidským<span style={{ marginLeft: "14rem" }}>přístupem</span>
            </span>
          </h1>
        </div>

        {/* VRSTVA 2 — foto, mizí při scrollu */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: `translateX(-50%) translateY(${photoY}px) scale(${photoScale})`,
            transformOrigin: "bottom center",
            opacity: photoOpacity,
            zIndex: 2,
            height: "88%",
            width: "44vw",
            maxWidth: "600px",
            minWidth: "260px",
            pointerEvents: "none",
            willChange: "transform, opacity",
          }}
        >
          <Image
            src="/images/hero-photo.webp"
            alt="Ing. Pavla Kubešová"
            fill
            className="object-contain object-bottom"
            priority
            sizes="(max-width: 768px) 80vw, 44vw"
          />
        </div>

        {/* VRSTVA 3 — subtitle + buttony, rozlétají se každý jinam */}
        <div
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "0 1.5rem",
            zIndex: 3,
            pointerEvents: noPointer ? "none" : "auto",
          }}
        >
          {/* Spacer */}
          <div style={{ height: "calc(2 * clamp(2.6rem, 7vw, 7.5rem) * 1.06 + 1.5rem)", flexShrink: 0 }} />

          {/* Subtitle řádek — dvě části letí každá jinam */}
          <div className="flex items-center justify-between w-full max-w-6xl mb-7 mt-48">
            <p
              className="text-sm lg:text-[15px] text-white"
              style={{
                transform: `translateX(${subLeftX}px) translateY(${subLeftY}px)`,
                opacity: textOpacity,
                willChange: "transform, opacity",
              }}
            >
              <span className="font-bold">Ing. Pavla Kubešová</span>
              <span className="text-[#9AA0B2]"> – Váš partner pro reality</span>
            </p>
            <p
              className="hidden md:block text-sm lg:text-[15px] text-[#9AA0B2] text-right"
              style={{
                transform: `translateX(${subRightX}px) translateY(${subRightY}px)`,
                opacity: textOpacity,
                willChange: "transform, opacity",
              }}
            >
              s moderním marketingem a férovým jednáním.
            </p>
          </div>

          {/* Tlačítka — letí každé jiným směrem */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-full bg-[#C9A84C] text-[#0C0E1A] font-bold uppercase tracking-[0.14em] px-9 py-[14px] hover:bg-[#D4B56A] transition-colors whitespace-nowrap"
              style={{
                fontSize: "12px",
                transform: `translateX(${btn1X}px) translateY(${btn1Y}px)`,
                opacity: textOpacity,
                willChange: "transform, opacity",
              }}
            >
              Chci prodat nemovitost
            </a>
            <a
              href="#nemovitosti"
              className="inline-flex items-center justify-center rounded-full text-white font-bold uppercase tracking-[0.14em] px-9 py-[14px] transition-colors whitespace-nowrap"
              style={{
                fontSize: "12px",
                border: "1px solid rgba(255,255,255,0.3)",
                transform: `translateX(${btn2X}px) translateY(${btn2Y}px)`,
                opacity: textOpacity,
                willChange: "transform, opacity",
              }}
            >
              Aktuální nabídka
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute", bottom: "2rem", left: "50%",
            transform: "translateX(-50%)",
            zIndex: 4,
            opacity: Math.max(0, 1 - progress * 8),
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "6px",
            pointerEvents: "none",
          }}
        >
          <span style={{ color: "#9AA0B2", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-poppins)" }}>
            Scrollovat
          </span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #9AA0B2, transparent)", animation: "scrollHint 1.6s ease-in-out infinite" }} />
        </div>
      </section>

      <style>{`
        @keyframes scrollHint {
          0%   { opacity: 0; transform: scaleY(0); transform-origin: top; }
          50%  { opacity: 1; transform: scaleY(1); transform-origin: top; }
          100% { opacity: 0; transform: scaleY(1); transform-origin: bottom; }
        }
      `}</style>
    </div>
  );
}
