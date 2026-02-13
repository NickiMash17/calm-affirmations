import { useMemo, useState } from "react";
import { BookOpen, Save, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { JournalEntry, loadJournal, saveJournalEntry, clearJournal } from "@/lib/journal";

export default function DailyJournal() {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>(() => loadJournal());

  const canSave = text.trim().length > 0;

  const preview = useMemo(() => entries.slice(0, 3), [entries]);

  const handleSave = () => {
    if (!canSave) return;
    const entry = saveJournalEntry(text.trim());
    setEntries((prev) => [entry, ...prev].slice(0, 30));
    setText("");
  };

  const handleClear = () => {
    clearJournal();
    setEntries([]);
  };

  return (
    <section className="mt-10 animate-fade-in" aria-label="Daily journal">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-muted-foreground/70" strokeWidth={1.5} />
          <h2 className="text-sm font-serif font-medium text-foreground/70 tracking-wide">
            Daily Journal
          </h2>
        </div>
        <button
          onClick={handleClear}
          disabled={entries.length === 0}
          className="text-[10px] text-muted-foreground/50 hover:text-warning/80
            transition-colors duration-300 flex items-center gap-1
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded
            disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Clear journal entries"
        >
          <Trash2 className="w-3 h-3" />
          Clear
        </button>
      </div>

      <div className="glass-card rounded-2xl p-5 sm:p-6 space-y-4">
        <Textarea
          placeholder="Write a quick note about today..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="bg-background/50 border-border/60 rounded-xl
            focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-300
            placeholder:text-muted-foreground/50 resize-none"
        />
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground/60 tabular-nums">
            {text.length}/280
          </span>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="btn-primary-glow h-9 px-4 rounded-xl text-xs font-medium
              bg-primary text-primary-foreground
              focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none
              disabled:opacity-60 disabled:cursor-not-allowed
              flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5" />
            Save note
          </button>
        </div>
      </div>

      {preview.length > 0 && (
        <div className="mt-4 space-y-3">
          {preview.map((entry) => (
            <div key={entry.id} className="glass-card rounded-xl p-4">
              <p className="text-foreground/90 text-sm leading-relaxed font-light">
                {entry.content}
              </p>
              <p className="text-[10px] text-muted-foreground/50 mt-2">
                {new Date(entry.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
