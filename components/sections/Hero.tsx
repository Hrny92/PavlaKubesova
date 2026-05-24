"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

function easeOut(t: number) { return 1 - Math.pow(1 - t, 2); }

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

  // Foto: jemný zoom při scrollu
  const photoScale = 1 + easeOut(progress) * 0.07;

  // Obsah: fade + slide nahoru
  const contentOpacity = Math.max(0, 1 - progress * 2.8);
  const contentY = easeOut(progress) * -50;

  return (
    <div style={{ height: "200vh", position: "relative" }}>
      <section
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: "#0C0E1A",
        }}
      >
        {/* ── Fotka — celá obrazovka ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${photoScale})`,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <Image
            src="/images/hero-photo-mobile.png"
            alt="Ing. Pavla Kubešová"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* ── Gradient — tmavý dole pro čitelnost textu ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(12,14,26,0.90) 0%, rgba(12,14,26,0.45) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Text overlay — dole ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0 1.5rem 2.5rem",
            opacity: contentOpacity,
            transform: `translateY(${contentY}px)`,
            willChange: "transform, opacity",
            pointerEvents: contentOpacity < 0.1 ? "none" : "auto",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              paddingLeft: "clamp(0px, 2.5vw, 2.5rem)",
              paddingRight: "clamp(0px, 2.5vw, 2.5rem)",
            }}
          >
            {/* Label */}
            <p
              style={{
                color: "#C9A84C",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 16,
                fontFamily: "var(--font-poppins), Poppins, system-ui, sans-serif",
              }}
            >
              Ing. Pavla Kubešová · Realitní makléřka
            </p>

            {/* H1 */}
            <h1
              style={{
                fontFamily: "var(--font-poppins), Poppins, system-ui, sans-serif",
                fontWeight: 800,
                lineHeight: 1.07,
                letterSpacing: "-0.01em",
                marginBottom: 20,
                fontSize: "clamp(2.4rem, 6.5vw, 6rem)",
                color: "#fff",
              }}
            >
              Realitní makléřka<br />
              <span style={{ color: "#C9A84C" }}>s lidským přístupem</span>
            </h1>

            {/* Subtitle + tlačítka */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px 40px",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontSize: "clamp(13px, 1.4vw, 16px)",
                  lineHeight: 1.6,
                  maxWidth: 420,
                  fontFamily: "var(--font-poppins), Poppins, system-ui, sans-serif",
                  margin: 0,
                }}
              >
                Moderní marketing, férové jednání<br className="hidden sm:block" />
                a osobní přístup ke každé nemovitosti.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
                <a
                  href="#kontakt"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 999,
                    background: "#C9A84C",
                    color: "#0C0E1A",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "14px 28px",
                    textDecoration: "none",
                    fontFamily: "var(--font-poppins), Poppins, system-ui, sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  Chci prodat nemovitost
                </a>
                <a
                  href="#nemovitosti"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.35)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "14px 28px",
                    textDecoration: "none",
                    fontFamily: "var(--font-poppins), Poppins, system-ui, sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  Aktuální nabídka
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Scroll hint — jen desktop ── */}
        <div
          className="hidden lg:flex"
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            opacity: Math.max(0, 1 - progress * 10),
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "var(--font-poppins)",
            }}
          >
            Scrollovat
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
              animation: "scrollHint 1.6s ease-in-out infinite",
            }}
          />
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
