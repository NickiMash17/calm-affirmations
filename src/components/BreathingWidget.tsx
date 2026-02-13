import { useEffect, useState } from "react";

const PHASES = [
  { label: "Breathe in…", duration: 4000 },
  { label: "Hold…", duration: 4000 },
  { label: "Breathe out…", duration: 6000 },
];

export default function BreathingWidget() {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhaseIndex((i) => (i + 1) % PHASES.length);
    }, PHASES[phaseIndex].duration);
    return () => clearTimeout(timer);
  }, [phaseIndex]);

  const phase = PHASES[phaseIndex];
  const isInhale = phaseIndex === 0;
  const isExhale = phaseIndex === 2;

  return (
    <div className="mt-6 flex flex-col items-center gap-4 animate-fade-in">
      <p className="text-[11px] text-muted-foreground/60 tracking-widest uppercase">
        While you wait
      </p>
      <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32">
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border border-primary/20"
          style={{
            animation: isInhale
              ? "breatheCircleIn 4s ease-in-out forwards"
              : isExhale
              ? "breatheCircleOut 6s ease-in-out forwards"
              : "none",
            transform: isInhale ? "scale(1)" : phaseIndex === 1 ? "scale(1.15)" : "scale(1.15)",
          }}
        />
        {/* Inner glow circle */}
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center transition-all"
          style={{
            animation: isInhale
              ? "breatheGlow 4s ease-in-out forwards"
              : isExhale
              ? "breatheShrink 6s ease-in-out forwards"
              : "none",
            boxShadow: phaseIndex === 1 ? "0 0 30px hsl(172 50% 48% / 0.2)" : undefined,
          }}
        >
          <div className="w-3 h-3 rounded-full bg-primary/50 animate-pulse-gentle" />
        </div>
      </div>
      <p className="text-sm text-foreground/70 font-light italic animate-fade-in" key={phaseIndex}>
        {phase.label}
      </p>
    </div>
  );
}
