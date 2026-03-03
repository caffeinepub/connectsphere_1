import { Edit2, Heart, MessageCircle, Share2, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Post } from "../lib/mockData";
import { formatRelativeTime } from "../lib/mockData";

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
  onDelete: (id: string) => void;
  onComment: (id: string) => void;
}

export default function PostCard({
  post,
  onLike,
  onDelete,
  onComment,
}: PostCardProps) {
  const [shared, setShared] = useState(false);

  const handleShare = () => {
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <article
      className={`mx-3 my-2.5 rounded-3xl overflow-hidden bg-card shadow-card border border-border/60 transition-shadow hover:shadow-card-hover ${post.imageUrl ? "" : "border-l-4 border-l-primary/70"}`}
    >
      {/* Image — contained within card, not full-bleed */}
      {post.imageUrl && (
        <div className="mx-3 mt-3 rounded-2xl overflow-hidden bg-muted">
          <img
            src={post.imageUrl}
            alt="Post"
            className="w-full object-cover max-h-64"
            loading="lazy"
          />
        </div>
      )}

      {/* Text Content */}
      <div className="px-4 pt-3 pb-2">
        <p className="text-sm text-foreground leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-border/50" />

      {/* Author Row + Actions */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Author info — compact inline */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-xl overflow-hidden shrink-0 ring-1 ring-border">
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <span className="font-semibold text-xs text-foreground truncate block leading-tight">
              {post.authorName}
            </span>
            <span className="text-[10px] text-muted-foreground truncate block leading-tight">
              @{post.authorUsername} · {formatRelativeTime(post.timestamp)}
            </span>
          </div>
        </div>

        {/* Action pills */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Like pill */}
          <button
            type="button"
            onClick={() => onLike(post.id)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 active:scale-90 ${
              post.liked
                ? "bg-red-500/15 text-red-500 border border-red-500/30"
                : "bg-muted text-muted-foreground hover:bg-red-500/10 hover:text-red-500 border border-transparent"
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${post.liked ? "fill-current" : ""}`}
            />
            <span>{post.likes}</span>
          </button>

          {/* Comment pill */}
          <button
            type="button"
            onClick={() => onComment(post.id)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary border border-transparent transition-all duration-200"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{post.comments}</span>
          </button>

          {/* Share pill */}
          <button
            type="button"
            onClick={handleShare}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border border-transparent transition-all duration-200 ${
              shared
                ? "bg-primary/15 text-primary border-primary/30"
                : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          {/* Owner actions — inline icon buttons */}
          {post.isOwn && (
            <>
              <button
                type="button"
                className="flex items-center justify-center w-7 h-7 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                <Edit2 className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(post.id)}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
