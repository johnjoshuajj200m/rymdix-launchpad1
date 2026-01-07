import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Mail } from "lucide-react";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/config/constants";

interface CalendlyEmbedProps {
  className?: string;
}

// Global flag to ensure script is loaded only once
let calendlyScriptLoaded = false;

export function CalendlyEmbed({ className = "" }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Load Calendly script (only once globally)
  useEffect(() => {
    if (!CALENDLY_URL) return;

    // Check if script already exists
    if (window.Calendly) {
      setIsScriptLoaded(true);
      return;
    }

    // Check if script is already being loaded
    if (calendlyScriptLoaded) {
      // Wait for script to load
      const checkInterval = setInterval(() => {
        if (window.Calendly) {
          setIsScriptLoaded(true);
          clearInterval(checkInterval);
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }

    // Load Calendly script
    calendlyScriptLoaded = true;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    script.onerror = () => {
      setLoadError(true);
      calendlyScriptLoaded = false;
    };
    document.body.appendChild(script);

    return () => {
      // Don't remove script on unmount - keep it for other instances
    };
  }, []);

  // Initialize Calendly widget when script is loaded
  useEffect(() => {
    if (!isScriptLoaded || !CALENDLY_URL || !containerRef.current || !window.Calendly) return;

    try {
      // Clear container first
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }

      // Initialize Calendly inline widget
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: containerRef.current,
      });
    } catch (error) {
      console.error("Error initializing Calendly:", error);
      setLoadError(true);
    }
  }, [isScriptLoaded]);

  // Fallback: Show email button if no Calendly URL
  if (!CALENDLY_URL) {
    return (
      <div className={`rounded-xl border border-dashed border-border bg-secondary/20 p-12 text-center ${className}`}>
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Mail className="h-8 w-8" />
          </div>
        </div>
        <h4 className="mb-2 text-lg font-semibold">Schedule a Call</h4>
        <p className="mb-6 text-sm text-muted-foreground">
          Send us an email to schedule a discovery call at a time that works for you.
        </p>
        <Button
          variant="hero"
          asChild
          className="group"
        >
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Schedule a Discovery Call&body=Hi Rymdix team,%0D%0A%0D%0AI'd like to schedule a discovery call to discuss my project.%0D%0A%0D%0ABest regards`}
          >
            <Calendar className="h-4 w-4" />
            Book via Email
          </a>
        </Button>
      </div>
    );
  }

  // Debug line (development only)
  const isDev = import.meta.env.DEV;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Debug line - development only */}
      {isDev && (
        <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-3 text-xs">
          <strong>DEBUG (dev only):</strong> VITE_CALENDLY_URL = {CALENDLY_URL || "(not set)"}
        </div>
      )}

      {/* Loading state */}
      {!isScriptLoaded && !loadError && (
        <div className="rounded-xl border border-border bg-secondary/20 overflow-hidden">
          <div className="flex min-h-[650px] items-center justify-center p-12">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
              <p className="text-sm text-muted-foreground">Loading calendar...</p>
            </div>
          </div>
        </div>
      )}

      {/* Error state */}
      {loadError && (
        <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-12 text-center">
          <p className="mb-4 text-sm text-destructive">Failed to load calendar widget.</p>
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <a href={`mailto:${CONTACT_EMAIL}?subject=Schedule a Discovery Call`}>
              <Mail className="h-4 w-4" />
              Book via Email Instead
            </a>
          </Button>
        </div>
      )}

      {/* Calendly widget container */}
      {isScriptLoaded && !loadError && (
        <div
          ref={containerRef}
          className="calendly-inline-widget rounded-xl border border-border bg-secondary/20 overflow-hidden"
          style={{ minHeight: "650px", height: "100%" }}
          data-url={CALENDLY_URL}
        />
      )}
    </div>
  );
}

// Extend Window interface for Calendly
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}


