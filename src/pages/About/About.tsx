import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { TechIcons } from '../../components/molecules/TechStack';
import { gsap } from 'gsap';

export const About = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isRTL = i18n.language === 'ar';
  const techStackRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'System Architecture', level: 80 },
  ];

  // GSAP animation for tech stack
  useEffect(() => {
    if (techStackRef.current) {
      const techItems = techStackRef.current.querySelectorAll('.tech-item');
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(entry.target as HTMLElement, 
                {
                  opacity: 0,
                  scale: 0.8,
                  y: 50,
                },
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.6,
                  ease: 'back.out(1.7)',
                }
              );
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      techItems.forEach((item, index) => {
        gsap.set(item, { opacity: 0 });
        observer.observe(item);
      });

      return () => {
        techItems.forEach((item) => observer.unobserve(item));
      };
    }
  }, []);

  const techStack = [
    { name: 'React', icon: TechIcons.React },
    { name: 'TypeScript', icon: TechIcons.TypeScript },
    { name: 'JavaScript', icon: TechIcons.JavaScript },
    { name: 'Python', icon: TechIcons.Python },
    { name: 'HTML5', icon: TechIcons.HTML5 },
    { name: 'CSS3', icon: TechIcons.CSS3 },
    { name: 'TailwindCSS', icon: TechIcons.TailwindCSS },
    { name: 'React Native', icon: TechIcons['React Native'] },
    { name: 'Node.js', icon: TechIcons['Node.js'] },
    { name: 'SQL', icon: TechIcons.SQL },
    { name: 'Java', icon: TechIcons.Java },
    { name: 'Android Studio', icon: TechIcons['Android Studio'] },
    { name: 'GSAP', icon: TechIcons.GSAP },
    { name: 'Framer Motion', icon: TechIcons['Framer Motion'] },
    { name: 'Three.js', icon: TechIcons['Three.js'] },
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
                    20+
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
                    3
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
          ref={techStackRef}
        >
          <h3 className={`
            text-2xl font-bold mb-8 text-center
            ${isDark ? 'text-white' : 'text-gray-900'}
          `}>
            Tech Stack
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {techStack.map((tech) => (
              <motion.div
                key={tech.name}
                className="tech-item"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`
                  p-4 rounded-xl flex flex-col items-center gap-2 transition-all cursor-pointer
                  ${isDark 
                    ? 'bg-[#16181C] border border-white/10 hover:border-[#4F7FFF]/50' 
                    : 'bg-gray-50 border border-gray-200 hover:border-[#4F7FFF]/50'
                  }
                `}>
                  <div className="w-10 h-10 flex items-center justify-center">
                    {tech.icon}
                  </div>
                  <span className={`
                    text-xs font-medium text-center
                    ${isDark ? 'text-gray-300' : 'text-gray-700'}
                  `}>
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};