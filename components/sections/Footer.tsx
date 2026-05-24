import CookieSettingsButton from "@/components/CookieSettingsButton";

const font = "var(--font-poppins), Poppins, system-ui, sans-serif";

const navLinks = [
  { label: "O mně", href: "#o-mne" },
  { label: "Proč já", href: "#proc-ja" },
  { label: "Služby", href: "#sluzby" },
  { label: "Nemovitosti", href: "#nemovitosti" },
  { label: "Reference", href: "#reference" },
  { label: "Blog", href: "#blog" },
  { label: "Kontakt", href: "#kontakt" },
];

const IgIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FbIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer style={{ background: "#080A14", fontFamily: font, borderTop: "1px solid rgba(255,255,255,0.05)" }}>

      <div className="max-w-7xl mx-auto px-6 lg:px-10" style={{ paddingTop: 56, paddingBottom: 48 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <p style={{ color: "#C9A84C", fontWeight: 800, fontSize: 15, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>
              Pavla Kubešová
            </p>
            <p style={{ color: "#9AA0B2", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 18 }}>
              Realitní makléřka
            </p>
            <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.75, maxWidth: 260 }}>
              Pomáhám klientům prodat, koupit nebo pronajmout nemovitost po celých Čechách.
            </p>
          </div>

          {/* Navigace */}
          <div>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20 }}>
              Navigace
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {navLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="footer-nav-link">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20 }}>
              Kontakt
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              <li>
                <a href="tel:+420608518525" className="footer-nav-link">+420 608 518 525</a>
              </li>
              <li>
                <a href="mailto:pavla.kubesova@bidli.cz" className="footer-nav-link">pavla.kubesova@bidli.cz</a>
              </li>
              <li style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.6 }}>
                Pardubice, Hradec Králové<br />celé Čechy
              </li>
            </ul>
          </div>

          {/* Sociální sítě */}
          <div>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20 }}>
              Sledujte mě
            </p>
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              <a href="https://www.instagram.com/pavla.kubesova.reality" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-btn">
                <IgIcon />
              </a>
              <a href="#" aria-label="Facebook" className="footer-social-btn">
                <FbIcon />
              </a>
            </div>
            <p style={{ color: "#6B7280", fontSize: 12, lineHeight: 1.65 }}>
              Tipy, novinky a aktuální nabídky na mém Instagramu.
            </p>
          </div>

        </div>

        {/* Dělicí čára */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 24 }} />

        {/* Spodní lišta */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "#4B5363", fontSize: 12 }}>
            © 2026 Ing. Pavla Kubešová · Všechna práva vyhrazena.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a href="/gdpr" className="footer-legal-link">
              Ochrana osobních údajů (GDPR)
            </a>
            <CookieSettingsButton />
          </div>
        </div>

      </div>
    </footer>
  );
}
