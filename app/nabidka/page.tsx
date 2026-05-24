import Link from "next/link";
import Image from "next/image";
import { getAllProperties, type Property } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

const font = "var(--font-poppins), Poppins, system-ui, sans-serif";

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const statusLabel: Record<string, { label: string; color: string }> = {
  active: { label: "Aktivní", color: "#4CAF50" },
  reserved: { label: "Rezervováno", color: "#FF9800" },
  sold: { label: "Prodáno", color: "#9AA0B2" },
};

function PropertyCard({ p }: { p: Property }) {
  const imgUrl = p.mainImage ? urlFor(p.mainImage).width(600).height(400).url() : null;
  const st = statusLabel[p.status] ?? statusLabel.active;

  return (
    <Link href={`/nabidka/${p.slug.current}`} style={{ textDecoration: "none" }}>
      <div style={{
        background: "#111525",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 18,
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}>
        {/* Foto */}
        <div style={{ position: "relative", height: 220, background: "#1a2035", flexShrink: 0 }}>
          {imgUrl && (
            <Image src={imgUrl} alt={p.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
          )}
          {p.badge && (
            <div style={{
              position: "absolute", top: 14, left: 14,
              background: "rgba(12,14,26,0.75)", backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 999, padding: "5px 12px",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#fff", fontFamily: font,
            }}>{p.badge}</div>
          )}
          <div style={{
            position: "absolute", top: 14, right: 14,
            background: "rgba(12,14,26,0.65)", backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 999, padding: "4px 10px",
            fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
            color: st.color, fontFamily: font,
          }}>{st.label}</div>
          <button style={{
            position: "absolute", bottom: 14, right: 14,
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(12,14,26,0.65)", backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", cursor: "pointer",
          }}><HeartIcon /></button>
        </div>
        {/* Info */}
        <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <p style={{ color: "#9AA0B2", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
            {p.location}
          </p>
          <p style={{ color: "#fff", fontWeight: 800, fontSize: 16, lineHeight: 1.35, marginBottom: 16, flexGrow: 1 }}>
            {p.title}
          </p>
          <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
            {p.area && <div>
              <p style={{ color: "#9AA0B2", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>Plocha</p>
              <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{p.area} m²</p>
            </div>}
            {p.layout && <div>
              <p style={{ color: "#9AA0B2", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>Disp.</p>
              <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{p.layout}</p>
            </div>}
            {p.floor && <div>
              <p style={{ color: "#9AA0B2", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>Patro</p>
              <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{p.floor}</p>
            </div>}
          </div>
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 16 }} />
          <p style={{ color: "#C9A84C", fontSize: 20, fontWeight: 800 }}>{p.price}</p>
        </div>
      </div>
    </Link>
  );
}

export const metadata = {
  title: "Nabídka nemovitostí – Ing. Pavla Kubešová",
  description: "Aktuální nabídka nemovitostí k prodeji a pronájmu. Byty, domy, pozemky v Pardubicích, Hradci Králové a po celých Čechách.",
  alternates: { canonical: "https://www.pavlakubesova.cz/nabidka" },
  openGraph: {
    title: "Nabídka nemovitostí – Ing. Pavla Kubešová",
    description: "Aktuální nabídka nemovitostí k prodeji a pronájmu v Pardubicích a celých Čechách.",
    url: "https://www.pavlakubesova.cz/nabidka",
    type: "website",
  },
};

export default async function NabidkaPage() {
  const properties = await getAllProperties();
  const active = properties.filter(p => p.status === "active");
  const other = properties.filter(p => p.status !== "active");

  return (
    <div style={{ background: "#0C0E1A", minHeight: "100vh", fontFamily: font }}>
      {/* Navbar */}
      <div style={{ background: "#111525", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ color: "#C9A84C", fontWeight: 800, fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none" }}>
            Pavla Kubešová
          </Link>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {[["O mně", "/#o-mne"], ["Služby", "/#sluzby"], ["Nabídka", "/nabidka"], ["Články", "/clanky"], ["Kontakt", "/#kontakt"]].map(([label, href]) => (
              <Link key={href} href={href} style={{ color: label === "Nabídka" ? "#C9A84C" : "#9AA0B2", fontSize: 13, textDecoration: "none", fontWeight: label === "Nabídka" ? 700 : 400 }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10" style={{ paddingTop: 56, paddingBottom: 80 }}>
        {/* Nadpis */}
        <div style={{ marginBottom: 52 }}>
          <div className="section-label">Aktuální nabídka</div>
          <h1 className="text-white font-extrabold text-center leading-tight" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}>
            Vybrané nemovitosti<br />
            v <span style={{ color: "#C9A84C" }}>prodeji</span>
          </h1>
        </div>

        {/* Aktivní nabídky */}
        {active.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 48 }}>
            {active.map(p => <PropertyCard key={p._id} p={p} />)}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "64px 0", color: "#9AA0B2", fontSize: 15 }}>
            Momentálně žádné aktivní nabídky. Brzy přidáme nové inzeráty.
          </div>
        )}

        {/* Prodané / rezervované */}
        {other.length > 0 && (
          <>
            <h2 style={{ color: "#9AA0B2", fontWeight: 700, fontSize: 16, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20, marginTop: 16 }}>
              Prodané &amp; rezervované
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, opacity: 0.6 }}>
              {other.map(p => <PropertyCard key={p._id} p={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
