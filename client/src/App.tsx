import { useMemo, useState } from "react";
import { ArrowUpRight, Home, Search, ShieldAlert, ExternalLink, RefreshCw } from "lucide-react";

const SOURCE = "https://hanime.tv";

export default function App() {
  const [slug, setSlug] = useState("");
  const [season, setSeason] = useState("1");
  const [episode, setEpisode] = useState("1");
  const [server, setServer] = useState("multi-1");
  const [language, setLanguage] = useState("hin");
  const [pageUrl, setPageUrl] = useState(SOURCE);
  const [frameKey, setFrameKey] = useState(0);

  const watchUrl = useMemo(() => {
    const cleanSlug = slug.trim().replace(/^https?:\/\/hanime\.tv\/videos\/hentai\//i, "").split(/[/?#]/)[0];
    if (!cleanSlug) return "";
    const query = new URLSearchParams({ season, ep: episode, server, lang: language });
    return `${SOURCE}/videos/hentai/${encodeURIComponent(cleanSlug)}?${query.toString()}`;
  }, [slug, season, episode, server, language]);

  const navigate = (url: string) => {
    setPageUrl(url);
    setFrameKey((n) => n + 1);
  };

  const openWatch = () => { if (watchUrl) navigate(watchUrl); };

  return (
    <div className="min-h-screen bg-[#0d0f14] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#10131b]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(SOURCE)} className="mr-2 flex items-center gap-2 text-lg font-black tracking-wide">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#06c149] text-black">N</span>
            NEON <span className="text-[#06c149]">LIVE</span>
          </button>
          <button onClick={() => navigate(SOURCE)} className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm hover:bg-white/10"><Home size={16}/> Home</button>
          <div className="flex min-w-[230px] flex-1 flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-black/30 p-2">
            <Search size={16} className="ml-1 text-gray-400"/>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} onKeyDown={(e) => e.key === "Enter" && openWatch()} placeholder="Series slug (for example: series-name)" className="min-w-[170px] flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-gray-500" />
            <button onClick={openWatch} disabled={!watchUrl} className="rounded-lg bg-[#06c149] px-3 py-2 text-xs font-bold text-black disabled:opacity-40">Open player</button>
          </div>
          <a href={pageUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-200 hover:bg-white/10"><ExternalLink size={15}/> Open source</a>
        </div>
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2 px-4 pb-3 text-xs">
          <label className="text-gray-400">Season <input value={season} onChange={e=>setSeason(e.target.value.replace(/\D/g, "") || "1")} className="ml-1 w-12 rounded-md border border-white/10 bg-black/30 px-2 py-1 text-white" /></label>
          <label className="text-gray-400">Episode <input value={episode} onChange={e=>setEpisode(e.target.value.replace(/\D/g, "") || "1")} className="ml-1 w-12 rounded-md border border-white/10 bg-black/30 px-2 py-1 text-white" /></label>
          <label className="text-gray-400">Server <select value={server} onChange={e=>setServer(e.target.value)} className="ml-1 rounded-md border border-white/10 bg-[#171b24] px-2 py-1 text-white"><option value="multi-1">multi-1</option><option value="multi-2">multi-2</option></select></label>
          <label className="text-gray-400">Language <select value={language} onChange={e=>setLanguage(e.target.value)} className="ml-1 rounded-md border border-white/10 bg-[#171b24] px-2 py-1 text-white"><option value="hin">Hindi</option><option value="eng">English</option><option value="sub">Japanese (Sub)</option></select></label>
          <button onClick={() => setFrameKey(n=>n+1)} className="ml-auto flex items-center gap-1 rounded-md px-2 py-1 text-gray-400 hover:bg-white/10 hover:text-white"><RefreshCw size={13}/> Reload view</button>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-3 py-3 sm:px-4">
        <div className="mb-3 flex flex-wrap items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-xs leading-5 text-amber-100/80">
          <ShieldAlert size={16} className="mt-0.5 shrink-0 text-amber-300"/>
          <p className="flex-1">এই পেজটি মূল সাইটকে সরাসরি iframe-এ দেখায়—পোস্টার, পেজ ও প্লেয়ার মূল সাইট থেকেই লোড হয়। মূল সাইট যদি iframe embedding বন্ধ রাখে, এখানে ফাঁকা/ব্লকড দেখা যেতে পারে; তখন “Open source” চাপ দিয়ে নতুন ট্যাবে দেখুন। এই অ্যাপ কোনো লগইন, anti-bot বা access control বাইপাস করে না।</p>
          <a href={pageUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 whitespace-nowrap font-bold text-amber-200 hover:text-white">Fallback <ArrowUpRight size={14}/></a>
        </div>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
          <iframe key={frameKey} title="Live source website" src={pageUrl} className="h-[calc(100vh-190px)] min-h-[620px] w-full bg-black" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
        </div>
        <p className="px-1 py-3 text-center text-[11px] text-gray-500">Source page: {pageUrl}</p>
      </main>
    </div>
  );
}
