import ThemeToggle from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", to: "/" },
  { label: "Journal", to: "/journal" },
  { label: "Resources", to: "/resources" },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 mb-4 sm:mb-5 md:mb-6 pt-2" aria-label="Primary">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden inline-flex items-center justify-center p-2.5 rounded-xl border border-border/60
            text-muted-foreground/80 bg-background/40 hover:border-primary/40 hover:text-foreground transition-all"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span className="sr-only">Toggle menu</span>
        </button>

        <div className="hidden sm:flex items-center justify-center gap-2 sm:gap-3 flex-1">
          {links.map((link) => {
            const isActive = location.pathname === link.to;

            return (
              <a
                key={link.to}
                href={link.to}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs transition-all duration-300 border border-border/60 text-muted-foreground/70 bg-background/40 hover:text-foreground hover:border-primary/30",
                  isActive && "text-primary-foreground border-primary bg-primary"
                )}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="ml-auto sm:ml-0">
          <ThemeToggle />
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="mt-4 grid gap-2 rounded-2xl border border-border/60 bg-background/60 p-4 sm:hidden
            animate-fade-in-up"
        >
          {links.map((link) => {
            const isActive = location.pathname === link.to;

            return (
              <a
                key={link.to}
                href={link.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-xl text-sm transition-all duration-300 border border-border/50 text-muted-foreground/80 bg-background/40 hover:text-foreground hover:border-primary/40",
                  isActive && "text-primary-foreground border-primary bg-primary"
                )}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
