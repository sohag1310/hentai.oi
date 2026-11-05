import { useEffect, useMemo, useState } from "react";
import { Search, Play, Plus, Menu, X, Star, Clapperboard, Languages, Server as ServerIcon, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import type { Anime, Episode, Series, Server } from "./types";
import { api } from "./services/api";
import { LANGUAGES, CATEGORIES } from "./constants/languages";
import { usePersistentList } from "./hooks/usePersistentList";
import { VideoFrame } from "./components/VideoFrame";
import { AnimeCard } from "./components/AnimeCard";
import { EmptyState } from "./components/EmptyState";


export default function App() {
  const [items,setItems]=useState<Anime[]>([]);
  const [search,setSearch]=useState("");
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState<Anime|null>(null);
  const [series,setSeries]=useState<Series|null>(null);
  const [episode,setEpisode]=useState(1);
  const [season,setSeason]=useState(1);
  const [lang,setLang]=useState<"hin"|"eng"|"sub">("hin");
  const [servers,setServers]=useState<Server[]>([]);
  const [serverId,setServerId]=useState("primary");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const { items: saved, toggle: toggleSaved } = usePersistentList("my-list");
  const [mobileNav,setMobileNav]=useState(false);

  useEffect(()=>{ api.catalog(query).then(d=>setItems(d.animes)).catch(()=>setError("Could not load catalogue.")); },[query]);
  useEffect(()=>{
    if(!selected) return;
    setLoading(true); setError("");
    api.series(selected.slug, season, lang)
      .then(d=>setSeries(d)).catch(()=>setError("Series details could not be loaded.")).finally(()=>setLoading(false));
  },[selected,season,lang]);
  useEffect(()=>{
    if(!selected) return;
    setLoading(true);
    api.episode(selected.slug, season, episode, serverId, lang)
      .then(d=>{setServers(d.servers); if(!d.servers.some(s=>s.id===serverId)) setServerId(d.servers[0]?.id||"primary");})
      .catch(()=>setError("No authorized stream is available for this episode."))
      .finally(()=>setLoading(false));
  },[selected,season,episode,lang,serverId]);

  const activeServer=servers.find(s=>s.id===serverId)||servers[0];
  const featured=items[0];
  const categories=useMemo(()=>CATEGORIES,[]);
  const [category,setCategory]=useState("All");
  const visible=items.filter(x=>category==="All"||x.category===category);
  const open=(anime:Anime)=>{setSelected(anime);setEpisode(1);setSeason(1);setSeries(null);setServers([]);window.scrollTo({top:0,behavior:"smooth"});};
  const close=()=>{setSelected(null);setSeries(null);setServers([]);};

  return <div className="min-h-screen bg-ink text-white">
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#101116]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <button onClick={close} className="flex items-center gap-2 text-xl font-black tracking-tight"><span className="grid h-8 w-8 place-items-center rounded-lg bg-neon text-black"><Clapperboard size={18}/></span>NEON<span className="text-neon">.</span></button>
        <nav className="hidden items-center gap-8 text-sm text-gray-400 md:flex"><button onClick={close} className="hover:text-white">Discover</button><a href="#catalog" className="hover:text-white">Series</a><a href="#about" className="hover:text-white">About</a></nav>
        <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-panel px-3 py-2 md:flex"><Search size={16} className="text-gray-500"/><input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setQuery(search)} placeholder="Search anime..." className="w-40 bg-transparent text-sm outline-none placeholder:text-gray-600"/></div>
        <button className="md:hidden" onClick={()=>setMobileNav(!mobileNav)}>{mobileNav?<X/>:<Menu/>}</button>
      </div>
      {mobileNav&&<div className="border-t border-white/10 px-5 py-4 md:hidden"><input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setQuery(search)} placeholder="Search anime..." className="w-full rounded-lg bg-panel p-3 outline-none"/></div>}
    </header>

    {selected ? <main className="mx-auto max-w-7xl px-5 py-8">
      <button onClick={close} className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white"><ArrowLeft size={16}/> Back to catalogue</button>
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <section>
          <VideoFrame server={activeServer} loading={loading} />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div><p className="text-xs uppercase tracking-widest text-neon">Now playing</p><h2 className="mt-1 text-xl font-bold">{selected.title} — Episode {episode}</h2></div>
            <div className="flex flex-wrap gap-2">{LANGUAGES.map(l=><button key={l.code} onClick={()=>setLang(l.code)} className={`rounded-lg px-3 py-2 text-xs font-semibold ${lang===l.code?"bg-neon text-black":"bg-panel text-gray-300 hover:bg-white/10"}`}>{l.name}</button>)}</div>
          </div>
          <div className="mt-4 rounded-xl border border-white/5 bg-panel p-4"><div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400"><ServerIcon size={14}/> Playback servers</div><div className="flex flex-wrap gap-2">{servers.map(s=><button key={s.id} onClick={()=>setServerId(s.id)} className={`rounded-lg px-4 py-2 text-sm ${serverId===s.id?"bg-neon font-bold text-black":"bg-[#282b35] text-gray-300"}`}>{s.name}</button>)}</div></div>
          {error&&<p className="mt-3 text-sm text-amber-300">{error}</p>}
        </section>
        <aside className="rounded-2xl border border-white/5 bg-panel p-5">
          <div className="flex gap-4"><img src={selected.image} className="h-36 w-24 rounded-xl object-cover" /><div><span className="rounded-md bg-neon/10 px-2 py-1 text-xs text-neon">{selected.category}</span><h1 className="mt-3 text-2xl font-black">{selected.title}</h1><p className="mt-2 flex items-center gap-1 text-sm text-yellow-400"><Star size={14} fill="currentColor"/>{selected.rating}/10 <span className="text-gray-500">· {selected.year}</span></p></div></div>
          <p className="mt-5 text-sm leading-6 text-gray-400">{series?.synopsis||selected.synopsis}</p>
          <div className="mt-6 flex items-center justify-between"><h3 className="font-bold">Episodes</h3><select value={season} onChange={e=>{setSeason(Number(e.target.value));setEpisode(1)}} className="rounded-lg border border-white/10 bg-[#282b35] px-3 py-2 text-sm">{Array.from({length:selected.seasons},(_,i)=><option key={i+1} value={i+1}>Season {i+1}</option>)}</select></div>
          <div className="mt-3 grid max-h-[380px] grid-cols-2 gap-2 overflow-y-auto pr-1">{(series?.episodes||Array.from({length:12},(_,i)=>({id:i+1,episode:i+1,season,title:`Episode ${i+1}`} as Episode))).map(ep=><button key={ep.id} onClick={()=>setEpisode(ep.episode)} className={`rounded-xl border p-3 text-left ${episode===ep.episode?"border-neon bg-neon/10":"border-white/5 bg-[#22252e] hover:border-white/20"}`}><span className="text-xs text-gray-500">EP {String(ep.episode).padStart(2,"0")}</span><p className="mt-1 text-sm font-semibold">{ep.title}</p></button>)}</div>
        </aside>
      </div>
    </main> : <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">{featured&&<img src={featured.image} className="h-full w-full object-cover opacity-20 blur-[2px]"/>}<div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30"/><div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/20"/></div>
        <div className="mx-auto grid min-h-[510px] max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-[1.1fr_.9fr]">
          <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
            <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-neon"><span className="h-1.5 w-1.5 rounded-full bg-neon"/> Your next obsession starts here</span>
            <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">Stories beyond <span className="text-neon">reality.</span></h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-gray-400">Discover unforgettable worlds, meet legendary characters, and find your next favourite series.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#catalog" className="flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-bold text-black shadow-glow transition hover:scale-[1.02]"><Play size={17} fill="currentColor"/> Explore catalogue</a><button onClick={()=>featured&&toggleSaved(featured.slug)} className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10"><Plus size={17}/> My list</button></div>
          </motion.div>
          {featured&&<motion.div initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}} transition={{duration:.7}} className="relative mx-auto w-full max-w-sm"><div className="absolute -inset-4 rounded-[2rem] bg-neon/10 blur-2xl"/><img src={featured.image} className="relative aspect-[3/4] w-full rounded-3xl border border-white/10 object-cover shadow-2xl"/><div className="absolute inset-x-0 bottom-0 rounded-b-3xl bg-gradient-to-t from-black/95 to-transparent p-6"><p className="text-xs font-bold uppercase tracking-widest text-neon">Featured series</p><h2 className="mt-1 text-2xl font-black">{featured.title}</h2><p className="mt-1 text-sm text-gray-300">{featured.category} · {featured.year}</p></div></motion.div>}
        </div>
      </section>
      <main id="catalog" className="mx-auto max-w-7xl px-5 pb-20">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.25em] text-neon">Curated for you</p><h2 className="mt-2 text-3xl font-black">Explore anime</h2></div><div className="flex flex-wrap gap-2">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`rounded-full px-4 py-2 text-xs font-semibold ${category===c?"bg-neon text-black":"bg-panel text-gray-400 hover:text-white"}`}>{c}</button>)}</div></div>
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-white/10 bg-panel px-4 py-3 md:hidden"><Search size={16} className="text-gray-500"/><input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setQuery(search)} placeholder="Search titles, genres..." className="w-full bg-transparent text-sm outline-none"/></div>
        {error&&!items.length?<p className="py-10 text-center text-gray-400">{error}</p>:<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{visible.map((anime,i)=><AnimeCard key={anime.slug} anime={anime} index={i} onOpen={open}/>)}</div>}
        {!visible.length&&<EmptyState title="No titles found" detail="Try another search or category."/>}
      </main>
    </>}
    <footer id="about" className="border-t border-white/5 bg-[#0c0d11] px-5 py-8 text-center text-xs text-gray-600">NEON STREAM · Demo interface for authorized content · © {new Date().getFullYear()}</footer>
  </div>;
}
