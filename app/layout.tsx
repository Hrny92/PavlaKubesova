import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

const siteUrl = "https://www.kubesovareality.cz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ing. Pavla Kubešová – Realitní makléřka | Pardubice, Hradec Králové",
    template: "%s – Ing. Pavla Kubešová",
  },
  description:
    "Realitní makléřka Pavla Kubešová nabízí prodej, pronájem a výkup nemovitostí v Pardubicích, Hradci Králové a po celých Čechách. Bezplatná konzultace, profesionální fotografie, 3D prohlídky.",
  keywords: [
    "realitní makléřka Pardubice",
    "realitní makléřka Hradec Králové",
    "prodej nemovitostí Pardubice",
    "koupě nemovitosti Čechy",
    "pronájem bytu Pardubice",
    "realitní kancelář Pardubice",
    "Pavla Kubešová makléřka",
    "pavla kubesova reality",
    "bidli realitní makléřka",
    "výkup nemovitostí",
    "odhad nemovitosti Pardubice",
    "3D prohlídka nemovitosti",
    "home staging Pardubice",
    "hypoteční poradenství",
    "investice do nemovitostí Čechy",
  ],
  authors: [{ name: "Ing. Pavla Kubešová", url: siteUrl }],
  creator: "Ing. Pavla Kubešová",
  publisher: "Ing. Pavla Kubešová",
  category: "Real Estate",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "cs-CZ": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: siteUrl,
    siteName: "Ing. Pavla Kubešová – Realitní makléřka",
    title: "Ing. Pavla Kubešová – Realitní makléřka | Pardubice, Hradec Králové",
    description:
      "Prodej, pronájem a výkup nemovitostí v Pardubicích, Hradci Králové a po celých Čechách. Bezplatná konzultace.",
    images: [
      {
        url: "/images/OG-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Ing. Pavla Kubešová – Realitní makléřka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ing. Pavla Kubešová – Realitní makléřka",
    description: "Prodej, pronájem a výkup nemovitostí v Pardubicích a po celých Čechách.",
    images: ["/images/OG-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "",  // doplnit po přidání do Google Search Console
  },
};

// JSON-LD strukturovaná data pro AI vyhledávače a Google
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": `${siteUrl}/#agent`,
      name: "Ing. Pavla Kubešová",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/OG-image.png`,
      },
      image: `${siteUrl}/images/OG-image.png`,
      description:
        "Realitní makléřka s lidským přístupem. Specializuji se na prodej, pronájem a výkup nemovitostí v Pardubicích, Hradci Králové a po celých Čechách. Nabízím profesionální fotografii, 3D Matterport prohlídky, home staging a hypoteční poradenství.",
      telephone: "+420608518525",
      email: "pavla.kubesova@bidli.cz",
      taxID: "23595345",
      areaServed: [
        { "@type": "City", name: "Pardubice" },
        { "@type": "City", name: "Hradec Králové" },
        { "@type": "City", name: "Chrudim" },
        { "@type": "City", name: "Praha" },
        { "@type": "Country", name: "Česká republika" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pardubice",
        addressCountry: "CZ",
      },
      sameAs: [
        "https://www.instagram.com/pavlakubesova.bidli/",
        "https://www.facebook.com/pavla.chudomska",
      ],
      knowsAbout: [
        "Prodej nemovitostí",
        "Pronájem nemovitostí",
        "Výkup nemovitostí",
        "Home staging",
        "3D Matterport prohlídky",
        "Hypoteční poradenství",
        "Investice do nemovitostí",
        "Odhady nemovitostí",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Realitní služby",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Prodej nemovitosti" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pronájem nemovitosti" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Výkup nemovitosti" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home staging a profesionální fotografie" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Matterport prohlídka" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hypoteční poradenství" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Odhad nemovitosti" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Ing. Pavla Kubešová – Realitní makléřka",
      description: "Osobní web realitní makléřky Pavly Kubešové",
      inLanguage: "cs-CZ",
      publisher: { "@id": `${siteUrl}/#agent` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/nabidka?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Ing. Pavla Kubešová",
      jobTitle: "Realitní makléřka",
      worksFor: {
        "@type": "Organization",
        name: "Bidli reality",
        url: "https://www.bidli.cz",
      },
      telephone: "+420608518525",
      email: "pavla.kubesova@bidli.cz",
      url: siteUrl,
      sameAs: [
        "https://www.instagram.com/pavlakubesova.bidli/",
        "https://www.facebook.com/pavla.chudomska",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
