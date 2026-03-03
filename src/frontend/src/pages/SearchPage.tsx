import { Skeleton } from "@/components/ui/skeleton";
import { Search, UserCheck, UserPlus } from "lucide-react";
import { useState } from "react";
import type { AppPage } from "../App";
import { useSearchUsers } from "../hooks/useQueries";
import { generateAvatarUrl } from "../lib/mockData";

interface SearchPageProps {
  navigate: (page: AppPage, params?: Record<string, string>) => void;
}

export default function SearchPage({ navigate: _navigate }: SearchPageProps) {
  const [query, setQuery] = useState("");
  const [following, setFollowing] = useState<Set<string>>(new Set());
  const { data: results, isLoading } = useSearchUsers(query);

  const toggleFollow = (username: string) => {
    setFollowing((prev) => {
      const next = new Set(prev);
      if (next.has(username)) {
        next.delete(username);
      } else {
        next.add(username);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col">
      {/* Search Input */}
      <div className="px-4 py-3 border-b border-border sticky top-0 bg-background/80 glass z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground placeholder:text-muted-foreground text-sm transition-all"
          />
        </div>
      </div>

      {/* Results */}
      <div className="px-4 py-2">
        {isLoading && query.length > 0 && (
          <div className="space-y-3 py-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && query.length > 0 && results && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground mb-1">No users found</p>
            <p className="text-sm text-muted-foreground">
              Try a different search term
            </p>
          </div>
        )}

        {!isLoading && results && results.length > 0 && (
          <div className="space-y-1 py-2">
            {results.map((user) => {
              const avatarSrc =
                user.avatar || generateAvatarUrl(user.displayName);
              const isFollowing = following.has(user.name);
              return (
                <div
                  key={user.name}
                  className="flex items-center gap-3 py-2.5 px-1 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <img
                      src={avatarSrc}
                      alt={user.displayName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      @{user.name}
                    </p>
                    {user.bio && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {user.bio}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFollow(user.name)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 shrink-0 ${
                      isFollowing
                        ? "bg-muted text-foreground border border-border"
                        : "gradient-primary text-white"
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck style={{ width: "12px", height: "12px" }} />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus style={{ width: "12px", height: "12px" }} />
                        Follow
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {query.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground mb-1">Find people</p>
            <p className="text-sm text-muted-foreground">
              Search by name or username
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
