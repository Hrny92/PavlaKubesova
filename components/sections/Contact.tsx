"use client";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

const font = "var(--font-poppins), Poppins, system-ui, sans-serif";

const localities = ["Pardubice", "Chrudim", "Hradec Králové", "Praha", "Říčany", "Čáslav", "Kutná Hora", "Vysočina"];

const PhoneIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

const MapIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const LockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#111525",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  padding: "14px 16px",
  color: "#fff",
  fontSize: 14,
  fontFamily: font,
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "#9AA0B2",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  marginBottom: 8,
  fontFamily: font,
};

export default function Contact() {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error || "Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.");
      }
    } catch {
      setError("Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="kontakt" className="py-24 lg:py-32 bg-[#0C0E1A]" style={{ fontFamily: font }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEVÁ strana */}
          <Reveal direction="left">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 28, height: 2, background: "#C9A84C" }} />
              <span style={{ color: "#C9A84C", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Kontakt
              </span>
            </div>

            <h2
              className="text-white font-extrabold leading-tight"
              style={{ fontSize: "clamp(2.4rem, 4vw, 3.2rem)", marginBottom: 28 }}
            >
              Pojďme se <span style={{ color: "#C9A84C" }}>seznámit</span>
            </h2>

            <p style={{ color: "#9AA0B2", fontSize: 15, lineHeight: 1.7, maxWidth: 420, marginBottom: 36 }}>
              Napište mi, zavolejte nebo si rovnou rezervujte nezávaznou konzultaci. Společně probereme vaši nemovitost a navrhnu strategii prodeje.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 36 }}>
              {[
                { icon: <PhoneIcon />, label: "Telefon", value: "+420 608 518 525", href: "tel:+420608518525" },
                { icon: <MailIcon />, label: "E-mail", value: "pavla.kubesova@bidli.cz", href: "mailto:pavla.kubesova@bidli.cz" },
                { icon: <MapIcon />, label: "Působnost", value: "Pardubice, Hradec Králové – celé Čechy", href: undefined },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#C9A84C", flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ color: "#9AA0B2", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 3 }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} style={{ color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p style={{ color: "#9AA0B2", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>
                Aktivně působím v lokalitách
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {localities.map(loc => (
                  <span key={loc} style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 999,
                    padding: "6px 16px",
                    color: "#D0D4E0",
                    fontSize: 13,
                    fontWeight: 500,
                  }}>
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* PRAVÁ strana — formulář */}
          <Reveal direction="right" delay={180}>
            {sent ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, textAlign: "center" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: "rgba(201,168,76,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20, color: "#C9A84C",
                }}>
                  <SendIcon />
                </div>
                <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 22, marginBottom: 10 }}>Zpráva odeslána!</h3>
                <p style={{ color: "#9AA0B2", fontSize: 14 }}>Ozvu se vám do 24 hodin.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Jméno a příjmení</label>
                  <input
                    required type="text"
                    value={form.fullName}
                    onChange={e => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Jan Novák"
                    style={inputStyle}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label style={labelStyle}>E-mail</label>
                    <input
                      required type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="jan@novak.cz"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Telefon</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+420 777 000 000"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Dotaz</label>
                  <textarea
                    required rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Stručně popište vaši situaci..."
                    style={{ ...inputStyle, resize: "none" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    background: loading ? "rgba(201,168,76,0.6)" : "#C9A84C",
                    color: "#0C0E1A",
                    fontFamily: font,
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: "0.06em",
                    border: "none",
                    borderRadius: 999,
                    padding: "17px 32px",
                    cursor: loading ? "default" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    transition: "background 0.2s",
                  }}
                >
                  {loading ? "Odesílám…" : "Odeslat a domluvit konzultaci"}
                  {!loading && <SendIcon />}
                </button>

                {error && (
                  <p style={{ color: "#e05555", fontSize: 13, textAlign: "center" }}>{error}</p>
                )}

                <p style={{
                  color: "#9AA0B2", fontSize: 12, textAlign: "center",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}>
                  <LockIcon /> Vaše údaje jsou v bezpečí. Neposíláme spam.
                </p>
              </form>
            )}
          </Reveal>

        </div>
      </div>
    </section>
  );
}
