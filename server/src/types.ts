export type Language = "hin" | "eng" | "sub";
export type StreamServer = { id: string; name: string; url: string; type: "embed" | "file" };
export type Episode = { id: number; episode: number; season: number; title: string; duration?: string };
export type Anime = {
  slug: string; title: string; synopsis: string; image: string;
  category: string; year: number; rating: number; seasons: number;
};
export type SeriesDetails = Anime & { episodes: Episode[] };
export interface CatalogProvider {
  catalog(input: { page: number; search: string; category: string }): Promise<Anime[]>;
  series(slug: string, season: number, lang: Language): Promise<SeriesDetails | null>;
  episode(slug: string, season: number, ep: number, server: string, lang: Language): Promise<{ directUrl: string; servers: StreamServer[]; languages: {code: Language; name: string}[] }>;
}
