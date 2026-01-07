import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

export function Analytics() {
  const location = useLocation();
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    // Don't track admin routes
    if (isAdminRoute) return;

    // Only load in production
    if (import.meta.env.PROD && GA_MEASUREMENT_ID) {
      // Check if script already loaded
      const existingScript = document.querySelector(
        `script[src*="googletagmanager.com/gtag/js"]`
      );
      if (existingScript) return;

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
    }
  }, [GA_MEASUREMENT_ID, isAdminRoute]);

  useEffect(() => {
    // Don't track admin routes
    if (isAdminRoute) return;

    // Track page views on route change
    if (import.meta.env.PROD && GA_MEASUREMENT_ID && window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location, GA_MEASUREMENT_ID, isAdminRoute]);

  return null;
}

