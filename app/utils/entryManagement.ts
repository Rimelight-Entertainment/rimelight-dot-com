export function normalizeSlug(slug: string): string {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, "");
  return cleanSlug === "index" ? "" : cleanSlug;
}
