import { Image, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import type { AppPage } from "../App";
import { useGetCallerUserProfile } from "../hooks/useQueries";
import { generateAvatarUrl } from "../lib/mockData";

interface CreatePostPageProps {
  navigate: (page: AppPage, params?: Record<string, string>) => void;
}

export default function CreatePostPage({ navigate }: CreatePostPageProps) {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: userProfile } = useGetCallerUserProfile();

  const avatarSrc =
    userProfile?.avatar ||
    generateAvatarUrl(userProfile?.displayName || "User");

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    // Simulate post creation delay
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    navigate("home");
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 px-4 py-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
            <img
              src={avatarSrc}
              alt="You"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-foreground mb-2">
              {userProfile?.displayName || "You"}
            </p>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={5}
              maxLength={500}
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-base resize-none focus:outline-none leading-relaxed"
            />
            <p className="text-xs text-muted-foreground text-right">
              {content.length}/500
            </p>
          </div>
        </div>

        {imagePreview && (
          <div className="relative mt-3 rounded-2xl overflow-hidden">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full object-cover max-h-64"
            />
            <button
              type="button"
              onClick={() => setImagePreview(null)}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-4 py-3 flex items-center justify-between bg-background">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
          >
            <Image className="w-5 h-5 text-primary" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
          className="px-6 py-2 rounded-full gradient-primary text-white font-semibold text-sm disabled:opacity-50 flex items-center gap-2 transition-all active:scale-95"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Posting...
            </>
          ) : (
            "Post"
          )}
        </button>
      </div>
    </div>
  );
}
