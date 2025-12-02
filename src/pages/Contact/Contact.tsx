import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import { Turnstile } from "../../components/molecules/Turnstile";

export const Contact = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isRTL = i18n.language === "ar";

  // Cloudflare Turnstile site key from environment
  const turnstileSiteKey =
    import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || "";

  // WhatsApp verification state
  const [isWhatsAppVerified, setIsWhatsAppVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "verifying" | "verified" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Debug: Log site key status (remove in production if needed)
  useEffect(() => {
    if (!turnstileSiteKey) {
      console.warn(
        "Turnstile site key not found. Please set VITE_CLOUDFLARE_TURNSTILE_SITE_KEY"
      );
    }
  }, [turnstileSiteKey]);

  const whatsappUrl = "https://wa.me/96178904118";

  const handleTurnstileVerify = async (token: string) => {
    setVerificationStatus("verifying");
    setErrorMessage("");

    try {
      // For static sites, we trust the client-side verification
      // The token itself proves the user is human
      if (!token) {
        throw new Error("No token received from Turnstile");
      }

      // Small delay for UX
      await new Promise((resolve) => setTimeout(resolve, 300));

      setIsWhatsAppVerified(true);
      setVerificationStatus("verified");

      // Store verification in sessionStorage
      sessionStorage.setItem("whatsapp_verified", "true");
      sessionStorage.setItem("whatsapp_token", token);

      console.log("WhatsApp verification successful");
    } catch (error) {
      console.error("Turnstile verification error:", error);
      setVerificationStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Verification failed"
      );
      setIsWhatsAppVerified(false);
    }
  };

  const handleTurnstileError = () => {
    setVerificationStatus("error");
    setErrorMessage(
      "Failed to load verification. Please refresh the page and try again."
    );
    setIsWhatsAppVerified(false);
    console.error("Turnstile error occurred");
  };

  const handleTurnstileExpire = () => {
    setVerificationStatus("idle");
    setIsWhatsAppVerified(false);
    sessionStorage.removeItem("whatsapp_verified");
    sessionStorage.removeItem("whatsapp_token");
  };

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isWhatsAppVerified) {
      e.preventDefault();
    }
  };

  // Check if already verified in this session
  useEffect(() => {
    const wasVerified = sessionStorage.getItem("whatsapp_verified");
    if (wasVerified === "true") {
      setIsWhatsAppVerified(true);
      setVerificationStatus("verified");
    }
  }, []);

  const socialLinks = [
    {
      name: "GitHub",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      url: "https://github.com/Husseinay23",
      color: isDark ? "hover:text-white" : "hover:text-gray-900",
      protected: false,
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      url: "https://www.linkedin.com/in/hussein-ayoub-b4baa1317/",
      color: isDark ? "hover:text-[#0077b5]" : "hover:text-[#0077b5]",
      protected: false,
    },
    {
      name: "WhatsApp",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      url: whatsappUrl,
      color: isDark ? "hover:text-[#25D366]" : "hover:text-[#25D366]",
      protected: true,
    },
    {
      name: "Instagram",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      url: "https://www.instagram.com/husseinay23?igsh=am9mYW1jYnVpN3Fh&utm_source=qr",
      color: isDark ? "hover:text-[#E4405F]" : "hover:text-[#E4405F]",
      protected: false,
    },
  ];

  return (
    <section id="contact" className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2
            className={`
            text-4xl md:text-5xl font-bold mb-4
            ${isDark ? "text-[#DCDCDC]" : "text-gray-900"}
          `}
          >
            {t("contact.title")}
          </h2>
          <p
            className={`
            text-xl mb-2
            ${isDark ? "text-[#4F7FFF]" : "text-[#4F7FFF]"}
          `}
          >
            {t("contact.subtitle")}
          </p>
          <p
            className={`
            text-lg max-w-3xl mx-auto mt-4
            ${isDark ? "text-gray-400" : "text-gray-600"}
          `}
          >
            {t("contact.description")}
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h3
            className={`
            text-2xl font-bold mb-8 text-center
            ${isDark ? "text-[#DCDCDC]" : "text-gray-900"}
          `}
          >
            {t("contact.social.title")}
          </h3>
          <div className="space-y-4">
            {socialLinks.map((social) => (
              <div key={social.name}>
                {social.protected && !isWhatsAppVerified ? (
                  <div
                    className={`
                      p-6 rounded-lg border
                      ${
                        isDark
                          ? "bg-[#16181C] border-white/10 text-gray-400"
                          : "bg-gray-50 border-gray-200 text-gray-600"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {social.icon}
                      <span className="font-medium">
                        {t(`contact.social.${social.name.toLowerCase()}`)}
                      </span>
                    </div>
                    <p className="mb-4 text-sm text-center">
                      {t("contact.info.verifyPrompt")}
                    </p>

                    {turnstileSiteKey ? (
                      <div className="flex flex-col items-center gap-4">
                        <Turnstile
                          siteKey={turnstileSiteKey}
                          onVerify={handleTurnstileVerify}
                          onError={handleTurnstileError}
                          onExpire={handleTurnstileExpire}
                        />
                        {verificationStatus === "verifying" && (
                          <p className="text-sm">
                            {t("contact.info.verifying")}
                          </p>
                        )}
                        {verificationStatus === "error" && (
                          <div className="text-center">
                            <p
                              className={`text-sm ${
                                isDark ? "text-red-400" : "text-red-600"
                              }`}
                            >
                              {errorMessage || t("contact.info.error")}
                            </p>
                            <button
                              onClick={() => {
                                setVerificationStatus("idle");
                                setErrorMessage("");
                                setIsWhatsAppVerified(false);
                                window.location.reload();
                              }}
                              className={`mt-2 text-xs underline ${
                                isDark ? "text-red-300" : "text-red-500"
                              }`}
                            >
                              Try Again
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        className={`
                          text-sm text-center p-4 rounded
                          ${
                            isDark
                              ? "bg-red-500/10 text-red-400 border border-red-500/30"
                              : "bg-red-50 text-red-600 border border-red-200"
                          }
                        `}
                      >
                        <p className="mb-2">
                          Turnstile site key not configured.
                        </p>
                        <p className="text-xs">
                          Please set VITE_CLOUDFLARE_TURNSTILE_SITE_KEY in your
                          environment variables or .env file.
                        </p>
                        <p className="text-xs mt-2 opacity-75">
                          For GitHub Pages: Add it as a repository secret and
                          set it in your build workflow.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <motion.a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={social.protected ? handleWhatsAppClick : undefined}
                    whileHover={{ x: isRTL ? -10 : 10, scale: 1.05 }}
                    className={`
                      flex items-center gap-4 p-4 rounded-lg border transition-all
                      ${
                        isDark
                          ? "bg-[#16181C] border-white/10 text-gray-400 hover:border-[#4F7FFF]/50"
                          : "bg-gray-50 border-gray-200 text-gray-600 hover:border-[#4F7FFF]/50"
                      }
                      ${social.color}
                    `}
                  >
                    {social.icon}
                    <span className="font-medium">
                      {t(`contact.social.${social.name.toLowerCase()}`)}
                    </span>
                  </motion.a>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
