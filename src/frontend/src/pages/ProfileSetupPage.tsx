import { Camera, Loader2 } from "lucide-react";
import { useState } from "react";
import type { UserProfile } from "../backend";
import { useSaveCallerUserProfile } from "../hooks/useQueries";

interface ProfileSetupPageProps {
  onComplete: () => void;
}

export default function ProfileSetupPage({
  onComplete,
}: ProfileSetupPageProps) {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const { mutateAsync: saveProfile, isPending } = useSaveCallerUserProfile();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatarPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim() || !username.trim()) return;

    const profile: UserProfile = {
      displayName: displayName.trim(),
      name: username.trim(),
      bio: bio.trim(),
      avatar: avatarPreview || "",
    };

    try {
      await saveProfile(profile);
      onComplete();
    } catch (err) {
      console.error("Failed to save profile:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src="/assets/generated/connectsphere-logo.dim_256x256.png"
            alt="ConnectSphere"
            className="w-14 h-14 rounded-2xl mx-auto mb-4"
          />
          <h1 className="font-display font-bold text-2xl text-foreground mb-1">
            Set up your profile
          </h1>
          <p className="text-muted-foreground text-sm">
            Tell the world who you are
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Upload */}
          <div className="flex justify-center">
            <label className="relative cursor-pointer group">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-dashed border-border group-hover:border-primary transition-colors flex items-center justify-center">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full gradient-primary flex items-center justify-center shadow-md">
                <Camera className="w-3.5 h-3.5 text-white" />
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          {/* Display Name */}
          <div>
            <label
              htmlFor="setup-display-name"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Display Name <span className="text-destructive">*</span>
            </label>
            <input
              id="setup-display-name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground placeholder:text-muted-foreground transition-all"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="setup-username"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Username <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                @
              </span>
              <input
                id="setup-username"
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""),
                  )
                }
                placeholder="username"
                className="w-full pl-8 pr-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground placeholder:text-muted-foreground transition-all"
                required
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="setup-bio"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Bio
            </label>
            <textarea
              id="setup-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={3}
              maxLength={160}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground placeholder:text-muted-foreground transition-all resize-none"
            />
            <p className="text-xs text-muted-foreground text-right mt-1">
              {bio.length}/160
            </p>
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
              "Complete Setup"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
