import type { Anime, Episode, Language, Series, Server } from "../types";

async function request<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal, headers: { Accept: "application/json" } });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || `Request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export const api = {
  catalog: (search = "", category = "", page = 1, signal?: AbortSignal) =>
    request<{ success: boolean; page: number; animes: Anime[] }>(
      `/api/catalog?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&page=${page}`, signal
    ),
  series: (slug: string, season = 1, lang: Language, signal?: AbortSignal) =>
    request<{ success: boolean } & Series>(`/api/series/${encodeURIComponent(slug)}?season=${season}&lang=${lang}`, signal),
  episode: (slug: string, season: number, ep: number, server: string, lang: Language, signal?: AbortSignal) =>
    request<{ success: boolean; directUrl: string; servers: Server[]; languages: { code: Language; name: string }[] }>(
      `/api/episode?slug=${encodeURIComponent(slug)}&season=${season}&ep=${ep}&server=${encodeURIComponent(server)}&lang=${lang}`, signal
    )
};
