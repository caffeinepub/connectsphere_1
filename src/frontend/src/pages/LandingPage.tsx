import { ArrowRight, Bell, Loader2, Moon, Users, Zap } from "lucide-react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const FEATURES = [
  { icon: Zap, label: "Share moments instantly", color: "text-yellow-400" },
  { icon: Users, label: "Connect with creators", color: "text-blue-400" },
  { icon: Bell, label: "Real-time notifications", color: "text-green-400" },
  {
    icon: Moon,
    label: "Beautiful dark & light themes",
    color: "text-purple-400",
  },
];

export default function LandingPage() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      {/* Asymmetric split layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* LEFT / TOP panel — branding zone */}
        <div
          className="relative flex flex-col justify-center items-start px-8 py-14 lg:w-1/2 overflow-hidden"
          style={{
            backgroundImage: `url('/assets/generated/connectsphere-hero-bg.dim_1200x800.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/55" />
          {/* Angled clip on right edge (desktop) */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{ clipPath: "polygon(0 0, 92% 0, 100% 100%, 0 100%)" }}
          />

          <div className="relative z-10 max-w-xs animate-fade-in">
            {/* Logo */}
            <div className="mb-6 flex items-center gap-3">
              <img
                src="/assets/generated/connectsphere-logo.dim_256x256.png"
                alt="ConnectSphere"
                className="w-14 h-14 rounded-2xl shadow-2xl"
              />
              <div>
                <h1 className="font-display font-extrabold text-3xl text-white leading-none">
                  Connect
                  <span
                    className="gradient-text"
                    style={{
                      WebkitTextFillColor: "transparent",
                      background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
                      WebkitBackgroundClip: "text",
                    }}
                  >
                    Sphere
                  </span>
                </h1>
                <p className="text-white/60 text-xs font-medium tracking-widest uppercase mt-0.5">
                  Your world, connected
                </p>
              </div>
            </div>

            <p className="text-white/80 text-lg font-light leading-relaxed mb-2">
              A social space built for{" "}
              <span className="text-white font-semibold">real connections</span>
              , not just followers.
            </p>
          </div>
        </div>

        {/* RIGHT / BOTTOM panel — CTA zone */}
        <div className="flex flex-col justify-center px-8 py-12 lg:w-1/2 bg-background">
          <div className="max-w-sm mx-auto w-full animate-slide-up">
            {/* Feature highlights */}
            <div className="mb-8 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                What's inside
              </p>
              {FEATURES.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50 border border-border/50"
                >
                  <div className="w-8 h-8 rounded-xl bg-card flex items-center justify-center shrink-0 shadow-xs">
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <span className="text-sm text-foreground font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Distinctive CTA — chamfered / arrow-suffix style */}
            <button
              type="button"
              onClick={login}
              disabled={isLoggingIn}
              className="group w-full py-4 px-6 gradient-primary text-white font-bold text-base shadow-glow hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 flex items-center justify-between gap-2"
              style={{ borderRadius: "4px 20px 4px 20px" }}
            >
              <span>
                {isLoggingIn ? "Signing in..." : "Get Started — It's Free"}
              </span>
              {isLoggingIn ? (
                <Loader2 className="w-5 h-5 animate-spin shrink-0" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform duration-200">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              )}
            </button>

            <p className="mt-3 text-muted-foreground text-xs text-center">
              Secure sign-in · No password needed
              <br />
              Supports Google, Apple &amp; Microsoft accounts
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-4 px-6 text-center">
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} ConnectSphere. Built with{" "}
          <span className="text-red-500">♥</span> using{" "}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || "connectsphere")}`}
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
