import { Outlet, useLocation } from "react-router-dom";
import AppFooter from "@/components/AppFooter";
import ThemeToggle from "@/components/ThemeToggle";
import FloatingBlobs from "@/components/FloatingBlobs";
import TopNav from "@/components/TopNav";

export default function AppShell() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col aurora-bg">
      <FloatingBlobs />
      <ThemeToggle />

      <main className="flex-1 flex flex-col items-center justify-start px-3 sm:px-6 pb-10 relative z-10">
        <div className="w-full max-w-md sm:max-w-lg">
          <div className="sr-only" aria-live="polite">
            {location.pathname === "/" && "Home"}
            {location.pathname === "/journal" && "Journal"}
            {location.pathname === "/resources" && "Resources"}
          </div>
          <TopNav />
          <Outlet />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
