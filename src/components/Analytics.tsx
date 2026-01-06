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

  useEffect(() => {
    // Only load in production
    if (import.meta.env.PROD && GA_MEASUREMENT_ID) {
      // Load Google Analytics script
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script1);

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
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (import.meta.env.PROD && GA_MEASUREMENT_ID && window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location, GA_MEASUREMENT_ID]);

  return null;
}

