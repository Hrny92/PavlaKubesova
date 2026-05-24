import Image from "next/image";

const font = "var(--font-poppins), Poppins, system-ui, sans-serif";

const steps = [
  { n: "01", text: "Ozvěte se mi vyplněním formuláře" },
  { n: "02", text: "Domluvíme si termín schůzky" },
  { n: "03", text: "Vyslechnu si vaše potřeby a navrhnu řešení" },
  { n: "04", text: "Zajistím hladký průběh prodeje" },
];

export default function CTA() {
  return (
    <section
      id="jak-to-funguje"
      style={{
        background: "linear-gradient(135deg, #D4AE52 0%, #C9A84C 40%, #B8943E 100%)",
        fontFamily: font,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Jemná textura — velký zlatý kruh v pozadí */}
      <div style={{
        position: "absolute", top: "-20%", right: "38%",
        width: 600, height: 600, borderRadius: "50%",
        background: "rgba(255,255,255,0.06)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-30%", left: "5%",
        width: 400, height: 400, borderRadius: "50%",
        background: "rgba(255,255,255,0.04)",
        pointerEvents: "none",
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-28">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

          {/* LEVÁ strana — obsah */}
          <div style={{ position: "relative", zIndex: 1 }}>

            {/* Label */}
            <p style={{
              color: "rgba(12,14,26,0.55)",
              fontSize: 11, fontWeight: 700,
              letterSpacing: "0.22em", textTransform: "uppercase",
              marginBottom: 14,
            }}>
              Proces spolupráce
            </p>

            {/* Nadpis */}
            <h2 style={{
              color: "#0C0E1A",
              fontSize: "clamp(2rem, 3.2vw, 2.7rem)",
              fontWeight: 800, lineHeight: 1.2,
              marginBottom: 44,
            }}>
              Jak funguje<br />spolupráce?
            </h2>

            {/* Kroky */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {steps.map((s, i) => (
                <div key={s.n} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

                  {/* Číslo + spojovací linka */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: "50%",
                      background: "#0C0E1A",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#C9A84C", fontWeight: 800, fontSize: 13,
                      letterSpacing: "0.05em", flexShrink: 0,
                    }}>
                      {s.n}
                    </div>
                    {i < steps.length - 1 && (
                      <div style={{ width: 1, height: 32, background: "rgba(12,14,26,0.22)", marginTop: 0 }} />
                    )}
                  </div>

                  {/* Text kroku */}
                  <p style={{
                    color: "#0C0E1A",
                    fontSize: 16, fontWeight: 600, lineHeight: 1.5,
                    paddingTop: 12,
                    paddingBottom: i < steps.length - 1 ? 32 : 0,
                  }}>
                    {s.text}
                  </p>

                </div>
              ))}
            </div>

            {/* Dělící čára + CTA */}
            <div style={{
              marginTop: 44,
              paddingTop: 36,
              borderTop: "1px solid rgba(12,14,26,0.18)",
            }}>
              <p style={{
                color: "#0C0E1A",
                fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
                fontWeight: 800, marginBottom: 22,
                lineHeight: 1.3,
              }}>
                Máte zájem o spolupráci?
              </p>
              <a
                href="#kontakt"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: "#0C0E1A", color: "#C9A84C",
                  fontWeight: 700, fontSize: 12,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  padding: "15px 32px", borderRadius: 999,
                  textDecoration: "none",
                  fontFamily: font,
                }}
              >
                Kontaktujte mě
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>

          </div>

          {/* PRAVÁ strana — fotka */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              position: "relative",
              height: 580,
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(12,14,26,0.28)",
            }}>
              <Image
                src="/images/CTA.jpg"
                alt="Pavla Kubešová – realitní makléřka"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
              {/* Jemný gradient overlay dole */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
                background: "linear-gradient(to top, rgba(12,14,26,0.5) 0%, transparent 100%)",
                pointerEvents: "none",
              }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
