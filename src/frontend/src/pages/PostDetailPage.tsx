import { Heart, Send, Trash2 } from "lucide-react";
import { useState } from "react";
import type { AppPage } from "../App";
import { useGetCallerUserProfile } from "../hooks/useQueries";
import {
  type Comment,
  SAMPLE_POSTS,
  formatRelativeTime,
  generateAvatarUrl,
} from "../lib/mockData";

interface PostDetailPageProps {
  navigate: (page: AppPage, params?: Record<string, string>) => void;
  postId: string;
}

const SAMPLE_COMMENTS: Comment[] = [
  {
    id: "1",
    authorName: "Maya Chen",
    authorUsername: "mayachen",
    authorAvatar: generateAvatarUrl("Maya Chen"),
    content: "This is absolutely amazing! 🔥",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    isOwn: false,
  },
  {
    id: "2",
    authorName: "Jordan Kim",
    authorUsername: "jordankim",
    authorAvatar: generateAvatarUrl("Jordan Kim"),
    content: "Love this! Keep it up 💪",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    isOwn: false,
  },
];

export default function PostDetailPage({ postId }: PostDetailPageProps) {
  const post = SAMPLE_POSTS.find((p) => p.id === postId) || SAMPLE_POSTS[0];
  const [comments, setComments] = useState<Comment[]>(SAMPLE_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const { data: userProfile } = useGetCallerUserProfile();

  const myAvatar =
    userProfile?.avatar || generateAvatarUrl(userProfile?.displayName || "You");

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      authorName: userProfile?.displayName || "You",
      authorUsername: userProfile?.name || "you",
      authorAvatar: myAvatar,
      content: newComment.trim(),
      timestamp: new Date(),
      isOwn: true,
    };
    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  };

  const handleDeleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Post */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={post.authorAvatar}
            alt={post.authorName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm text-foreground">
              {post.authorName}
            </p>
            <p className="text-xs text-muted-foreground">
              @{post.authorUsername} · {formatRelativeTime(post.timestamp)}
            </p>
          </div>
        </div>
        <p className="text-foreground text-sm leading-relaxed mb-3">
          {post.content}
        </p>
        {post.imageUrl && (
          <div className="rounded-2xl overflow-hidden mb-3">
            <img
              src={post.imageUrl}
              alt="Post"
              className="w-full object-cover"
            />
          </div>
        )}
        <button
          type="button"
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm transition-all active:scale-90 ${liked ? "text-red-500" : "text-muted-foreground"}`}
        >
          <Heart
            className={`${liked ? "fill-current" : ""}`}
            style={{ width: "18px", height: "18px" }}
          />
          <span>{likeCount} likes</span>
        </button>
      </div>

      {/* Comments */}
      <div className="flex-1 px-4 py-3 space-y-4">
        <h3 className="font-semibold text-sm text-foreground">
          Comments ({comments.length})
        </h3>
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <img
              src={comment.authorAvatar}
              alt={comment.authorName}
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
            <div className="flex-1 bg-muted rounded-2xl px-3 py-2">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-semibold text-xs text-foreground">
                  {comment.authorName}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">
                    {formatRelativeTime(comment.timestamp)}
                  </span>
                  {comment.isOwn && (
                    <button
                      type="button"
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 style={{ width: "12px", height: "12px" }} />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm text-foreground">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Input */}
      <div className="border-t border-border px-4 py-3 flex items-center gap-3 bg-background">
        <img
          src={myAvatar}
          alt="You"
          className="w-8 h-8 rounded-full object-cover shrink-0"
        />
        <div className="flex-1 flex items-center gap-2 bg-muted rounded-full px-4 py-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
            placeholder="Add a comment..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="text-primary disabled:text-muted-foreground transition-colors"
          >
            <Send style={{ width: "16px", height: "16px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
