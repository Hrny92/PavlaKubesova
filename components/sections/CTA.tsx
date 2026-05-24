import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const font = "var(--font-poppins), Poppins, system-ui, sans-serif";

const steps = [
  { n: "01", text: "Ozvěte se mi vyplněním formuláře" },
  { n: "02", text: "Domluvíme si termín schůzky" },
  { n: "03", text: "Vyslechnu si vaše potřeby a navrhnu řešení" },
  { n: "04", text: "Zajistím hladký průběh prodeje" },
];

export default function CTA() {
  return (
    <section id="jak-to-funguje" style={{
      background: "linear-gradient(135deg, #D4AE52 0%, #C9A84C 40%, #B8943E 100%)",
      fontFamily: font, overflow: "hidden", position: "relative",
    }}>
      <div style={{ position: "absolute", top: "-20%", right: "38%", width: 600, height: 600, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-30%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        {/* Stack na mobilu, 2 sloupce na desktopu */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Foto — na mobilu nahoře */}
          <Reveal direction="right" delay={100} className="order-first lg:order-last" style={{ position: "relative", zIndex: 1 }}>
            <div style={{ position: "relative", height: 340, borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 60px rgba(12,14,26,0.25)" }}
              className="lg:h-[580px]">
              <Image src="/images/CTA.webp" alt="Pavla Kubešová – realitní makléřka" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 45vw" />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to top, rgba(12,14,26,0.5) 0%, transparent 100%)", pointerEvents: "none" }} />
            </div>
          </Reveal>

          {/* Obsah */}
          <Reveal direction="left" style={{ position: "relative", zIndex: 1 }}>
            <p style={{ color: "rgba(12,14,26,0.55)", fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 14 }}>
              Proces spolupráce
            </p>
            <h2 style={{ color: "#0C0E1A", fontSize: "clamp(1.8rem, 3.2vw, 2.7rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 36 }}>
              Jak funguje<br />spolupráce?
            </h2>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {steps.map((s, i) => (
                <div key={s.n} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#0C0E1A", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A84C", fontWeight: 800, fontSize: 13 }}>
                      {s.n}
                    </div>
                    {i < steps.length - 1 && <div style={{ width: 1, height: 28, background: "rgba(12,14,26,0.22)" }} />}
                  </div>
                  <p style={{ color: "#0C0E1A", fontSize: 15, fontWeight: 600, lineHeight: 1.5, paddingTop: 11, paddingBottom: i < steps.length - 1 ? 28 : 0 }}>
                    {s.text}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 36, paddingTop: 32, borderTop: "1px solid rgba(12,14,26,0.18)" }}>
              <p style={{ color: "#0C0E1A", fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 800, marginBottom: 20, lineHeight: 1.3 }}>
                Máte zájem o spolupráci?
              </p>
              <a href="#kontakt" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "#0C0E1A", color: "#C9A84C", fontWeight: 700, fontSize: 12,
                letterSpacing: "0.16em", textTransform: "uppercase",
                padding: "14px 28px", borderRadius: 999, textDecoration: "none",
              }}>
                Kontaktujte mě
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
