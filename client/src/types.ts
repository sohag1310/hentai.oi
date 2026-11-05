export type Language = "hin" | "eng" | "sub";
export type Anime = {
  slug: string; title: string; synopsis: string; image: string;
  category: string; year: number; rating: number; seasons: number;
};
export type Episode = { id: number; episode: number; season: number; title: string; duration?: string };
export type Server = { id: string; name: string; url: string; type: "embed" | "file" };
export type Series = Anime & { episodes: Episode[] };
