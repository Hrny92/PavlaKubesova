import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getArticleBySlug, getAllArticles } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { PortableText } from "next-sanity";

const font = "var(--font-poppins), Poppins, system-ui, sans-serif";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" });
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map(a => ({ slug: a.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a) return {};
  const imgUrl = a.mainImage ? urlFor(a.mainImage).width(1200).height(630).url() : undefined;
  return {
    title: `${a.title} – Ing. Pavla Kubešová`,
    description: a.excerpt ?? undefined,
    alternates: { canonical: `https://www.pavlakubesova.cz/clanky/${slug}` },
    openGraph: {
      title: a.title,
      description: a.excerpt ?? undefined,
      url: `https://www.pavlakubesova.cz/clanky/${slug}`,
      type: "article",
      publishedTime: a.publishedAt ?? undefined,
      authors: ["Ing. Pavla Kubešová"],
      images: imgUrl ? [{ url: imgUrl, width: 1200, height: 630, alt: a.title }] : [],
    },
  };
}

const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ color: "#9AA0B2", fontSize: 16, lineHeight: 1.85, marginBottom: 20 }}>{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 24, lineHeight: 1.3, marginBottom: 16, marginTop: 36 }}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 19, lineHeight: 1.35, marginBottom: 12, marginTop: 28 }}>{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote style={{ borderLeft: "3px solid #C9A84C", paddingLeft: 20, margin: "28px 0", color: "#C9A84C", fontSize: 17, fontWeight: 600, fontStyle: "normal", lineHeight: 1.65 }}>{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong style={{ color: "#fff", fontWeight: 700 }}>{children}</strong>,
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a href={value?.href} style={{ color: "#C9A84C", textDecoration: "underline" }} target="_blank" rel="noopener noreferrer">{children}</a>
    ),
  },
};

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a) notFound();

  const imgUrl = a.mainImage ? urlFor(a.mainImage).width(1200).height(600).url() : null;

  return (
    <div style={{ background: "#0C0E1A", minHeight: "100vh", fontFamily: font }}>
      {/* Navbar */}
      <div style={{ background: "#111525", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ color: "#C9A84C", fontWeight: 800, fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none" }}>
            Pavla Kubešová
          </Link>
          <Link href="/clanky" style={{ color: "#9AA0B2", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Zpět na články
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "56px 24px 80px" }}>
        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          {a.category && (
            <span style={{
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 999, padding: "4px 12px",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff",
            }}>{a.category}</span>
          )}
          {a.publishedAt && <span style={{ color: "#9AA0B2", fontSize: 13 }}>{formatDate(a.publishedAt)}</span>}
        </div>

        {/* Nadpis */}
        <h1 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.2, marginBottom: 20 }}>
          {a.title}
        </h1>

        {/* Perex */}
        {a.excerpt && (
          <p style={{ color: "#C9A84C", fontSize: 17, lineHeight: 1.7, marginBottom: 36, fontWeight: 500 }}>
            {a.excerpt}
          </p>
        )}

        {/* Hlavní foto */}
        {imgUrl && (
          <div style={{ position: "relative", height: 420, borderRadius: 18, overflow: "hidden", marginBottom: 48 }}>
            <Image src={imgUrl} alt={a.title} fill className="object-cover" priority sizes="780px" />
          </div>
        )}

        {/* Tělo článku */}
        {a.body && (
          <div>
            <PortableText value={a.body as never} components={ptComponents as never} />
          </div>
        )}

        {/* Dělicí čára + CTA */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "48px 0 36px" }} />
        <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 16, padding: "28px" }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>Máte otázky nebo chcete nemovitost prodat?</p>
          <p style={{ color: "#9AA0B2", fontSize: 13, lineHeight: 1.65, marginBottom: 20 }}>
            Ráda si s vámi promluvím. Nabízím bezplatnou konzultaci.
          </p>
          <Link href="/#kontakt" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#C9A84C", color: "#0C0E1A",
            fontFamily: font, fontWeight: 700, fontSize: 12,
            letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "12px 24px", borderRadius: 999, textDecoration: "none",
          }}>
            Kontaktovat mě
          </Link>
        </div>
      </div>
    </div>
  );
}
