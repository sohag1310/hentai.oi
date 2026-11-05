import { useEffect, useState } from "react";
import { readStringArray, writeStringArray } from "../utils/storage";
export function usePersistentList(key: string) {
  const [items, setItems] = useState<string[]>(() => readStringArray(key));
  useEffect(() => writeStringArray(key, items), [key, items]);
  const toggle = (slug: string) => setItems(current => current.includes(slug) ? current.filter(x => x !== slug) : [...current, slug]);
  return { items, toggle, has: (slug: string) => items.includes(slug) };
}
