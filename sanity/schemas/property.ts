export default {
  name: "property",
  title: "Nemovitosti",
  type: "document",
  fields: [
    { name: "title", title: "Název nemovitosti", type: "string" },
    {
      name: "slug",
      title: "Slug (URL adresa)",
      type: "slug",
      options: { source: "title", maxLength: 200 },
    },
    {
      name: "badge",
      title: "Badge (štítek na kartě)",
      type: "string",
      options: {
        list: [
          { title: "Novinka", value: "Novinka" },
          { title: "3D prohlídka", value: "3D prohlídka" },
          { title: "Exkluzivně", value: "Exkluzivně" },
          { title: "Sleva", value: "Sleva" },
        ],
      },
    },
    {
      name: "transactionType",
      title: "Typ transakce",
      type: "string",
      options: {
        list: [
          { title: "Prodej", value: "prodej" },
          { title: "Pronájem", value: "pronajem" },
        ],
        layout: "radio",
      },
      initialValue: "prodej",
    },
    {
      name: "category",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Byt", value: "byt" },
          { title: "Dům", value: "dum" },
          { title: "Pozemek", value: "pozemek" },
          { title: "Komerce", value: "komerce" },
        ],
      },
      initialValue: "byt",
    },
    {
      name: "status",
      title: "Stav nabídky",
      type: "string",
      options: {
        list: [
          { title: "Aktivní", value: "active" },
          { title: "Rezervováno", value: "reserved" },
          { title: "Prodáno / Pronajato", value: "sold" },
        ],
        layout: "radio",
      },
      initialValue: "active",
    },
    { name: "location", title: "Lokalita", type: "string" },
    { name: "price", title: "Cena (např. 5 890 000 Kč)", type: "string" },
    { name: "area", title: "Plocha (m²)", type: "string" },
    { name: "layout", title: "Dispozice (např. 3+kk)", type: "string" },
    { name: "floor", title: "Patro (např. 4. / 6.)", type: "string" },
    { name: "mainImage", title: "Hlavní obrázek", type: "image", options: { hotspot: true } },
    {
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [{ type: "image" }],
      options: { layout: "grid" },
    },
    {
      name: "externalUrl",
      title: "Odkaz na inzerát (Sreality, Bidli apod.)",
      type: "url",
      description: "Pokud je vyplněno, kliknutí na kartu přesměruje na tento odkaz (nová záložka) místo detailu nabídky.",
    },
    { name: "videoUrl", title: "Odkaz na YouTube video", type: "url" },
    {
      name: "matterportUrl",
      title: "Odkaz na 3D prohlídku (Matterport)",
      type: "url",
      description: "Např. https://my.matterport.com/show/?m=xyz",
    },
    {
      name: "description",
      title: "Popis nemovitosti",
      type: "array",
      of: [{ type: "block" }],
    },
    { name: "accessories", title: "Příslušenství", type: "string" },
    { name: "energyEfficiency", title: "Energetická náročnost", type: "string" },
    { name: "buildingInfo", title: "Stavba a podlaží", type: "string" },
    { name: "infrastructure", title: "Infrastruktura", type: "string" },
    { name: "mapLink", title: "Odkaz na mapu (Google Maps embed)", type: "string" },
    { name: "history", title: "Historie / Rekonstrukce", type: "text" },
  ],
  preview: {
    select: { title: "title", media: "mainImage", subtitle: "location" },
  },
};
