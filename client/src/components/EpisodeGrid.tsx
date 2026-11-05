import type { Episode } from "../types";
export function EpisodeGrid({ episodes, selected, onSelect }: { episodes: Episode[]; selected: number; onSelect: (episode: number) => void }) {
  return <div className="mt-3 grid max-h-[380px] grid-cols-2 gap-2 overflow-y-auto pr-1">{episodes.map(ep =>
    <button key={`${ep.season}-${ep.episode}`} onClick={() => onSelect(ep.episode)}
      className={`rounded-xl border p-3 text-left ${selected === ep.episode ? "border-neon bg-neon/10" : "border-white/5 bg-[#22252e] hover:border-white/20"}`}>
      <span className="text-xs text-gray-500">EP {String(ep.episode).padStart(2, "0")}</span>
      <p className="mt-1 text-sm font-semibold">{ep.title}</p>
    </button>)}</div>;
}
