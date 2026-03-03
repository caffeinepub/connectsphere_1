import { useState, useRef } from 'react';
import { Image, Type, X, Loader2 } from 'lucide-react';
import type { AppPage } from '../App';

interface CreateStoryPageProps {
  navigate: (page: AppPage, params?: Record<string, string>) => void;
}

export default function CreateStoryPage({ navigate }: CreateStoryPageProps) {
  const [mode, setMode] = useState<'image' | 'text'>('image');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (mode === 'image' && !imagePreview) return;
    if (mode === 'text' && !text.trim()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    setIsSubmitting(false);
    navigate('home');
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Mode Toggle */}
      <div className="px-4 py-3 border-b border-border flex gap-2">
        <button
          onClick={() => setMode('image')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            mode === 'image' ? 'gradient-primary text-white' : 'bg-muted text-muted-foreground'
          }`}
        >
          <Image className="w-4 h-4" />
          Photo
        </button>
        <button
          onClick={() => setMode('text')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            mode === 'text' ? 'gradient-primary text-white' : 'bg-muted text-muted-foreground'
          }`}
        >
          <Type className="w-4 h-4" />
          Text
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-4 py-6">
        {mode === 'image' ? (
          <div>
            {imagePreview ? (
              <div className="relative rounded-2xl overflow-hidden">
                <img src={imagePreview} alt="Story preview" className="w-full object-cover max-h-96" />
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-64 rounded-2xl border-2 border-dashed border-border hover:border-primary transition-colors flex flex-col items-center justify-center gap-3 bg-muted/30"
              >
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center">
                  <Image className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-foreground">Tap to add photo</p>
                <p className="text-xs text-muted-foreground">Your story disappears after 24 hours</p>
              </button>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
          </div>
        ) : (
          <div className="rounded-2xl gradient-hero p-6 min-h-64 flex items-center justify-center">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's your story?"
              maxLength={200}
              autoFocus
              className="w-full bg-transparent text-white text-xl font-display font-semibold text-center placeholder:text-white/50 focus:outline-none resize-none leading-relaxed"
              rows={4}
            />
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="px-4 py-4 border-t border-border">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || (mode === 'image' && !imagePreview) || (mode === 'text' && !text.trim())}
          className="w-full py-3.5 rounded-xl gradient-primary text-white font-semibold text-base shadow-glow hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sharing...
            </>
          ) : (
            'Share Story'
          )}
        </button>
      </div>
    </div>
  );
}
