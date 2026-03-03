import { useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import type { AppPage } from '../App';
import type { UserProfile } from '../backend';
import { useSaveCallerUserProfile } from '../hooks/useQueries';

interface EditProfilePageProps {
  navigate: (page: AppPage, params?: Record<string, string>) => void;
  userProfile: UserProfile | null | undefined;
}

export default function EditProfilePage({ navigate, userProfile }: EditProfilePageProps) {
  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [username, setUsername] = useState(userProfile?.name || '');
  const [bio, setBio] = useState(userProfile?.bio || '');
  const [avatarPreview, setAvatarPreview] = useState(userProfile?.avatar || '');
  const { mutateAsync: saveProfile, isPending } = useSaveCallerUserProfile();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim() || !username.trim()) return;
    try {
      await saveProfile({
        displayName: displayName.trim(),
        name: username.trim(),
        bio: bio.trim(),
        avatar: avatarPreview,
      });
      navigate('profile');
    } catch (err) {
      console.error('Failed to save profile:', err);
    }
  };

  return (
    <div className="px-4 py-6">
      <form onSubmit={handleSave} className="space-y-5">
        {/* Avatar */}
        <div className="flex justify-center">
          <label className="relative cursor-pointer group">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-border group-hover:border-primary transition-colors">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full gradient-primary flex items-center justify-center shadow-md">
              <Camera className="w-3.5 h-3.5 text-white" />
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>

        {/* Display Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground transition-all"
            required
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Username</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
              className="w-full pl-8 pr-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground transition-all"
              required
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            maxLength={160}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground resize-none transition-all"
          />
          <p className="text-xs text-muted-foreground text-right mt-1">{bio.length}/160</p>
        </div>

        <button
          type="submit"
          disabled={isPending || !displayName.trim() || !username.trim()}
          className="w-full py-3.5 rounded-xl gradient-primary text-white font-semibold text-base shadow-glow hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </form>
    </div>
  );
}
