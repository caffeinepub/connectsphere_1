import type { ReactNode } from "react";
import type { AppPage, NavigationState } from "../App";
import AppHeader from "./AppHeader";
import BottomNav from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
  navigate: (page: AppPage, params?: Record<string, string>) => void;
  currentPage: AppPage;
  showBottomNav: boolean;
}

export default function AppLayout({
  children,
  navigate,
  currentPage,
  showBottomNav,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      <AppHeader navigate={navigate} currentPage={currentPage} />
      <main
        className={`flex-1 overflow-y-auto ${showBottomNav ? "pb-20" : "pb-4"}`}
      >
        <div className="animate-slide-up">{children}</div>
      </main>
      {showBottomNav && (
        <BottomNav navigate={navigate} currentPage={currentPage} />
      )}
    </div>
  );
}
