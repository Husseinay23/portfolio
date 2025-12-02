import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import { TypingText } from "../../components/atoms/TypingText";
import { gsap } from "gsap";

export const Home = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isRTL = i18n.language === "ar";
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useEffect(() => {
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll('a');
      gsap.fromTo(buttons,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.2, stagger: 0.1, ease: 'power3.out' }
      );
    }

    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.9, rotation: -5 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1, delay: 0.5, ease: 'elastic.out(1, 0.5)' }
      );
    }
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text with Typing Animation */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`${isRTL ? "md:order-2" : ""}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <h1
                className={`
                text-4xl md:text-6xl lg:text-7xl font-bold mb-4
                ${isDark ? "text-[#DCDCDC]" : "text-gray-900"}
              `}
              >
                {t("home.greeting")}
              </h1>
              <div
                className={`
                text-2xl md:text-3xl lg:text-4xl font-semibold mb-6
                ${isDark ? "text-[#DCDCDC]" : "text-gray-800"}
              `}
              >
                <TypingText
                  text={t("home.name")}
                  speed={150}
                  className={isDark ? "text-[#DCDCDC]" : "text-gray-900"}
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className={`
                  text-xl md:text-2xl mb-8 bg-gradient-to-r from-[#4F7FFF] to-[#FF6B35] bg-clip-text text-transparent font-medium
                `}
              >
                {t("home.title")}
              </motion.p>
            </motion.div>
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-[#4F7FFF] to-[#FF6B35] text-white font-medium hover:shadow-lg hover:shadow-[#4F7FFF]/50 transition-all text-center"
              >
                {t("home.cta")}
              </motion.a>
              <motion.a
                href="/Hussein Ayoub CV.docx"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  inline-block px-8 py-3 rounded-lg font-medium transition-all text-center border-2
                  ${
                    isDark
                      ? "border-[#4F7FFF] text-[#4F7FFF] hover:bg-[#4F7FFF]/10"
                      : "border-[#4F7FFF] text-[#4F7FFF] hover:bg-[#4F7FFF]/10"
                  }
                `}
              >
                {t("home.downloadCV")}
              </motion.a>
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`${isRTL ? "md:order-1" : ""}`}
          >
            <div className="relative">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4F7FFF]/20 to-[#FF6B35]/20 rounded-full blur-3xl" />

              {/* Image Container */}
              <div
                ref={imageRef}
                className="relative z-10"
              >
                <motion.img
                  src={`${import.meta.env.BASE_URL}husseinay.png`}
                  alt="Hussein Ayoub"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover"
                  style={{ objectPosition: "center" }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
