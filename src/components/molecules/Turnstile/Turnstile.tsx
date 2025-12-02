import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

declare global {
  interface Window {
    turnstile: {
      render: (
        element: HTMLElement | string,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

export const Turnstile = ({
  siteKey,
  onVerify,
  onError,
  onExpire,
}: TurnstileProps) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if script already exists
    if (document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]')) {
      setIsLoaded(true);
      return;
    }

    // Load Turnstile script
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      console.error("Failed to load Turnstile script");
      if (onError) {
        onError();
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script and widget
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {
          console.warn("Failed to remove Turnstile widget:", e);
        }
      }
      // Don't remove script as it might be needed by other widgets
    };
  }, [onError]);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) {
      return;
    }

    // Wait for turnstile to be available
    if (!window.turnstile) {
      const checkInterval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(checkInterval);
          renderWidget();
        }
      }, 100);

      const timeout = setTimeout(() => {
        clearInterval(checkInterval);
        console.error("Turnstile API failed to load");
        if (onError) {
          onError();
        }
      }, 10000); // 10 second timeout

      return () => {
        clearInterval(checkInterval);
        clearTimeout(timeout);
      };
    } else {
      renderWidget();
    }

    function renderWidget() {
      if (!containerRef.current || !window.turnstile || !siteKey) {
        if (!siteKey) {
          console.error("Turnstile site key is missing");
          if (onError) {
            onError();
          }
        }
        return;
      }

      // Clean up existing widget
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch (e) {
          console.warn("Failed to remove existing Turnstile widget:", e);
        }
      }

      // Render Turnstile widget
      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            if (token) {
              onVerify(token);
            }
          },
          "error-callback": () => {
            console.error("Turnstile error callback triggered");
            if (onError) {
              onError();
            }
          },
          "expired-callback": () => {
            console.log("Turnstile token expired");
            if (onExpire) {
              onExpire();
            }
          },
          theme: theme === "dark" ? "dark" : "light",
          size: "normal",
        });
      } catch (error) {
        console.error("Failed to render Turnstile widget:", error);
        if (onError) {
          onError();
        }
      }
    }
  }, [isLoaded, siteKey, theme, onVerify, onError, onExpire]);

  return <div ref={containerRef} className="turnstile-container" />;
};
