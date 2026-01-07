import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
    requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  }
}

export function Analytics() {
  const location = useLocation();
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const isAdminRoute = location.pathname.startsWith("/admin");
  const loadedRef = useRef(false);
  const idleCallbackRef = useRef<number | null>(null);

  // Load GA after first user interaction or idle time
  useEffect(() => {
    // Don't track admin routes
    if (isAdminRoute) return;

    // Only load in production
    if (!import.meta.env.PROD || !GA_MEASUREMENT_ID || loadedRef.current) return;

    const loadAnalytics = () => {
      if (loadedRef.current) return;
      
      // Check if script already loaded
      const existingScript = document.querySelector(
        `script[src*="googletagmanager.com/gtag/js"]`
      );
      if (existingScript) {
        loadedRef.current = true;
        return;
      }

      // Load Google Analytics script
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
      
      loadedRef.current = true;
    };

    // Try to load on first user interaction
    const interactionEvents = ["mousedown", "touchstart", "keydown", "scroll"];
    const handleInteraction = () => {
      loadAnalytics();
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleInteraction, { passive: true });
      });
    };

    interactionEvents.forEach(event => {
      document.addEventListener(event, handleInteraction, { passive: true, once: true });
    });

    // Fallback: load after idle time (2 seconds max wait)
    if (window.requestIdleCallback) {
      idleCallbackRef.current = window.requestIdleCallback(() => {
        loadAnalytics();
      }, { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      const timeoutId = setTimeout(() => {
        loadAnalytics();
      }, 2000);
      
      return () => {
        clearTimeout(timeoutId);
        if (idleCallbackRef.current && window.cancelIdleCallback) {
          window.cancelIdleCallback(idleCallbackRef.current);
        }
        interactionEvents.forEach(event => {
          document.removeEventListener(event, handleInteraction);
        });
      };
    }

    return () => {
      if (idleCallbackRef.current && window.cancelIdleCallback) {
        window.cancelIdleCallback(idleCallbackRef.current);
      }
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, [GA_MEASUREMENT_ID, isAdminRoute]);

  // Track page views on route change (only if GA is loaded)
  useEffect(() => {
    // Don't track admin routes
    if (isAdminRoute) return;

    // Track page views on route change
    if (import.meta.env.PROD && GA_MEASUREMENT_ID && window.gtag && loadedRef.current) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location, GA_MEASUREMENT_ID, isAdminRoute]);

  return null;
}

