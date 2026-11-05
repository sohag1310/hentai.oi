export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div><p className="text-xs font-bold uppercase tracking-[.25em] text-neon">{eyebrow}</p><h2 className="mt-2 text-3xl font-black">{title}</h2></div>;
}
