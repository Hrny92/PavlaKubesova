import Link from "next/link";

const font = "var(--font-poppins), Poppins, system-ui, sans-serif";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <h2 style={{ color: "#C9A84C", fontWeight: 700, fontSize: 18, marginBottom: 14, letterSpacing: "0.01em" }}>
      {title}
    </h2>
    <div style={{ color: "#9AA0B2", fontSize: 14, lineHeight: 1.85 }}>
      {children}
    </div>
  </div>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ marginBottom: 12 }}>{children}</p>
);

const Ul = ({ items }: { items: string[] }) => (
  <ul style={{ paddingLeft: 20, marginBottom: 12, display: "flex", flexDirection: "column", gap: 6 }}>
    {items.map((item, i) => <li key={i}>{item}</li>)}
  </ul>
);

export const metadata = {
  title: "Ochrana osobních údajů (GDPR) – Ing. Pavla Kubešová",
};

export default function GdprPage() {
  return (
    <div style={{ background: "#0C0E1A", minHeight: "100vh", fontFamily: font }}>

      {/* Horní lišta s navigací zpět */}
      <div style={{ background: "#111525", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 0" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ color: "#C9A84C", fontWeight: 800, fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none" }}>
            Pavla Kubešová
          </Link>
          <Link href="/" style={{ color: "#9AA0B2", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Zpět na web
          </Link>
        </div>
      </div>

      {/* Obsah */}
      <div className="max-w-4xl mx-auto px-6 lg:px-10" style={{ paddingTop: 64, paddingBottom: 80 }}>

        {/* Nadpis */}
        <div style={{ marginBottom: 52 }}>
          <p style={{ color: "#C9A84C", fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 16 }}>
            Právní dokumenty
          </p>
          <h1 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.2, marginBottom: 16 }}>
            Ochrana osobních údajů
          </h1>
          <p style={{ color: "#9AA0B2", fontSize: 14 }}>
            Platnost od: 1. ledna 2025 &nbsp;·&nbsp; Poslední aktualizace: 1. května 2026
          </p>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 48 }} />

        {/* 1. Správce */}
        <Section title="1. Správce osobních údajů">
          <P>Správcem vašich osobních údajů je:</P>
          <div style={{ background: "#111525", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "22px 24px", marginBottom: 12 }}>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>Ing. Pavla Kubešová</p>
            <p>IČO: 23595345</p>
            <p>Sídlo: Pardubice, Česká republika</p>
            <p>E-mail: <a href="mailto:pavla.kubesova@bidli.cz" style={{ color: "#C9A84C" }}>pavla.kubesova@bidli.cz</a></p>
            <p>Telefon: <a href="tel:+420608518525" style={{ color: "#C9A84C" }}>+420 608 518 525</a></p>
          </div>
          <P>
            Zpracování osobních údajů probíhá v souladu s Nařízením Evropského parlamentu a Rady (EU) 2016/679
            o ochraně fyzických osob v souvislosti se zpracováním osobních údajů (GDPR) a zákonem č. 110/2019 Sb.
          </P>
        </Section>

        {/* 2. Jaké údaje */}
        <Section title="2. Jaké osobní údaje zpracováváme">
          <P>Zpracováváme pouze údaje, které nám sami poskytnete, nebo které vzniknou při návštěvě webu:</P>
          <Ul items={[
            "Jméno a příjmení",
            "E-mailová adresa",
            "Telefonní číslo",
            "Obsah zprávy odeslaný prostřednictvím kontaktního formuláře",
            "IP adresa a technické údaje o zařízení (prostřednictvím cookies – viz sekce 6)",
          ]} />
        </Section>

        {/* 3. Účel */}
        <Section title="3. Účel a právní základ zpracování">
          <P>Vaše údaje zpracováváme pro tyto účely:</P>
          <Ul items={[
            "Odpověď na váš dotaz a komunikace s vámi – právní základ: oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR)",
            "Plnění smlouvy nebo příprava na uzavření smlouvy – právní základ: plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR)",
            "Zasílání obchodních sdělení – pouze se souhlasem (čl. 6 odst. 1 písm. a) GDPR)",
            "Analýza návštěvnosti webu – pouze se souhlasem s analytickými cookies",
          ]} />
        </Section>

        {/* 4. Příjemci */}
        <Section title="4. Příjemci osobních údajů">
          <P>Vaše údaje neprodáváme třetím stranám. Mohou k nim mít přístup:</P>
          <Ul items={[
            "Makléřská společnost BIDLI reality s.r.o. – v rámci poskytování realitních služeb",
            "Poskytovatelé IT služeb a hostingu – za účelem provozu webu",
            "Google LLC – pokud souhlasíte s analytickými cookies (Google Analytics)",
            "Státní orgány – v případě zákonné povinnosti",
          ]} />
        </Section>

        {/* 5. Doba uchování */}
        <Section title="5. Doba uchování údajů">
          <P>Osobní údaje uchováváme po dobu nezbytně nutnou k naplnění účelu zpracování:</P>
          <Ul items={[
            "Údaje z kontaktního formuláře: po dobu trvání komunikace a 1 rok po jejím skončení",
            "Smluvní údaje: po dobu trvání smlouvy a 10 let od jejího ukončení (dle daňových předpisů)",
            "Marketingové souhlasy: do odvolání souhlasu",
            "Cookies: dle nastavení jednotlivých cookies (viz sekce 6)",
          ]} />
        </Section>

        {/* 6. Cookies */}
        <Section title="6. Cookies">
          <P>
            Náš web používá soubory cookies – malé textové soubory ukládané ve vašem prohlížeči.
            Cookies rozdělujeme do tří kategorií:
          </P>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 12 }}>
            {[
              {
                name: "Nezbytné cookies",
                desc: "Jsou nutné pro správné fungování webu. Nelze je zakázat. Neobsahují žádné osobní informace.",
                retention: "Po dobu relace nebo max. 1 rok",
              },
              {
                name: "Analytické cookies",
                desc: "Pomáhají nám zlepšovat web měřením návštěvnosti (Google Analytics 4). Data jsou anonymizována a slouží výhradně nám.",
                retention: "Max. 2 roky",
              },
              {
                name: "Marketingové cookies",
                desc: "Slouží k zobrazování personalizované reklamy a měření účinnosti kampaní.",
                retention: "Max. 1 rok",
              },
            ].map(c => (
              <div key={c.name} style={{ background: "#111525", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 20px" }}>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{c.name}</p>
                <p style={{ marginBottom: 4 }}>{c.desc}</p>
                <p style={{ color: "#6B7280", fontSize: 12 }}>Doba uchování: {c.retention}</p>
              </div>
            ))}
          </div>
          <P>
            Své předvolby cookies můžete kdykoli změnit kliknutím na odkaz „Nastavení cookies" v patičce webu.
          </P>
        </Section>

        {/* 7. Práva */}
        <Section title="7. Vaše práva">
          <P>V souladu s GDPR máte tato práva:</P>
          <Ul items={[
            "Právo na přístup – kdykoli nás můžete požádat o informace o zpracování vašich údajů",
            "Právo na opravu – máte právo požádat o opravu nepřesných údajů",
            "Právo na výmaz ('být zapomenut') – za určitých podmínek můžete požádat o smazání vašich údajů",
            "Právo na omezení zpracování – v případě sporných údajů",
            "Právo na přenositelnost – obdržíte své údaje ve strojově čitelném formátu",
            "Právo vznést námitku – zejména vůči zpracování pro marketingové účely",
            "Právo odvolat souhlas – kdykoli, bez dopadu na zákonnost předchozího zpracování",
          ]} />
          <P>
            Svá práva uplatníte zasláním e-mailu na{" "}
            <a href="mailto:pavla.kubesova@bidli.cz" style={{ color: "#C9A84C" }}>pavla.kubesova@bidli.cz</a>.
            Na vaši žádost odpovíme do 30 dnů.
          </P>
          <P>
            Máte také právo podat stížnost u dozorového orgánu –{" "}
            <a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer" style={{ color: "#C9A84C" }}>
              Úřadu pro ochranu osobních údajů (ÚOOÚ)
            </a>.
          </P>
        </Section>

        {/* 8. Zabezpečení */}
        <Section title="8. Zabezpečení údajů">
          <P>
            Vaše osobní údaje chráníme technickými a organizačními opatřeními před neoprávněným přístupem,
            ztrátou nebo zneužitím. Web je provozován na zabezpečeném HTTPS protokolu.
          </P>
        </Section>

        {/* 9. Změny */}
        <Section title="9. Změny těchto zásad">
          <P>
            Tyto zásady ochrany osobních údajů můžeme průběžně aktualizovat. O podstatných změnách
            vás budeme informovat prostřednictvím webu. Doporučujeme tuto stránku pravidelně navštěvovat.
          </P>
        </Section>

        {/* Kontakt box */}
        <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 16, padding: "28px 28px", marginTop: 16 }}>
          <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Máte otázky ohledně ochrany vašich dat?</p>
          <p style={{ color: "#9AA0B2", fontSize: 13, marginBottom: 16 }}>
            Neváhejte se obrátit přímo na mě. Odpovím vám do 2 pracovních dnů.
          </p>
          <a
            href="mailto:pavla.kubesova@bidli.cz"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#C9A84C", color: "#0C0E1A",
              fontFamily: font, fontWeight: 700, fontSize: 12,
              letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "12px 24px", borderRadius: 999, textDecoration: "none",
            }}
          >
            Napsat e-mail
          </a>
        </div>

      </div>
    </div>
  );
}
