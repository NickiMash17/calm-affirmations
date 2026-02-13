import { Outlet, useLocation } from "react-router-dom";
import AppFooter from "@/components/AppFooter";
import FloatingBlobs from "@/components/FloatingBlobs";
import FloatingHearts from "@/components/FloatingHearts";
import TopNav from "@/components/TopNav";

export default function AppShell() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col aurora-bg">
      <FloatingBlobs />
      <FloatingHearts />

      <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 lg:px-10 pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12 relative z-10">
        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl">
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
