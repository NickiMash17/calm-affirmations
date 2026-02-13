import { ExternalLink, BookHeart, HeartHandshake } from "lucide-react";

const RESOURCES = [
  {
    title: "Breathing exercises",
    description: "Guided breathing and grounding prompts.",
  },
  {
    title: "Journaling prompts",
    description: "Short prompts to reflect and reset.",
  },
  {
    title: "Professional support",
    description: "Find local or online support options.",
  },
];

export default function ResourcesPanel() {
  return (
    <section className="mt-10 animate-fade-in" aria-label="Resources">
      <div className="flex items-center gap-2 mb-4">
        <BookHeart className="w-3.5 h-3.5 text-muted-foreground/70" strokeWidth={1.5} />
        <h2 className="text-sm font-serif font-medium text-foreground/70 tracking-wide">
          Resources
        </h2>
        <span className="text-[10px] text-muted-foreground/50">(coming soon)</span>
      </div>

      <div className="grid gap-3">
        {RESOURCES.map((item) => (
          <div key={item.title} className="glass-card rounded-2xl p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-medium text-foreground/85">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground/50">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Planned</span>
              </div>
            </div>
            <button
              disabled
              className="mt-3 text-xs text-muted-foreground/50 flex items-center gap-2
                disabled:cursor-not-allowed"
              aria-label="Resource link coming soon"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Add link later
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
