export type JournalEntry = {
  id: string;
  content: string;
  createdAt: number;
};

const STORAGE_KEY = "calm:journal";

export function loadJournal(): JournalEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as JournalEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveJournalEntry(content: string): JournalEntry {
  const entry: JournalEntry = {
    id: crypto.randomUUID(),
    content,
    createdAt: Date.now(),
  };
  const next = [entry, ...loadJournal()].slice(0, 30);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return entry;
}

export function clearJournal(): void {
  localStorage.removeItem(STORAGE_KEY);
}
