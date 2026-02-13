import { Outlet, useLocation } from "react-router-dom";
import AppFooter from "@/components/AppFooter";
import FloatingBlobs from "@/components/FloatingBlobs";
import TopNav from "@/components/TopNav";

export default function AppShell() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col aurora-bg">
      <FloatingBlobs />

      <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 pb-12 relative z-10">
        <div className="w-full max-w-md sm:max-w-2xl lg:max-w-4xl">
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
