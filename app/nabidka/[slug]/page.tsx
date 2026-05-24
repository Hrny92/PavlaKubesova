import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPropertyBySlug, getAllProperties } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { PortableText } from "next-sanity";

const font = "var(--font-poppins), Poppins, system-ui, sans-serif";

export async function generateStaticParams() {
  const props = await getAllProperties();
  return props.map(p => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPropertyBySlug(slug);
  if (!p) return {};
  return { title: `${p.title} – Ing. Pavla Kubešová` };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPropertyBySlug(slug);
  if (!p) notFound();

  const mainImgUrl = p.mainImage ? urlFor(p.mainImage).width(1200).height(700).url() : null;

  const specs = [
    p.area && { label: "Plocha", value: `${p.area} m²` },
    p.layout && { label: "Dispozice", value: p.layout },
    p.floor && { label: "Patro", value: p.floor },
    p.energyEfficiency && { label: "Energetická náročnost", value: p.energyEfficiency },
    p.buildingInfo && { label: "Stavba a podlaží", value: p.buildingInfo },
    p.accessories && { label: "Příslušenství", value: p.accessories },
    p.infrastructure && { label: "Infrastruktura", value: p.infrastructure },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div style={{ background: "#0C0E1A", minHeight: "100vh", fontFamily: font }}>
      {/* Navbar */}
      <div style={{ background: "#111525", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ color: "#C9A84C", fontWeight: 800, fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none" }}>
            Pavla Kubešová
          </Link>
          <Link href="/nabidka" style={{ color: "#9AA0B2", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Zpět na nabídku
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10" style={{ paddingTop: 48, paddingBottom: 80 }}>

        {/* Breadcrumb */}
        <p style={{ color: "#9AA0B2", fontSize: 12, marginBottom: 24 }}>
          <Link href="/" style={{ color: "#9AA0B2", textDecoration: "none" }}>Domů</Link>
          {" · "}
          <Link href="/nabidka" style={{ color: "#9AA0B2", textDecoration: "none" }}>Nabídka</Link>
          {" · "}
          <span style={{ color: "#fff" }}>{p.title}</span>
        </p>

        {/* Hlavní obrázek */}
        {mainImgUrl && (
          <div style={{ position: "relative", height: 480, borderRadius: 20, overflow: "hidden", marginBottom: 40 }}>
            <Image src={mainImgUrl} alt={p.title} fill className="object-cover" priority sizes="100vw" />
            {p.badge && (
              <div style={{
                position: "absolute", top: 20, left: 20,
                background: "rgba(12,14,26,0.8)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 999, padding: "6px 16px",
                fontSize: 12, fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#fff",
              }}>{p.badge}</div>
            )}
          </div>
        )}

        {/* 2-col layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 40, alignItems: "start" }}>

          {/* LEVÁ — popis */}
          <div>
            <p style={{ color: "#9AA0B2", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>
              {p.location}
            </p>
            <h1 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", lineHeight: 1.2, marginBottom: 20 }}>
              {p.title}
            </h1>
            <p style={{ color: "#C9A84C", fontWeight: 800, fontSize: 28, marginBottom: 32 }}>
              {p.price}
            </p>

            {/* Matterport */}
            {p.matterportUrl && (
              <div style={{ marginBottom: 32 }}>
                <iframe
                  src={p.matterportUrl}
                  width="100%" height="420"
                  style={{ border: "none", borderRadius: 14 }}
                  allowFullScreen
                />
              </div>
            )}

            {/* Video */}
            {p.videoUrl && (
              <div style={{ marginBottom: 32 }}>
                <iframe
                  src={p.videoUrl.replace("watch?v=", "embed/")}
                  width="100%" height="360"
                  style={{ border: "none", borderRadius: 14 }}
                  allowFullScreen
                />
              </div>
            )}

            {/* Popis */}
            {p.description && (
              <div style={{ color: "#9AA0B2", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
                <PortableText value={p.description as never} />
              </div>
            )}

            {/* Historie */}
            {p.history && (
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Historie / Rekonstrukce</h3>
                <p style={{ color: "#9AA0B2", fontSize: 14, lineHeight: 1.75 }}>{p.history}</p>
              </div>
            )}

            {/* Galerie */}
            {p.gallery && p.gallery.length > 0 && (
              <div>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Galerie</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {p.gallery.map((img, i) => (
                    <div key={i} style={{ position: "relative", aspectRatio: "4/3", borderRadius: 10, overflow: "hidden" }}>
                      <Image
                        src={urlFor(img).width(400).height(300).url()}
                        alt={`Foto ${i + 1}`} fill className="object-cover"
                        sizes="(max-width:768px) 50vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mapa */}
            {p.mapLink && (
              <div style={{ marginTop: 32 }}>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Poloha na mapě</h3>
                <div style={{ borderRadius: 14, overflow: "hidden", height: 320 }}
                  dangerouslySetInnerHTML={{ __html: p.mapLink }} />
              </div>
            )}
          </div>

          {/* PRAVÁ — specs + kontakt */}
          <div style={{ position: "sticky", top: 24 }}>
            {/* Parametry */}
            <div style={{ background: "#111525", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "24px 24px", marginBottom: 16 }}>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
                Parametry
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {specs.map(s => (
                  <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#9AA0B2", fontSize: 13 }}>{s.label}</span>
                    <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kontakt */}
            <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 18, padding: "24px 24px" }}>
              <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>Máte zájem?</p>
              <p style={{ color: "#9AA0B2", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>
                Kontaktujte mě pro sjednání prohlídky nebo více informací.
              </p>
              <Link href="/#kontakt" style={{
                display: "block", textAlign: "center",
                background: "#C9A84C", color: "#0C0E1A",
                fontFamily: font, fontWeight: 700, fontSize: 13,
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "14px", borderRadius: 999, textDecoration: "none",
              }}>
                Kontaktovat
              </Link>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                <a href="tel:+420608518525" style={{ color: "#fff", fontSize: 14, textDecoration: "none", textAlign: "center" }}>
                  +420 608 518 525
                </a>
                <a href="mailto:pavla.kubesova@bidli.cz" style={{ color: "#9AA0B2", fontSize: 13, textDecoration: "none", textAlign: "center" }}>
                  pavla.kubesova@bidli.cz
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
