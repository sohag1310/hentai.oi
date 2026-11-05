import type { Anime, CatalogProvider, Language, SeriesDetails, StreamServer } from "./types.js";

// Demo data only. Replace this provider with a catalogue and streams you are authorized to serve.
const demoVideo = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const items: Anime[] = [
  { slug: "celestial-runner", title: "Celestial Runner", synopsis: "A young pilot discovers a forgotten route between distant worlds and races to protect the people living along it.", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=900", category: "Adventure", year: 2025, rating: 8.7, seasons: 2 },
  { slug: "midnight-atelier", title: "Midnight Atelier", synopsis: "In a city where memories become art, an apprentice illustrator uncovers a mystery hidden in unfinished paintings.", image: "https://images.unsplash.com/photo-1614583225154-5fcunny4a9c1?w=900", category: "Fantasy", year: 2024, rating: 8.4, seasons: 1 },
  { slug: "neon-district", title: "Neon District", synopsis: "A courier navigates a sprawling futuristic city while carrying a message that could change its fragile peace.", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900", category: "Sci-Fi", year: 2026, rating: 9.1, seasons: 1 },
  { slug: "paper-moons", title: "Paper Moons", synopsis: "Two childhood friends reunite at a seaside town and try to solve the strange signals appearing every summer.", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900", category: "Drama", year: 2023, rating: 8.2, seasons: 1 }
];

export class DemoProvider implements CatalogProvider {
  async catalog({ page, search, category }: {page:number; search:string; category:string}) {
    const q = search.toLowerCase();
    return items.filter(x => (!q || x.title.toLowerCase().includes(q)) && (!category || x.category === category))
      .slice((page - 1) * 12, page * 12);
  }
  async series(slug: string, season: number, _lang: Language): Promise<SeriesDetails | null> {
    const anime = items.find(x => x.slug === slug);
    if (!anime) return null;
    return { ...anime, episodes: Array.from({length: 12}, (_, i) => ({
      id: i + 1, episode: i + 1, season, title: `Episode ${i + 1}`, duration: "24 min"
    })) };
  }
  async episode(_slug: string, _season: number, _ep: number, _server: string, _lang: Language) {
    const servers: StreamServer[] = [
      { id: "primary", name: "Primary", url: demoVideo, type: "file" },
      { id: "backup", name: "Backup", url: demoVideo, type: "file" }
    ];
    return { directUrl: demoVideo, servers, languages: [
      { code: "hin" as const, name: "Hindi" }, { code: "eng" as const, name: "English" }, { code: "sub" as const, name: "Japanese (Sub)" }
    ] };
  }
}
