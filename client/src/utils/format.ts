export const slugToTitle = (slug: string) =>
  slug.split("-").filter(Boolean).map(part => part[0]?.toUpperCase() + part.slice(1)).join(" ");
export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
