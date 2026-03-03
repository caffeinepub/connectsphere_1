import { Trash2, X } from "lucide-react";
import type { AppPage } from "../App";
import { SAMPLE_STORIES, formatRelativeTime } from "../lib/mockData";

interface StoryViewerPageProps {
  navigate: (page: AppPage, params?: Record<string, string>) => void;
  storyId: string;
}

export default function StoryViewerPage({
  navigate,
  storyId,
}: StoryViewerPageProps) {
  const story =
    SAMPLE_STORIES.find((s) => s.id === storyId) || SAMPLE_STORIES[0];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col max-w-md mx-auto">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 px-2 pt-2">
        <div className="h-0.5 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full animate-[progress_5s_linear_forwards]"
            style={{
              width: "100%",
              animation: "none",
              transform: "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 5s linear",
            }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="absolute top-4 left-0 right-0 z-10 flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-2">
          <img
            src={story.authorAvatar}
            alt={story.authorName}
            className="w-8 h-8 rounded-full border-2 border-white object-cover"
          />
          <div>
            <p className="text-white font-semibold text-sm">
              {story.authorName}
            </p>
            <p className="text-white/70 text-xs">
              {formatRelativeTime(story.timestamp)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {story.isOwn && (
            <button type="button" className="p-2 rounded-full bg-black/30">
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate("home")}
            className="p-2 rounded-full bg-black/30"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Story Content */}
      <div className="flex-1 flex items-center justify-center">
        {story.imageUrl ? (
          <img
            src={story.imageUrl}
            alt="Story"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full gradient-hero flex items-center justify-center px-8">
            <p className="text-white text-2xl font-display font-bold text-center leading-relaxed">
              {story.text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
