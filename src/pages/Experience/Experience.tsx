import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";

export const Experience = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isRTL = i18n.language === "ar";

  const experiences = [
    {
      title: t("experience.harmonically.title"),
      company: t("experience.harmonically.company"),
      location: t("experience.harmonically.location"),
      period: t("experience.harmonically.period"),
      description: t("experience.harmonically.description"),
      link: "https://harmonicallylabs.com/en",
      current: true,
    },
    {
      title: t("experience.united.title"),
      company: t("experience.united.company"),
      location: t("experience.united.location"),
      period: t("experience.united.period"),
      description: t("experience.united.description"),
      link: "#",
      current: false,
    },
    {
      title: t("experience.oscar.title"),
      company: t("experience.oscar.company"),
      location: t("experience.oscar.location"),
      period: t("experience.oscar.period"),
      description: t("experience.oscar.description"),
      link: "#",
      current: false,
    },
  ];

  return (
    <section id="experience" className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {t("experience.title")}
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div
              className={`
              absolute left-8 top-0 bottom-0 w-0.5
              ${isDark ? "bg-[#4F7FFF]/30" : "bg-[#4F7FFF]/20"}
            `}
            />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative mb-12 pl-20"
              >
                {/* Timeline dot */}
                <div
                  className={`
                  absolute left-6 top-2 w-4 h-4 rounded-full border-4
                  ${
                    isDark
                      ? "bg-[#0B0C0E] border-[#4F7FFF]"
                      : "bg-white border-[#4F7FFF]"
                  }
                `}
                />

                {/* Content Card */}
                <div
                  className={`
                  p-6 rounded-xl border transition-all
                  ${
                    isDark
                      ? "bg-[#16181C] border-white/10 hover:border-[#4F7FFF]/50"
                      : "bg-white border-gray-200 hover:border-[#4F7FFF]/50"
                  }
                `}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3
                        className={`
                        text-xl font-bold mb-1
                        ${isDark ? "text-[#DCDCDC]" : "text-gray-900"}
                      `}
                      >
                        {exp.title}
                      </h3>
                      <div className="mb-2">
                        <div
                          className={`
                            text-lg font-semibold
                            ${isDark ? "text-[#4F7FFF]" : "text-[#4F7FFF]"}
                          `}
                        >
                          {exp.company}
                        </div>
                        {exp.location && (
                          <div
                            className={`
                              text-sm
                              ${isDark ? "text-gray-400" : "text-gray-500"}
                            `}
                          >
                            {exp.location}
                          </div>
                        )}
                      </div>
                    </div>
                    {exp.current && (
                      <span
                        className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${
                          isDark
                            ? "bg-[#4F7FFF]/20 text-[#4F7FFF]"
                            : "bg-[#4F7FFF]/10 text-[#4F7FFF]"
                        }
                      `}
                      >
                        {t("experience.current")}
                      </span>
                    )}
                  </div>
                  <p
                    className={`
                    text-sm mb-3
                    ${isDark ? "text-gray-400" : "text-gray-600"}
                  `}
                  >
                    {exp.period}
                  </p>
                  <p
                    className={`
                    text-base leading-relaxed
                    ${isDark ? "text-gray-300" : "text-gray-700"}
                  `}
                  >
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
