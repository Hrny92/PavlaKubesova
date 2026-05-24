"use client";
import { useState, useEffect } from "react";

const font = "var(--font-poppins), Poppins, system-ui, sans-serif";

type CookiePrefs = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultPrefs: CookiePrefs = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>(defaultPrefs);

  useEffect(() => {
    const saved = localStorage.getItem("cookie-consent");
    if (!saved) setVisible(true);

    const handleOpen = () => {
      const saved = localStorage.getItem("cookie-consent");
      if (saved) setPrefs(JSON.parse(saved));
      setVisible(true);
      setShowDetail(true);
    };
    window.addEventListener("cookie-settings-open", handleOpen);
    return () => window.removeEventListener("cookie-settings-open", handleOpen);
  }, []);

  const save = (p: CookiePrefs) => {
    localStorage.setItem("cookie-consent", JSON.stringify(p));
    setVisible(false);
    setShowDetail(false);
  };

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => save({ necessary: true, analytics: false, marketing: false });
  const saveCustom = () => save(prefs);

  if (!visible) return null;

  return (
    <>
      {/* Overlay (jen při detailním nastavení) */}
      {showDetail && (
        <div
          onClick={() => setShowDetail(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 9998,
          }}
        />
      )}

      {/* Detailní modal */}
      {showDetail && (
        <div style={{
          position: "fixed",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(560px, 92vw)",
          background: "#111525",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20,
          padding: "36px 32px",
          zIndex: 9999,
          fontFamily: font,
        }}>
          <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 20, marginBottom: 8 }}>
            Nastavení cookies
          </h2>
          <p style={{ color: "#9AA0B2", fontSize: 13, lineHeight: 1.65, marginBottom: 28 }}>
            Níže si můžete upravit, které cookies povolujete. Nezbytné cookies jsou vždy aktivní, protože jsou nutné pro správné fungování webu.
          </p>

          {/* Kategorie */}
          {([
            {
              key: "necessary" as const,
              label: "Nezbytné cookies",
              desc: "Zajišťují základní funkce webu (navigace, formuláře). Nelze je vypnout.",
              locked: true,
            },
            {
              key: "analytics" as const,
              label: "Analytické cookies",
              desc: "Pomáhají nám pochopit, jak návštěvníci web používají (Google Analytics). Data jsou anonymizována.",
              locked: false,
            },
            {
              key: "marketing" as const,
              label: "Marketingové cookies",
              desc: "Slouží k zobrazování relevantní reklamy a sledování účinnosti kampaní.",
              locked: false,
            },
          ] as const).map(cat => (
            <div key={cat.key} style={{
              display: "flex", alignItems: "flex-start", justifyContent: "space-between",
              gap: 20, padding: "18px 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                  {cat.label}
                </p>
                <p style={{ color: "#9AA0B2", fontSize: 12, lineHeight: 1.6 }}>
                  {cat.desc}
                </p>
              </div>
              {/* Toggle */}
              <button
                disabled={cat.locked}
                onClick={() => !cat.locked && setPrefs(p => ({ ...p, [cat.key]: !p[cat.key] }))}
                style={{
                  flexShrink: 0,
                  width: 44, height: 24,
                  borderRadius: 999,
                  border: "none",
                  background: (cat.locked || prefs[cat.key]) ? "#C9A84C" : "rgba(255,255,255,0.15)",
                  cursor: cat.locked ? "not-allowed" : "pointer",
                  position: "relative",
                  transition: "background 0.25s",
                }}
              >
                <span style={{
                  position: "absolute",
                  top: 3, left: (cat.locked || prefs[cat.key]) ? 23 : 3,
                  width: 18, height: 18,
                  borderRadius: "50%",
                  background: "#fff",
                  transition: "left 0.25s",
                }} />
              </button>
            </div>
          ))}

          {/* Tlačítka modalu */}
          <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
            <button
              onClick={saveCustom}
              style={{
                flex: 1, padding: "13px",
                background: "#C9A84C", color: "#0C0E1A",
                fontFamily: font, fontWeight: 700, fontSize: 13,
                border: "none", borderRadius: 999, cursor: "pointer",
              }}
            >
              Uložit nastavení
            </button>
            <button
              onClick={acceptAll}
              style={{
                flex: 1, padding: "13px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff",
                fontFamily: font, fontWeight: 600, fontSize: 13,
                borderRadius: 999, cursor: "pointer",
              }}
            >
              Přijmout vše
            </button>
          </div>
        </div>
      )}

      {/* Spodní lišta */}
      {!showDetail && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          zIndex: 9997,
          background: "#111525",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.4)",
          fontFamily: font,
        }}>
          <div style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "20px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}>
            {/* Text */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                Tento web používá cookies 🍪
              </p>
              <p style={{ color: "#9AA0B2", fontSize: 12, lineHeight: 1.6 }}>
                Používáme cookies pro zlepšení vašeho zážitku a analýzu návštěvnosti.
                Podrobnosti v{" "}
                <a href="/gdpr" style={{ color: "#C9A84C", textDecoration: "underline" }}>
                  zásadách ochrany osobních údajů
                </a>.
              </p>
            </div>

            {/* Tlačítka */}
            <div style={{ display: "flex", gap: 10, flexShrink: 0, flexWrap: "wrap" }}>
              <button
                onClick={() => setShowDetail(true)}
                style={{
                  padding: "10px 20px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 999,
                  color: "#9AA0B2",
                  fontFamily: font, fontWeight: 600, fontSize: 12,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Nastavení
              </button>
              <button
                onClick={rejectAll}
                style={{
                  padding: "10px 20px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 999,
                  color: "#9AA0B2",
                  fontFamily: font, fontWeight: 600, fontSize: 12,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Odmítnout
              </button>
              <button
                onClick={acceptAll}
                style={{
                  padding: "10px 24px",
                  background: "#C9A84C",
                  border: "none",
                  borderRadius: 999,
                  color: "#0C0E1A",
                  fontFamily: font, fontWeight: 700, fontSize: 12,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Přijmout vše
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
