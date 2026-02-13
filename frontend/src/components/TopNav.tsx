import { NavLink } from "@/components/NavLink";

const links = [
  { label: "Home", to: "/" },
  { label: "Journal", to: "/journal" },
  { label: "Resources", to: "/resources" },
];

export default function TopNav() {
  return (
    <nav className="flex items-center justify-center gap-2 sm:gap-3 mt-2 mb-6">
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
    </nav>
  );
}
