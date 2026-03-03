import { useState } from 'react';
import type { AppPage } from '../App';
import StoriesStrip from '../components/StoriesStrip';
import PostCard from '../components/PostCard';
import { SAMPLE_POSTS, type Post } from '../lib/mockData';
import { Layers } from 'lucide-react';

interface HomePageProps {
  navigate: (page: AppPage, params?: Record<string, string>) => void;
}

export default function HomePage({ navigate }: HomePageProps) {
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);

  const handleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const handleDelete = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  return (
    <div className="flex flex-col pb-2">
      {/* Stories section */}
      <div className="bg-card/60 border-b border-border/50">
        <StoriesStrip navigate={navigate} />
      </div>

      {/* Visual divider with label */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-primary/70" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Feed</span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-border via-primary/20 to-transparent" />
      </div>

      {/* Post cards — card-based, not flat continuous scroll */}
      <div className="flex flex-col">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onDelete={handleDelete}
            onComment={(id) => navigate('post-detail', { postId: id })}
          />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="mx-3 mt-2 rounded-3xl bg-card border border-border/60 flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-glow">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="font-display font-semibold text-foreground mb-1">No posts yet</h3>
          <p className="text-muted-foreground text-sm">Be the first to share something!</p>
        </div>
      )}
    </div>
  );
}
