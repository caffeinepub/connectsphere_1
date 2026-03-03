import { Home, Search, Plus, MessageCircle, User } from 'lucide-react';
import type { AppPage } from '../App';

interface BottomNavProps {
  navigate: (page: AppPage, params?: Record<string, string>) => void;
  currentPage: AppPage;
}

const NAV_ITEMS = [
  { page: 'home' as AppPage, icon: Home, label: 'Home' },
  { page: 'search' as AppPage, icon: Search, label: 'Search' },
  { page: 'create-post' as AppPage, icon: Plus, label: 'Post' },
  { page: 'chat' as AppPage, icon: MessageCircle, label: 'Chat' },
  { page: 'profile' as AppPage, icon: User, label: 'Me' },
];

export default function BottomNav({ navigate, currentPage }: BottomNavProps) {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-auto">
      {/* Floating pill container */}
      <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-card/95 glass shadow-[0_8px_32px_rgba(0,0,0,0.18)] border border-border/80">
        {NAV_ITEMS.map(({ page, icon: Icon, label }) => {
          const isActive = currentPage === page;
          const isCreate = page === 'create-post';

          if (isCreate) {
            return (
              <button
                key={page}
                onClick={() => navigate(page)}
                title={label}
                className="mx-1 w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center shadow-glow hover:opacity-90 active:scale-90 transition-all duration-200"
              >
                <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
              </button>
            );
          }

          return (
            <button
              key={page}
              onClick={() => navigate(page)}
              title={label}
              className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 active:scale-90 ${
                isActive
                  ? 'bg-primary/15'
                  : 'hover:bg-muted'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              {/* Active dot indicator */}
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full gradient-primary" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
