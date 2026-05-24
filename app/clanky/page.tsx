import Link from "next/link";
import Image from "next/image";
import { getAllArticles, type Article } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

const font = "var(--font-poppins), Poppins, system-ui, sans-serif";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" });
}

function ArticleCard({ a }: { a: Article }) {
  const imgUrl = a.mainImage ? urlFor(a.mainImage).width(600).height(380).url() : null;
  return (
    <Link href={`/clanky/${a.slug.current}`} style={{ textDecoration: "none" }}>
      <div style={{
        background: "#111525",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 18, overflow: "hidden",
        cursor: "pointer", height: "100%", display: "flex", flexDirection: "column",
      }}>
        {/* Foto */}
        <div style={{ position: "relative", height: 220, background: "#1a2035", flexShrink: 0 }}>
          {imgUrl && <Image src={imgUrl} alt={a.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />}
        </div>
        {/* Info */}
        <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            {a.category && (
              <span style={{
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 999, padding: "3px 10px",
                fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff",
              }}>{a.category}</span>
            )}
            {a.publishedAt && <span style={{ color: "#9AA0B2", fontSize: 12 }}>{formatDate(a.publishedAt)}</span>}
          </div>
          <p style={{ color: "#fff", fontWeight: 800, fontSize: 17, lineHeight: 1.35, marginBottom: 10, flexGrow: 1 }}>
            {a.title}
          </p>
          {a.excerpt && (
            <p style={{ color: "#9AA0B2", fontSize: 13, lineHeight: 1.65 }}>{a.excerpt}</p>
          )}
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6, color: "#C9A84C", fontSize: 12, fontWeight: 700 }}>
            Číst článek
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export const metadata = {
  title: "Realitní blog – tipy a novinky z trhu",
  description: "Praktické tipy pro prodej a koupi nemovitosti, aktuální vývoj realitního trhu, hypotéky a investice. Blog realitní makléřky Pavly Kubešové.",
  alternates: { canonical: "https://www.pavlakubesova.cz/clanky" },
  openGraph: {
    title: "Realitní blog – Ing. Pavla Kubešová",
    description: "Praktické tipy a novinky z realitního trhu.",
    url: "https://www.pavlakubesova.cz/clanky",
    type: "website",
  },
};

export default async function ClankyPage() {
  const articles = await getAllArticles();

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
              <Link key={href} href={href} style={{ color: label === "Články" ? "#C9A84C" : "#9AA0B2", fontSize: 13, textDecoration: "none", fontWeight: label === "Články" ? 700 : 400 }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10" style={{ paddingTop: 56, paddingBottom: 80 }}>
        <div style={{ marginBottom: 52 }}>
          <div className="section-label">Blog</div>
          <h1 className="text-white font-extrabold text-center leading-tight" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}>
            Realitní novinky<br />
            a <span style={{ color: "#C9A84C" }}>tipy z praxe</span>
          </h1>
        </div>

        {articles.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {articles.map(a => <ArticleCard key={a._id} a={a} />)}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "64px 0", color: "#9AA0B2", fontSize: 15 }}>
            Zatím žádné články. Brzy přidáme první příspěvky.
          </div>
        )}
      </div>
    </div>
  );
}
