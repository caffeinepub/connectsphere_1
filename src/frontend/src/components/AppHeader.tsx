import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Bell } from "lucide-react";
import type { AppPage } from "../App";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import ThemeToggle from "./ThemeToggle";

interface AppHeaderProps {
  navigate: (page: AppPage, params?: Record<string, string>) => void;
  currentPage: AppPage;
}

const BACK_PAGES: AppPage[] = [
  "edit-profile",
  "post-detail",
  "chat-thread",
  "create-post",
  "create-story",
  "story-viewer",
  "notifications",
];
const BACK_TARGETS: Partial<Record<AppPage, AppPage>> = {
  "edit-profile": "profile",
  "post-detail": "home",
  "chat-thread": "chat",
  "create-post": "home",
  "create-story": "home",
  "story-viewer": "home",
  notifications: "home",
};

const PAGE_TITLES: Partial<Record<AppPage, string>> = {
  "edit-profile": "Edit Profile",
  "post-detail": "Post",
  "chat-thread": "Message",
  "create-post": "New Post",
  "create-story": "New Story",
  "story-viewer": "Story",
  notifications: "Notifications",
  search: "Search",
  chat: "Messages",
  profile: "Profile",
};

export default function AppHeader({ navigate, currentPage }: AppHeaderProps) {
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const showBack = BACK_PAGES.includes(currentPage);
  const title = PAGE_TITLES[currentPage];

  const handleBack = () => {
    const target = BACK_TARGETS[currentPage] || "home";
    navigate(target);
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  if (currentPage === "home") {
    return (
      <header className="sticky top-0 z-40 bg-background/80 glass border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <img
              src="/assets/generated/connectsphere-logo.dim_256x256.png"
              alt="ConnectSphere"
              className="w-8 h-8 rounded-xl"
            />
            <span className="font-display font-bold text-lg gradient-text">
              ConnectSphere
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => navigate("notifications")}
              className="relative p-2 rounded-xl hover:bg-muted transition-colors"
            >
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full gradient-primary" />
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 bg-background/80 glass border-b border-border">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              type="button"
              onClick={handleBack}
              className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
          ) : (
            <img
              src="/assets/generated/connectsphere-logo.dim_256x256.png"
              alt="ConnectSphere"
              className="w-8 h-8 rounded-xl"
            />
          )}
          {title && (
            <span className="font-display font-semibold text-base text-foreground">
              {title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {currentPage === "profile" && (
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-muted"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
