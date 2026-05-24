import Link from "next/link";
import Image from "next/image";
import { getLatestProperties, type Property } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

const font = "var(--font-poppins), Poppins, system-ui, sans-serif";

const HeartIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

// Placeholder gradients pro karty bez fotky
const placeholders = [
  "linear-gradient(160deg, #1a2f4a 0%, #0d1a2e 100%)",
  "linear-gradient(160deg, #1a2e1a 0%, #0d1e12 100%)",
  "linear-gradient(160deg, #2e2218 0%, #1e1510 100%)",
];

function PropertyCard({ p, index }: { p: Property; index: number }) {
  const imgUrl = p.mainImage ? urlFor(p.mainImage).width(600).height(480).url() : null;

  return (
    <Link href={`/nabidka/${p.slug.current}`} style={{ textDecoration: "none" }}>
      <div style={{
        background: "#111525",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 18, overflow: "hidden",
        cursor: "pointer", display: "flex", flexDirection: "column", height: "100%",
      }}>
        {/* Foto */}
        <div style={{ position: "relative", height: 240, background: placeholders[index % 3], flexShrink: 0 }}>
          {imgUrl && <Image src={imgUrl} alt={p.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />}
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
          <button style={{
            position: "absolute", top: 12, right: 12,
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(12,14,26,0.65)", backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", cursor: "pointer",
          }}><HeartIcon /></button>
        </div>
        {/* Info */}
        <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <p style={{ color: "#9AA0B2", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
            {p.location}
          </p>
          <p style={{ color: "#fff", fontWeight: 800, fontSize: 17, lineHeight: 1.35, marginBottom: 20, flexGrow: 1 }}>
            {p.title}
          </p>
          <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
            {p.area && <div>
              <p style={{ color: "#9AA0B2", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 3 }}>Plocha</p>
              <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{p.area} m²</p>
            </div>}
            {p.layout && <div>
              <p style={{ color: "#9AA0B2", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 3 }}>Disp.</p>
              <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{p.layout}</p>
            </div>}
            {p.floor && <div>
              <p style={{ color: "#9AA0B2", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 3 }}>Patro</p>
              <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{p.floor}</p>
            </div>}
          </div>
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 20 }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ color: "#C9A84C", fontSize: 20, fontWeight: 800 }}>{p.price}</p>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              border: "1px solid rgba(201,168,76,0.4)", background: "rgba(201,168,76,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A84C",
            }}><ArrowRight /></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function Properties() {
  const properties = await getLatestProperties(3).catch(() => []);

  return (
    <section id="nemovitosti" className="py-24 lg:py-32 bg-[#0C0E1A]" style={{ fontFamily: font }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Nadpis */}
        <div className="mb-14" style={{ position: "relative" }}>
          <div className="text-center">
            <div className="section-label">Aktuální nabídka</div>
            <h2 className="text-white font-extrabold leading-tight" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}>
              Vybrané nemovitosti<br />
              v <span style={{ color: "#C9A84C" }}>prodeji</span>
            </h2>
          </div>
          {properties.length > 0 && (
            <Link href="/nabidka" style={{
              position: "absolute", right: 0, bottom: 0,
              display: "flex", alignItems: "center", gap: 8,
              color: "#C9A84C", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none",
            }}>
              Zobrazit všechny
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          )}
        </div>

        {/* Karty nebo prázdný stav */}
        {properties.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {properties.map((p, i) => <PropertyCard key={p._id} p={p} index={i} />)}
          </div>
        ) : (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: "72px 24px",
            background: "#111525",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20,
            gap: 16,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#C9A84C",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 17 }}>Nabídka se připravuje</p>
            <p style={{ color: "#9AA0B2", fontSize: 14, lineHeight: 1.65, textAlign: "center", maxWidth: 380 }}>
              Brzy zde najdete aktuální nemovitosti v nabídce. Mezitím mě neváhejte kontaktovat přímo.
            </p>
            <Link href="/#kontakt" style={{
              marginTop: 8,
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(201,168,76,0.1)",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: 999,
              padding: "10px 24px",
              color: "#C9A84C", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
            }}>
              Kontaktovat
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
