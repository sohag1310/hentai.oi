import { Play, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Anime } from "../types";

export function AnimeCard({ anime, index, onOpen }: { anime: Anime; index: number; onOpen: (anime: Anime) => void }) {
  return <motion.button key={anime.slug} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}}
    transition={{delay:Math.min(index * .035, .3)}} onClick={() => onOpen(anime)} className="group text-left">
    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-panel">
      <img src={anime.image} alt={anime.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"/>
      <span className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 text-xs font-bold text-yellow-300"><Star size={12} fill="currentColor"/>{anime.rating}</span>
      <span className="absolute bottom-3 left-3 rounded-md bg-neon px-2 py-1 text-[10px] font-black uppercase text-black">{anime.category}</span>
      <span className="absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100"><span className="grid h-14 w-14 place-items-center rounded-full bg-neon text-black shadow-glow"><Play fill="currentColor"/></span></span>
    </div>
    <h3 className="mt-3 line-clamp-1 font-bold group-hover:text-neon">{anime.title}</h3>
    <p className="mt-1 text-xs text-gray-500">{anime.year} · {anime.seasons} Season{anime.seasons > 1 ? "s" : ""}</p>
  </motion.button>;
}
