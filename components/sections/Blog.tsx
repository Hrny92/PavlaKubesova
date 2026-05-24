import Link from "next/link";
import Image from "next/image";
import { getLatestArticles, getLatestInstagramPosts, type Article, type InstagramPost } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

const font = "var(--font-poppins), Poppins, system-ui, sans-serif";

const igGradients = [
  "linear-gradient(160deg, #c8b8a8 0%, #e0cdb8 100%)",
  "linear-gradient(160deg, #b89840 0%, #8a6820 100%)",
  "linear-gradient(160deg, #3a6a4a 0%, #1a3a28 100%)",
  "linear-gradient(160deg, #6a5a4a 0%, #3a2a1a 100%)",
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" });
}

const PlayIcon = () => (
  <div style={{
    width: 40, height: 40, borderRadius: "50%",
    background: "rgba(255,255,255,0.92)",
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#0C0E1A" stroke="none">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  </div>
);

const EyeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export default async function Blog() {
  const [articles, igPosts] = await Promise.all([
    getLatestArticles(3).catch(() => [] as Article[]),
    getLatestInstagramPosts(4).catch(() => [] as InstagramPost[]),
  ]);

  return (
    <section id="blog" className="py-24 lg:py-32 bg-[#0C0E1A]" style={{ fontFamily: font }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Nadpis */}
        <div style={{ position: "relative", marginBottom: 48 }}>
          <div className="text-center">
            <div className="section-label">Blog &amp; sociální sítě</div>
            <h2
              className="text-white font-extrabold leading-tight"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}
            >
              Realitní novinky<br />
              a <span style={{ color: "#C9A84C" }}>tipy z praxe</span>
            </h2>
          </div>
          {articles.length > 0 && (
            <Link
              href="/clanky"
              style={{
                position: "absolute", right: 0, bottom: 0,
                display: "flex", alignItems: "center", gap: 8,
                color: "#C9A84C", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Všechny články
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          )}
        </div>

        {/* Dvě kolonky */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "stretch" }}>

          {/* LEVÁ — Blog posty */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {articles.length > 0 ? (
              articles.map((a) => {
                const imgUrl = a.mainImage ? urlFor(a.mainImage).width(340).height(220).url() : null;
                return (
                  <Link
                    key={a._id}
                    href={`/clanky/${a.slug.current}`}
                    style={{ textDecoration: "none", display: "flex", flex: 1 }}
                  >
                    <div style={{
                      display: "flex", flex: 1,
                      background: "#111525",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 16, overflow: "hidden",
                      cursor: "pointer",
                    }}>
                      {/* Thumbnail */}
                      <div style={{ width: 170, flexShrink: 0, background: "#1a2035", position: "relative" }}>
                        {imgUrl && (
                          <Image src={imgUrl} alt={a.title} fill className="object-cover" sizes="170px" />
                        )}
                      </div>
                      {/* Obsah */}
                      <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                          {a.category && (
                            <span style={{
                              background: "rgba(255,255,255,0.08)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: 999, padding: "3px 10px",
                              fontSize: 10, fontWeight: 700,
                              letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff",
                            }}>{a.category}</span>
                          )}
                          {a.publishedAt && (
                            <span style={{ color: "#9AA0B2", fontSize: 12 }}>{formatDate(a.publishedAt)}</span>
                          )}
                        </div>
                        <p style={{ color: "#fff", fontWeight: 800, fontSize: 16, lineHeight: 1.35, marginBottom: 8 }}>
                          {a.title}
                        </p>
                        {a.excerpt && (
                          <p style={{ color: "#9AA0B2", fontSize: 13, lineHeight: 1.6 }}>{a.excerpt}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              /* Prázdný stav — články */
              <div style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                background: "#111525",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: "56px 32px",
                gap: 14,
                textAlign: "center",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "rgba(201,168,76,0.08)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#C9A84C",
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Články se připravují</p>
                <p style={{ color: "#9AA0B2", fontSize: 13, lineHeight: 1.65, maxWidth: 280 }}>
                  Brzy zde najdete tipy, novinky a postřehy z realitního trhu.
                </p>
              </div>
            )}
          </div>

          {/* PRAVÁ — Instagram feed */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

            {/* 2×2 mřížka příspěvků nebo prázdný stav */}
            {igPosts.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {igPosts.map((ig, i) => {
                  const thumbUrl = ig.thumbnail ? urlFor(ig.thumbnail).width(400).height(400).url() : null;
                  return (
                    <div
                      key={ig._id}
                      style={{
                        position: "relative",
                        aspectRatio: "1 / 1",
                        borderRadius: 14,
                        overflow: "hidden",
                        background: igGradients[i % 4],
                        cursor: "pointer",
                      }}
                    >
                      {thumbUrl && (
                        <Image src={thumbUrl} alt={ig.title || `Instagram ${i + 1}`} fill className="object-cover" sizes="(max-width:768px) 50vw, 25vw" />
                      )}
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <PlayIcon />
                      </div>
                      <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        padding: "8px 12px",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
                      }}>
                        {ig.viewCount && (
                          <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#fff", fontSize: 12, fontWeight: 600 }}>
                            <EyeIcon /> {ig.viewCount}
                          </span>
                        )}
                        <span style={{ color: "#fff", marginLeft: "auto" }}>
                          <InstagramIcon size={15} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Prázdný stav — Instagram */
              <div style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                background: "#111525",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: "40px 32px",
                gap: 14,
                textAlign: "center",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "linear-gradient(135deg, #f09433 0%, #dc2743 50%, #bc1888 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff",
                }}>
                  <InstagramIcon size={22} />
                </div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Videa se připravují</p>
                <p style={{ color: "#9AA0B2", fontSize: 13, lineHeight: 1.65, maxWidth: 280 }}>
                  Brzy zde najdete videa a reels z Instagramu.
                </p>
              </div>
            )}

            {/* Instagram profil banner — vždy viditelný */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "#111525",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: "16px 20px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", flexShrink: 0,
                }}>
                  <InstagramIcon size={22} />
                </div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 2 }}>
                    @pavlakubesova.bidli
                  </p>
                  <p style={{ color: "#9AA0B2", fontSize: 12 }}>
                    Sledujte tipy a aktuální nabídky
                  </p>
                </div>
              </div>
              <a
                href="https://www.instagram.com/pavlakubesova.bidli/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 999,
                  padding: "9px 20px",
                  color: "#fff", fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  textDecoration: "none",
                  flexShrink: 0,
                }}
              >
                Sledovat
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
