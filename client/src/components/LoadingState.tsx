export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return <div role="status" className="grid min-h-40 place-items-center text-sm text-gray-400">
    <span className="flex items-center gap-3"><span className="h-5 w-5 animate-spin rounded-full border-2 border-neon border-t-transparent"/>{label}</span>
  </div>;
}
