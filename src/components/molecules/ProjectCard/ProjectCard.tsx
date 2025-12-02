import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';

interface ProjectCardProps {
  title: string;
  description: string | null;
  repoUrl: string;
  liveUrl: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  updatedAt: string;
}

export const ProjectCard = ({
  title,
  description,
  repoUrl,
  liveUrl,
  language,
  topics,
  stars,
  updatedAt,
}: ProjectCardProps) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isRTL = i18n.language === 'ar';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = isRTL ? 'ar-SA' : i18n.language === 'fr' ? 'fr-FR' : 'en-US';
    return new Intl.DateTimeFormat(locale, {
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`
        relative p-6 rounded-xl border transition-all duration-300
        ${isDark 
          ? 'bg-[#16181C] border-white/10 hover:border-[#4F7FFF]/50' 
          : 'bg-white border-gray-200 hover:border-[#4F7FFF]/50'
        }
        hover:shadow-lg hover:shadow-[#4F7FFF]/20
      `}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#4F7FFF]/10 to-[#FF6B35]/10 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className={`flex items-start justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h3 className={`
            text-xl font-bold mb-2
            ${isDark ? 'text-white' : 'text-gray-900'}
          `}>
            {title}
          </h3>
          {stars > 0 && (
            <div className={`
              flex items-center gap-1 px-2 py-1 rounded-lg text-sm
              ${isDark ? 'bg-[#0B0C0E] text-gray-300' : 'bg-gray-100 text-gray-700'}
            `}>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{stars}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className={`
          text-sm mb-4 line-clamp-3
          ${isDark ? 'text-gray-400' : 'text-gray-600'}
        `}>
          {description || t('projects.noDescription')}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {language && (
            <span className={`
              px-2 py-1 rounded-md text-xs font-medium
              ${isDark ? 'bg-[#4F7FFF]/20 text-[#4F7FFF]' : 'bg-[#4F7FFF]/10 text-[#4F7FFF]'}
            `}>
              {language}
            </span>
          )}
          {topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className={`
                px-2 py-1 rounded-md text-xs font-medium
                ${isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-700'}
              `}
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'} ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className={`
            text-xs
            ${isDark ? 'text-gray-500' : 'text-gray-400'}
          `}>
            {formatDate(updatedAt)}
          </span>
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  p-2 rounded-lg transition-colors
                  ${isDark ? 'hover:bg-[#4F7FFF]/20 text-[#4F7FFF]' : 'hover:bg-[#4F7FFF]/10 text-[#4F7FFF]'}
                `}
                aria-label={t('projects.viewLive')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            )}
            <motion.a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-2 rounded-lg transition-colors
                ${isDark ? 'hover:bg-[#4F7FFF]/20 text-gray-400 hover:text-[#4F7FFF]' : 'hover:bg-[#4F7FFF]/10 text-gray-600 hover:text-[#4F7FFF]'}
              `}
              aria-label={t('projects.viewCode')}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

