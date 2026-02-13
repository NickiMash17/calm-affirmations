import { useState } from "react";
import { BookOpen, Save, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { JournalEntry, loadJournal, saveJournalEntry, clearJournal } from "@/lib/journal";

export default function JournalPage() {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>(() => loadJournal());

  const canSave = text.trim().length > 0;

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
    <div className="w-full">
      <div className="glass-card rounded-2xl p-5 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-muted-foreground/70" strokeWidth={1.5} />
          <h2 className="text-base font-serif font-medium text-foreground/80">Daily Journal</h2>
        </div>

        <Textarea
          placeholder="Write a quick note about today..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="bg-background/50 border-border/60 rounded-xl
            focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-300
            placeholder:text-muted-foreground/50 resize-none"
        />

        <div className="flex items-center justify-between mt-4">
          <span className="text-[10px] text-muted-foreground/60 tabular-nums">
            {text.length}/280
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              disabled={entries.length === 0}
              className="text-[10px] text-muted-foreground/60 hover:text-warning/80
                transition-colors duration-300 flex items-center gap-1
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded
                disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Clear journal entries"
            >
              <Trash2 className="w-3 h-3" />
              Clear
            </button>
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
      </div>

      {entries.length > 0 && (
        <div className="mt-6 space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="glass-card rounded-xl p-4">
              <p className="text-foreground/90 text-sm leading-relaxed font-light">
                {entry.content}
              </p>
              <p className="text-[10px] text-muted-foreground/50 mt-2">
                {new Date(entry.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
