import { NavLink } from "@/components/NavLink";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Home", to: "/" },
  { label: "Journal", to: "/journal" },
  { label: "Resources", to: "/resources" },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="mt-6 sm:mt-8 mb-6" aria-label="Primary">
      <div className="flex items-center justify-between sm:justify-center">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 sm:hidden">
          Menu
        </span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border/60
            text-muted-foreground/80 bg-background/40 hover:border-primary/40 hover:text-foreground transition-all"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span className="text-xs">Navigate</span>
        </button>

        <div className="hidden sm:flex items-center justify-center gap-2 sm:gap-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs transition-all duration-300
                border border-border/60 text-muted-foreground/70 bg-background/40
                hover:text-foreground hover:border-primary/30"
              activeClassName="text-primary-foreground border-primary bg-primary"
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="mt-4 grid gap-2 rounded-2xl border border-border/60 bg-background/60 p-4 sm:hidden
            animate-fade-in-up"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-sm transition-all duration-300
                border border-border/50 text-muted-foreground/80 bg-background/40
                hover:text-foreground hover:border-primary/40"
              activeClassName="text-primary-foreground border-primary bg-primary"
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
