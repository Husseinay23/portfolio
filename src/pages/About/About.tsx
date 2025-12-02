import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

export const About = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isRTL = i18n.language === 'ar';

  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'System Architecture', level: 80 },
  ];

  return (
    <section id="about" className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className={`
            text-4xl md:text-5xl font-bold mb-4
            ${isDark ? 'text-white' : 'text-gray-900'}
          `}>
            {t('about.title')}
          </h2>
          <p className={`
            text-xl mb-2
            ${isDark ? 'text-[#4F7FFF]' : 'text-[#4F7FFF]'}
          `}>
            {t('about.subtitle')}
          </p>
          <p className={`
            text-lg max-w-3xl mx-auto mt-4
            ${isDark ? 'text-gray-400' : 'text-gray-600'}
          `}>
            {t('about.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className={`
              text-2xl font-bold mb-6
              ${isDark ? 'text-white' : 'text-gray-900'}
            `}>
              {t('about.skills')}
            </h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`
                      text-sm font-medium
                      ${isDark ? 'text-gray-300' : 'text-gray-700'}
                    `}>
                      {skill.name}
                    </span>
                    <span className={`
                      text-sm
                      ${isDark ? 'text-gray-400' : 'text-gray-500'}
                    `}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className={`
                    h-2 rounded-full overflow-hidden
                    ${isDark ? 'bg-[#16181C]' : 'bg-gray-200'}
                  `}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-[#4F7FFF] to-[#FF6B35] rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Passion Section */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className={`
              text-2xl font-bold mb-6
              ${isDark ? 'text-white' : 'text-gray-900'}
            `}>
              {t('about.passion')}
            </h3>
            <p className={`
              text-base leading-relaxed mb-6
              ${isDark ? 'text-gray-400' : 'text-gray-600'}
            `}>
              {t('about.passionText')}
            </p>
            <div className={`
              p-6 rounded-xl
              ${isDark ? 'bg-[#16181C] border border-white/10' : 'bg-gray-50 border border-gray-200'}
            `}>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className={`
                    text-3xl font-bold mb-2
                    ${isDark ? 'text-[#4F7FFF]' : 'text-[#4F7FFF]'}
                  `}>
                    50+
                  </div>
                  <div className={`
                    text-sm
                    ${isDark ? 'text-gray-400' : 'text-gray-600'}
                  `}>
                    Projects
                  </div>
                </div>
                <div className="text-center">
                  <div className={`
                    text-3xl font-bold mb-2
                    ${isDark ? 'text-[#FF6B35]' : 'text-[#FF6B35]'}
                  `}>
                    5+
                  </div>
                  <div className={`
                    text-sm
                    ${isDark ? 'text-gray-400' : 'text-gray-600'}
                  `}>
                    Years Experience
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className={`
            text-2xl font-bold mb-8 text-center
            ${isDark ? 'text-white' : 'text-gray-900'}
          `}>
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {['React', 'TypeScript', 'Node.js', 'Python', 'TailwindCSS', 'Framer Motion', 'GSAP', 'Three.js'].map((tech) => (
              <motion.div
                key={tech}
                whileHover={{ scale: 1.1, y: -5 }}
                className={`
                  px-6 py-3 rounded-lg
                  ${isDark ? 'bg-[#16181C] border border-white/10' : 'bg-gray-50 border border-gray-200'}
                  hover:border-[#4F7FFF]/50 transition-all
                `}
              >
                <span className={`
                  font-medium
                  ${isDark ? 'text-gray-300' : 'text-gray-700'}
                `}>
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
