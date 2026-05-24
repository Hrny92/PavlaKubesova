export default {
  name: "instagramPost",
  title: "Instagram příspěvky",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Interní název (pro přehled v Sanity)",
      type: "string",
    },
    {
      name: "embedUrl",
      title: "Odkaz na Instagram příspěvek / Reels",
      type: "url",
      description: "Např. https://www.instagram.com/reel/XYZ123/",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "thumbnail",
      title: "Náhledový obrázek (thumbnail)",
      type: "image",
      options: { hotspot: true },
      description: "Screenshot nebo náhled videa/příspěvku",
    },
    {
      name: "viewCount",
      title: "Počet zhlédnutí (zobrazit na kartě, např. 12,4k)",
      type: "string",
    },
    {
      name: "order",
      title: "Pořadí zobrazení (1 = první)",
      type: "number",
      initialValue: 1,
    },
  ],
  orderings: [
    { title: "Pořadí", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", media: "thumbnail", subtitle: "viewCount" },
  },
};
