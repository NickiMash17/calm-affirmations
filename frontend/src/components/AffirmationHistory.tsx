import { useState } from "react";
import { Clock, Trash2, ChevronDown } from "lucide-react";
import { HistoryEntry } from "@/lib/history";

interface Props {
  entries: HistoryEntry[];
  onClear: () => void;
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function AffirmationHistory({ entries, onClear }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (entries.length === 0) {
    return (
      <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 text-center mt-8 sm:mt-10 animate-fade-in">
        <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-muted/70 flex items-center justify-center">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <h3 className="text-sm sm:text-base font-semibold mt-3 sm:mt-4">No affirmations yet</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 sm:mt-2">
          Your history will appear here once you create your first one.
        </p>
      </div>
    );
  }

  const visible = expanded ? entries : entries.slice(0, 3);

  return (
    <section className="mt-8 sm:mt-10 animate-fade-in" aria-label="Past affirmations">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground/70" strokeWidth={1.5} />
          <h2 className="text-xs sm:text-sm font-serif font-medium text-foreground/70 tracking-wide">
            Past Reflections
          </h2>
        </div>
        <button
          onClick={onClear}
          className="text-[9px] sm:text-[10px] text-muted-foreground/60 hover:text-warning/80
            transition-colors duration-300 flex items-center gap-1
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          aria-label="Clear history"
        >
          <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          Clear
        </button>
      </div>

      <div className="space-y-0">
        {visible.map((entry, i) => (
          <div
            key={entry.id}
            className="history-item animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "backwards" }}
          >
            <div className="glass-card rounded-2xl p-3 sm:p-4 space-y-1.5">
              <p className="text-foreground/90 text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
                "{entry.affirmation}"
              </p>
              <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-muted-foreground/60">
                <span>for {entry.name} - {entry.feeling}</span>
                <span>{timeAgo(entry.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {entries.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2.5 sm:mt-3 w-full text-[10px] sm:text-xs text-muted-foreground/70 hover:text-primary/70
            transition-colors duration-300 flex items-center justify-center gap-1
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg py-1.5 sm:py-2"
        >
          <ChevronDown className={`w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          {expanded ? "Show less" : `Show ${entries.length - 3} more`}
        </button>
      )}
    </section>
  );
}
