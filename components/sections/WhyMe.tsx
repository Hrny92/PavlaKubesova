import React from "react";

const font = "var(--font-poppins), Poppins, system-ui, sans-serif";

const reasons = [
  {
    title: "Profesionální marketing",
    text: "Vaši nemovitost nablyskám tak, že v záplavě inzerátů vynikne. Každý inzerát je strategicky postaven pro maximální dosah.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
  },
  {
    title: "Moderní technologie",
    text: "3D prohlídky Matterport a videoprohlídky jsou u mě standardem – ne nadstandardem. Kupující si nemovitost prohlédne odkudkoli.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "Cenová strategie",
    text: "Prodávám za nejvyšší možnou tržní cenu díky precizní analýze trhu. Žádné zbytečné slevy, žádné kompromisy.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Kompletní právní servis",
    text: "Bezpečí je na prvním místě – od smluv až po úschovu financí. Postarám se o každý detail, abyste spali klidně.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Lidský přístup & srozumitelnost",
    text: "Žádné složité termíny. Jsem neustále na příjmu a vše vám vysvětlím tak, abyste měli jasno v každém kroku.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function WhyMe() {
  return (
    <section id="proc-ja" className="py-24 lg:py-32 bg-[#0C0E1A]" style={{ fontFamily: font }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Nadpis */}
        <div className="text-center mb-16">
          <div className="section-label">Proč spolupracovat právě se mnou</div>
          <h2
            className="text-white font-extrabold leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Pět důvodů, proč klienti<br />
            volí právě mě
          </h2>
        </div>

        {/*
          Jeden CSS grid přes VŠECHNY buňky.
          Řádky mají výšku dle nejvyššího obsahu v řádku →
          ikona i název se automaticky dorovnají na výšku popisu.
        */}
        <div
          className="max-w-7xl mx-auto"
          style={{ display: "grid", gridTemplateColumns: "52px 1fr 1fr" }}
        >
          {reasons.map((r, i) => {
            const isLast = i === reasons.length - 1;
            const borderStyle = isLast ? "none" : "1px solid rgba(255,255,255,0.06)";
            const py = { paddingTop: "28px", paddingBottom: "28px" };

            return (
              <React.Fragment key={i}>
                {/* Ikona */}
                <div
                  style={{ ...py, borderBottom: borderStyle, display: "flex", alignItems: "center" }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    border: "1px solid rgba(201,168,76,0.3)",
                    background: "rgba(201,168,76,0.05)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#C9A84C", flexShrink: 0,
                  }}>
                    {r.icon}
                  </div>
                </div>

                {/* Název */}
                <div
                  style={{ ...py, borderBottom: borderStyle, display: "flex", alignItems: "center", paddingRight: 32, paddingLeft: 16 }}
                >
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: 15, margin: 0 }}>
                    {r.title}
                  </p>
                </div>

                {/* Popis */}
                <div
                  style={{ ...py, borderBottom: borderStyle, display: "flex", alignItems: "center", paddingRight: 32, paddingLeft: 16 }}
                >
                  <p style={{ color: "#9AA0B2", fontSize: 14, lineHeight: 1.65, margin: 0 }}>
                    {r.text}
                  </p>
                </div>
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
}
