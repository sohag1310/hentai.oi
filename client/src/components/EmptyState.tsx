import { SearchX } from "lucide-react";
export function EmptyState({ title, detail }: { title: string; detail: string }) {
  return <div className="col-span-full py-16 text-center text-gray-500"><SearchX className="mx-auto mb-3 opacity-50" size={32}/><p className="font-semibold text-gray-300">{title}</p><p className="mt-1 text-sm">{detail}</p></div>;
}
