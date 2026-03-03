import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import type { AppPage } from '../App';
import { SAMPLE_STORIES } from '../lib/mockData';

interface StoriesStripProps {
  navigate: (page: AppPage, params?: Record<string, string>) => void;
}

export default function StoriesStrip({ navigate }: StoriesStripProps) {
  const [stories] = useState(SAMPLE_STORIES);

  return (
    <div className="px-3 py-3">
      <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
        {/* Add Story Card */}
        <button
          onClick={() => navigate('create-story')}
          className="shrink-0 flex flex-col items-center gap-1.5 group"
        >
          <div className="w-16 h-20 rounded-2xl bg-muted border-2 border-dashed border-primary/40 flex flex-col items-center justify-center gap-1 hover:border-primary hover:bg-primary/5 transition-all duration-200 group-hover:scale-105">
            <div className="w-7 h-7 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <Sparkles className="w-3 h-3 text-primary/60" />
          </div>
          <span className="text-[10px] text-primary font-semibold w-16 text-center truncate">
            Add Story
          </span>
        </button>

        {/* Story Cards — rectangular pill shape */}
        {stories.map(story => (
          <button
            key={story.id}
            onClick={() => navigate('story-viewer', { storyId: story.id })}
            className="shrink-0 flex flex-col items-center gap-1.5 group"
          >
            <div className="relative w-16 h-20 rounded-2xl overflow-hidden shadow-card group-hover:shadow-card-hover group-hover:scale-105 transition-all duration-200">
              {/* Thumbnail */}
              <img
                src={story.authorAvatar}
                alt={story.authorName}
                className="w-full h-full object-cover"
              />
              {/* Unseen gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Unseen indicator — glowing top bar */}
              <div className="absolute top-0 left-0 right-0 h-1 gradient-primary rounded-t-2xl" />
              {/* Author initial badge */}
              <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-lg gradient-primary flex items-center justify-center shadow-sm">
                <span className="text-[8px] text-white font-bold">
                  {story.authorName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <span className="text-[10px] text-foreground font-medium w-16 text-center truncate">
              {story.authorName.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
