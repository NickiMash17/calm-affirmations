import { useState } from "react";
import { BookOpen, Save, Trash2, Pencil, Check, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  JournalEntry,
  loadJournal,
  saveJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
  clearJournal,
} from "@/lib/journal";

export default function JournalPage() {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>(() => loadJournal());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  const canSave = text.trim().length > 0;
  const canUpdate = editingText.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    const entry = saveJournalEntry(text.trim());
    setEntries((prev) => [entry, ...prev].slice(0, 30));
    setText("");
  };

  const handleStartEdit = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setEditingText(entry.content);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const handleConfirmEdit = () => {
    if (!editingId || !canUpdate) return;
    const updated = updateJournalEntry(editingId, editingText.trim());
    if (!updated) return;

    setEntries((prev) => prev.map((entry) => (entry.id === editingId ? updated : entry)));
    handleCancelEdit();
  };

  const handleDeleteEntry = (id: string) => {
    deleteJournalEntry(id);
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    if (editingId === id) {
      handleCancelEdit();
    }
  };

  const handleClear = () => {
    clearJournal();
    setEntries([]);
    handleCancelEdit();
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
          <span className="text-[10px] text-muted-foreground/60 tabular-nums">{text.length}/280</span>
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
          {entries.map((entry) => {
            const isEditing = editingId === entry.id;

            return (
              <div key={entry.id} className="glass-card rounded-xl p-4">
                {isEditing ? (
                  <Textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    rows={3}
                    className="bg-background/50 border-border/60 rounded-xl
                      focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-300
                      placeholder:text-muted-foreground/50 resize-none"
                  />
                ) : (
                  <p className="text-foreground/90 text-sm leading-relaxed font-light">{entry.content}</p>
                )}

                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-[10px] text-muted-foreground/50">
                    {new Date(entry.createdAt).toLocaleString()}
                    {entry.updatedAt ? " (edited)" : ""}
                  </p>

                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleCancelEdit}
                          className="text-[10px] text-muted-foreground/70 hover:text-foreground/90
                            transition-colors duration-300 flex items-center gap-1"
                          aria-label="Cancel edit"
                        >
                          <X className="w-3 h-3" />
                          Cancel
                        </button>
                        <button
                          onClick={handleConfirmEdit}
                          disabled={!canUpdate}
                          className="text-[10px] text-primary/90 hover:text-primary
                            disabled:opacity-40 disabled:cursor-not-allowed
                            transition-colors duration-300 flex items-center gap-1"
                          aria-label="Save edit"
                        >
                          <Check className="w-3 h-3" />
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleStartEdit(entry)}
                          className="text-[10px] text-muted-foreground/70 hover:text-foreground/90
                            transition-colors duration-300 flex items-center gap-1"
                          aria-label="Edit entry"
                        >
                          <Pencil className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="text-[10px] text-muted-foreground/70 hover:text-warning/80
                            transition-colors duration-300 flex items-center gap-1"
                          aria-label="Delete entry"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
