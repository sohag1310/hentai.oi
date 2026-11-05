import { MonitorPlay } from "lucide-react";
import type { Server } from "../types";

export function VideoFrame({ server, loading }: { server?: Server; loading: boolean }) {
  return <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
    {loading && <div className="absolute inset-0 z-10 grid place-items-center bg-black/70 text-sm text-gray-300">Loading episode…</div>}
    {!loading && server?.type === "file" && <video key={server.url} src={server.url} controls playsInline className="h-full w-full bg-black" />}
    {!loading && server?.type === "embed" && <iframe key={server.url} src={server.url} title="Authorized video player" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="h-full w-full border-0" />}
    {!loading && !server && <div className="grid h-full place-items-center text-center text-gray-400"><div><MonitorPlay size={42} className="mx-auto mb-3 opacity-40"/><p>No authorized stream configured for this episode.</p></div></div>}
  </div>;
}
