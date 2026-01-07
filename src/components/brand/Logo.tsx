import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";

interface LogoProps {
  variant?: "default" | "compact" | "icon-only";
  className?: string;
  showLink?: boolean;
}

export function Logo({ variant = "default", className = "", showLink = true }: LogoProps) {
  const logoContent = (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Rocket Icon */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20">
        <Rocket className="h-4 w-4 text-white" strokeWidth={2.5} />
      </div>
      
      {/* Wordmark */}
      {variant !== "icon-only" && (
        <span className={`font-semibold tracking-tight text-foreground ${
          variant === "compact" ? "text-base" : "text-lg"
        }`}>
          Rymdix
        </span>
      )}
    </div>
  );

  if (showLink) {
    return (
      <Link to="/" className="transition-opacity hover:opacity-80">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}


