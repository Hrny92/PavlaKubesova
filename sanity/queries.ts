import { client } from "./client";

// ─── NEMOVITOSTI ────────────────────────────────────────────────────────────

export type Property = {
  _id: string;
  title: string;
  slug: { current: string };
  transactionType: "prodej" | "pronajem";
  category: string;
  location: string;
  price: string;
  area: string;
  layout: string;
  floor?: string;
  badge?: string;
  status: "active" | "reserved" | "sold";
  mainImage: { asset: { _ref: string } };
  gallery?: { asset: { _ref: string } }[];
  videoUrl?: string;
  matterportUrl?: string;
  description?: unknown[];
  accessories?: string;
  energyEfficiency?: string;
  buildingInfo?: string;
  infrastructure?: string;
  mapLink?: string;
  history?: string;
  _createdAt: string;
};

const PROPERTY_FIELDS = `
  _id, title, slug, transactionType, category, location, price, area, layout, floor, badge, status,
  mainImage, _createdAt
`;

export async function getLatestProperties(count = 3): Promise<Property[]> {
  return client.fetch(
    `*[_type == "property" && status == "active"] | order(_createdAt desc) [0...$count] { ${PROPERTY_FIELDS} }`,
    { count: count - 1 }
  );
}

export async function getAllProperties(): Promise<Property[]> {
  return client.fetch(
    `*[_type == "property"] | order(_createdAt desc) { ${PROPERTY_FIELDS} }`
  );
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  return client.fetch(
    `*[_type == "property" && slug.current == $slug][0] {
      _id, title, slug, transactionType, category, location, price, area, layout, floor, badge, status,
      mainImage, gallery, videoUrl, matterportUrl, description, accessories, energyEfficiency,
      buildingInfo, infrastructure, mapLink, history, _createdAt
    }`,
    { slug }
  );
}

// ─── ČLÁNKY ──────────────────────────────────────────────────────────────────

export type Article = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  publishedAt: string;
  excerpt: string;
  mainImage?: { asset: { _ref: string } };
  body?: unknown[];
  _createdAt: string;
};

const ARTICLE_FIELDS = `_id, title, slug, category, publishedAt, excerpt, mainImage, _createdAt`;

export async function getLatestArticles(count = 3): Promise<Article[]> {
  return client.fetch(
    `*[_type == "article"] | order(publishedAt desc) [0...$count] { ${ARTICLE_FIELDS} }`,
    { count: count - 1 }
  );
}

export async function getAllArticles(): Promise<Article[]> {
  return client.fetch(
    `*[_type == "article"] | order(publishedAt desc) { ${ARTICLE_FIELDS} }`
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return client.fetch(
    `*[_type == "article" && slug.current == $slug][0] {
      _id, title, slug, category, publishedAt, excerpt, mainImage, body, _createdAt
    }`,
    { slug }
  );
}

// ─── INSTAGRAM PŘÍSPĚVKY ─────────────────────────────────────────────────────

export type InstagramPost = {
  _id: string;
  title?: string;
  embedUrl: string;
  thumbnail?: { asset: { _ref: string } };
  viewCount?: string;
  order: number;
};

export async function getLatestInstagramPosts(count = 4): Promise<InstagramPost[]> {
  return client.fetch(
    `*[_type == "instagramPost"] | order(order asc) [0...$count] {
      _id, title, embedUrl, thumbnail, viewCount, order
    }`,
    { count: count - 1 }
  );
}
