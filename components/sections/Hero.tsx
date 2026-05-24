import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen bg-[#0C0E1A] overflow-hidden">

      {/* VRSTVA 1 — H1 za fotkou */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-4"
        style={{ zIndex: 1 }}
      >
        <h1
          className="w-full text-center font-extrabold leading-[1.06] tracking-tight"
          style={{
            fontFamily: "var(--font-poppins), Poppins, system-ui, sans-serif",
            fontSize: "clamp(2.6rem, 7vw, 7.5rem)",
          }}
        >
          <span className="block text-white">Realitní makléřka</span>
          <span className="block text-[#C9A84C]">
            s lidským<span style={{ marginLeft: "14rem" }}>přístupem</span>
          </span>
        </h1>
      </div>

      {/* VRSTVA 2 — foto přes H1 */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ zIndex: 2, height: "88%", width: "44vw", maxWidth: "600px", minWidth: "260px" }}
      >
        <Image
          src="/images/hero-photo.png"
          alt="Ing. Pavla Kubešová"
          fill
          className="object-contain object-bottom"
          priority
          sizes="(max-width: 768px) 80vw, 44vw"
        />
      </div>

      {/* VRSTVA 3 — text + buttony přes fotku */}
      {/*
        Flex sloupec centrovaný stejně jako H1.
        Neviditelný spacer nahrazuje výšku H1 + gap,
        takže text se zobrazí přesně pod nadpisem.
      */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 lg:px-16 pointer-events-none"
        style={{ zIndex: 3 }}
      >
        {/* Spacer = výška H1 (2 řádky) + mb-6 */}
        <div style={{ height: "calc(2 * clamp(2.6rem, 7vw, 7.5rem) * 1.06 + 1.5rem)", flexShrink: 0 }} />

        {/* Jméno vlevo — popis vpravo */}
        <div className="flex items-center justify-between w-full max-w-6xl mb-7 mt-48 pointer-events-auto">
          <p className="text-sm lg:text-[15px] text-white">
            <span className="font-bold">Ing. Pavla Kubešová</span>
            <span className="text-[#9AA0B2]"> – Váš partner pro reality</span>
          </p>
          <p className="hidden md:block text-sm lg:text-[15px] text-[#9AA0B2] text-right">
            s moderním marketingem a férovým jednáním.
          </p>
        </div>

        {/* Pilulkové buttony */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 pointer-events-auto">
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center rounded-full bg-[#C9A84C] text-[#0C0E1A] font-bold uppercase tracking-[0.14em] px-9 py-[14px] hover:bg-[#D4B56A] transition-colors whitespace-nowrap"
            style={{ fontSize: "12px" }}
          >
            Chci prodat nemovitost
          </a>
          <a
            href="#nemovitosti"
            className="inline-flex items-center justify-center rounded-full text-white font-bold uppercase tracking-[0.14em] px-9 py-[14px] transition-colors whitespace-nowrap"
            style={{ fontSize: "12px", border: "1px solid rgba(255,255,255,0.3)" }}
          >
            Aktuální nabídka
          </a>
        </div>
      </div>

    </section>
  );
}
