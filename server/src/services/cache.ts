type Entry<T> = { value: T; expiresAt: number };
export class MemoryCache<T> {
  private values = new Map<string, Entry<T>>();
  constructor(private ttlMs: number) {}
  get(key: string): T | undefined {
    const item = this.values.get(key);
    if (!item) return undefined;
    if (item.expiresAt <= Date.now()) { this.values.delete(key); return undefined; }
    return item.value;
  }
  set(key: string, value: T) { this.values.set(key, { value, expiresAt: Date.now() + this.ttlMs }); }
  clear() { this.values.clear(); }
}
