import Image from "next/image";

const font = "var(--font-poppins), Poppins, system-ui, sans-serif";

export default function About() {
  return (
    <section id="o-mne" className="py-24 lg:py-32 bg-[#0C0E1A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Foto */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            <div className="relative w-full aspect-[4/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/about-photo.webp"
                alt="Ing. Pavla Kubešová – realitní makléřka"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </div>
          </div>

          {/* Text */}
          <div style={{ fontFamily: font }}>
            {/* Label */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-7 h-[2px] bg-[#C9A84C]" />
              <span
                className="text-[#C9A84C] font-semibold tracking-[0.2em] uppercase"
                style={{ fontSize: "11px" }}
              >
                O mně
              </span>
            </div>

            {/* Jméno */}
            <h2
              className="text-white font-extrabold leading-tight mb-2"
              style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
            >
              Ing. Pavla Kubešová
            </h2>

            {/* Titul */}
            <p
              className="text-[#C9A84C] font-bold mb-8"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
            >
              realitní makléřka
            </p>

            {/* Odstavce */}
            <div className="space-y-4 mb-10" style={{ color: "#9AA0B2", fontSize: "15px", lineHeight: "1.75" }}>
              <p>
                K realitám jsem se dostala přes vlastní zkušenost s prodejem nemovitosti společně se zájmem o marketing a práci s lidmi.
              </p>
              <p>
                Dnes propojuji strategii, moderní marketingové nástroje a osobní přístup tak, aby měl každý prodej jasný plán a hladký průběh.
              </p>
              <p>
                Pravidelně se vzdělávám a sleduji vývoj trhu, protože každý klient i každá nemovitost si zaslouží individuální přístup, profesionální péči a strategii šitou na míru. Výsledkem je rychlý, transparentní a férový prodej s klientem na vaší straně a za tu nejlepší možnou cenu.
              </p>
            </div>

            
          </div>

        </div>
      </div>
    </section>
  );
}
