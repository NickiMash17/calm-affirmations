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
            border border-primary/30 text-primary/80 bg-primary/10
            hover:text-primary hover:border-primary/50 hover:bg-primary/15"
          activeClassName="text-primary-foreground border-primary bg-primary"
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
