import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Copy, ExternalLink, Check } from "lucide-react";
import { toast } from "sonner";
import { GOOGLE_CALENDAR_BOOKING_URL } from "@/config/constants";

interface GoogleCalendarBookingProps {
  className?: string;
}

export function GoogleCalendarBooking({ className = "" }: GoogleCalendarBookingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // IntersectionObserver to lazy-load iframe when section scrolls into view (desktop only)
  useEffect(() => {
    if (!containerRef.current || isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "200px", // Start loading 200px before entering viewport
        threshold: 0.1,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, isMobile]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(GOOGLE_CALENDAR_BOOKING_URL);
      setLinkCopied(true);
      toast.success("Link copied to clipboard", {
        duration: 2000,
      });
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error("Failed to copy link", {
        duration: 2000,
      });
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="hero"
          size="lg"
          className="group flex-1"
          asChild
        >
          <a
            href={GOOGLE_CALENDAR_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Calendar className="h-4 w-4" />
            Book a Call
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={handleCopyLink}
          className="group"
        >
          {linkCopied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Link
            </>
          )}
        </Button>
      </div>

      {/* Mobile Note */}
      {isMobile && (
        <p className="text-xs text-muted-foreground text-center">
          Opens in a new tab
        </p>
      )}

      {/* Desktop Iframe Embed (lazy-loaded) */}
      {!isMobile && (
        <div
          ref={containerRef}
          className="rounded-xl border border-border bg-secondary/20 overflow-hidden"
        >
          {!isVisible ? (
            // Preview card before iframe loads
            <div className="flex min-h-[720px] items-center justify-center p-12">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Calendar className="h-8 w-8" />
                  </div>
                </div>
                <h4 className="text-lg font-semibold">Booking Calendar</h4>
                <p className="text-sm text-muted-foreground max-w-md">
                  Scroll down to view the calendar, or use the buttons above to book directly.
                </p>
              </div>
            </div>
          ) : !isIframeLoaded ? (
            // Loading skeleton
            <div className="flex min-h-[720px] items-center justify-center p-12">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
                <p className="text-sm text-muted-foreground">Loading calendar...</p>
              </div>
            </div>
          ) : null}
          
          {/* Iframe (only render when visible) */}
          {isVisible && (
            <iframe
              ref={iframeRef}
              src={GOOGLE_CALENDAR_BOOKING_URL}
              width="100%"
              height="720"
              frameBorder="0"
              title="Book a call with Rymdix"
              className="w-full"
              style={{ minHeight: "720px" }}
              onLoad={() => setIsIframeLoaded(true)}
              loading="lazy"
            />
          )}
        </div>
      )}
    </div>
  );
}

