import { LANGUAGES } from "../constants/languages";
import type { Language } from "../types";
export function LanguageSwitcher({ value, onChange }: { value: Language; onChange: (value: Language) => void }) {
  return <div className="flex flex-wrap gap-2">{LANGUAGES.map(language =>
    <button key={language.code} onClick={() => onChange(language.code)}
      className={`rounded-lg px-3 py-2 text-xs font-semibold ${value === language.code ? "bg-neon text-black" : "bg-panel text-gray-300 hover:bg-white/10"}`}>
      {language.name}
    </button>)}</div>;
}
