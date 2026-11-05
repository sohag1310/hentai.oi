import type { Server } from "../types";
export function ServerSwitcher({ servers, selected, onChange }: { servers: Server[]; selected: string; onChange: (id: string) => void }) {
  return <div className="flex flex-wrap gap-2">{servers.map(server =>
    <button key={server.id} onClick={() => onChange(server.id)}
      className={`rounded-lg px-4 py-2 text-sm ${selected === server.id ? "bg-neon font-bold text-black" : "bg-[#282b35] text-gray-300"}`}>
      {server.name}
    </button>)}</div>;
}
