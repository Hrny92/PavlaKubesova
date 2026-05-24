export default {
  name: "article",
  title: "Články",
  type: "document",
  fields: [
    { name: "title", title: "Nadpis článku", type: "string" },
    {
      name: "slug",
      title: "Slug (URL adresa)",
      type: "slug",
      options: { source: "title", maxLength: 200 },
    },
    {
      name: "category",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Prodej", value: "Prodej" },
          { title: "Koupě", value: "Koupě" },
          { title: "Pronájem", value: "Pronájem" },
          { title: "Hypotéky", value: "Hypotéky" },
          { title: "Trh", value: "Trh" },
          { title: "Investice", value: "Investice" },
          { title: "Tipy", value: "Tipy" },
        ],
      },
    },
    {
      name: "publishedAt",
      title: "Datum publikace",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    { name: "excerpt", title: "Krátký popis (perex)", type: "text", rows: 3 },
    { name: "mainImage", title: "Hlavní obrázek", type: "image", options: { hotspot: true } },
    {
      name: "body",
      title: "Obsah článku",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "caption", title: "Popisek", type: "string" }],
        },
      ],
    },
  ],
  preview: {
    select: { title: "title", media: "mainImage", subtitle: "category" },
  },
};
