import { Camera, Edit2, Heart, LayoutGrid, Zap } from 'lucide-react';
import type { AppPage } from '../App';
import type { UserProfile } from '../backend';
import { generateAvatarUrl, SAMPLE_POSTS } from '../lib/mockData';
import ThemeToggle from '../components/ThemeToggle';

interface ProfilePageProps {
  navigate: (page: AppPage, params?: Record<string, string>) => void;
  userProfile: UserProfile | null | undefined;
}

export default function ProfilePage({ navigate, userProfile }: ProfilePageProps) {
  const displayName = userProfile?.displayName || 'User';
  const username = userProfile?.name || 'user';
  const bio = userProfile?.bio || '';
  const avatarSrc = userProfile?.avatar || generateAvatarUrl(displayName);

  const myPosts = SAMPLE_POSTS.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero banner */}
      <div className="relative h-28 gradient-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 80%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        <div className="absolute top-3 right-3">
          <ThemeToggle />
        </div>
      </div>

      {/* Avatar — overlapping the banner */}
      <div className="px-4 pb-4">
        <div className="flex items-end justify-between -mt-10 mb-3">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-background shadow-card">
              <img
                src={userProfile?.avatar || avatarSrc}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online badge */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg gradient-primary border-2 border-background flex items-center justify-center">
              <Zap className="w-2.5 h-2.5 text-white" />
            </div>
          </div>

          {/* Edit button — top right of avatar row */}
          <button
            onClick={() => navigate('edit-profile')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl border-2 border-primary/50 text-primary text-sm font-semibold hover:bg-primary/10 transition-all duration-200"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit
          </button>
        </div>

        {/* Name & Bio */}
        <div className="mb-4">
          <h2 className="font-display font-bold text-xl text-foreground leading-tight">{displayName}</h2>
          <p className="text-sm text-primary/80 font-medium">@{username}</p>
          {bio && <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{bio}</p>}
        </div>

        {/* Stats — large typographic counters in a horizontal band */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { value: myPosts.length, label: 'Posts', icon: '📸' },
            { value: 248, label: 'Followers', icon: '👥' },
            { value: 183, label: 'Following', icon: '✨' },
          ].map(({ value, label, icon }) => (
            <div key={label} className="flex flex-col items-center py-3 px-2 rounded-2xl bg-muted/60 border border-border/50">
              <span className="text-lg mb-0.5">{icon}</span>
              <p className="font-display font-extrabold text-2xl text-foreground leading-none">{value}</p>
              <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Full-width gradient Edit Profile CTA */}
        <button
          onClick={() => navigate('edit-profile')}
          className="w-full py-3 rounded-2xl gradient-primary text-white font-semibold text-sm shadow-glow hover:opacity-90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      {/* Posts Grid — 2-column asymmetric masonry-style */}
      <div className="border-t border-border/50">
        {/* Tab bar */}
        <div className="flex border-b border-border/50">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-primary border-b-2 border-primary">
            <LayoutGrid className="w-4 h-4" />
            Posts
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
            <Heart className="w-4 h-4" />
            Liked
          </button>
        </div>

        {myPosts.length > 0 ? (
          /* 2-column asymmetric grid */
          <div className="p-3 grid grid-cols-2 gap-2">
            {myPosts.map((post, index) => {
              // Alternate tall/short for asymmetric feel
              const isTall = index % 3 === 0;
              return (
                <div
                  key={post.id}
                  className={`rounded-2xl overflow-hidden bg-muted border border-border/40 ${isTall ? 'row-span-2' : ''}`}
                  style={{ aspectRatio: isTall ? '3/4' : '1/1' }}
                >
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt="Post" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-3 bg-gradient-to-br from-primary/10 to-primary/5">
                      <p className="text-xs text-foreground text-center line-clamp-5 leading-tight">{post.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center px-6">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-glow">
              <Camera className="w-7 h-7 text-white" />
            </div>
            <p className="font-semibold text-foreground mb-1">No posts yet</p>
            <p className="text-sm text-muted-foreground">Share your first moment!</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-6 px-4 text-center border-t border-border mt-4">
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} ConnectSphere. Built with{' '}
          <span className="text-red-500">♥</span> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'connectsphere')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
