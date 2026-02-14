export type JournalEntry = {
  id: string;
  content: string;
  createdAt: number;
  updatedAt?: number;
};

const STORAGE_KEY = "calm:journal";

function persist(entries: JournalEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

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
  persist(next);
  return entry;
}

export function updateJournalEntry(id: string, content: string): JournalEntry | null {
  const entries = loadJournal();
  const index = entries.findIndex((entry) => entry.id === id);
  if (index < 0) return null;

  const updated: JournalEntry = {
    ...entries[index],
    content,
    updatedAt: Date.now(),
  };

  const next = [...entries];
  next[index] = updated;
  persist(next);
  return updated;
}

export function deleteJournalEntry(id: string): void {
  const next = loadJournal().filter((entry) => entry.id !== id);
  persist(next);
}

export function clearJournal(): void {
  localStorage.removeItem(STORAGE_KEY);
}
