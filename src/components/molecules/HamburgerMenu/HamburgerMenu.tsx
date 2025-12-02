import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { ThemeToggle } from '../ThemeToggle';

interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const HamburgerMenu = ({ isOpen, onToggle }: HamburgerMenuProps) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isRTL = i18n.language === 'ar';

  const menuItems = [
    { key: 'home', label: t('nav.home'), href: '#home', icon: '🏠' },
    { key: 'about', label: t('nav.about'), href: '#about', icon: '👤' },
    { key: 'experience', label: t('nav.experience'), href: '#experience', icon: '💼' },
    { key: 'projects', label: t('nav.projects'), href: '#projects', icon: '📁' },
    { key: 'contact', label: t('nav.contact'), href: '#contact', icon: '✉️' },
  ];

  // Smooth scroll function
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      
      // Close menu after a short delay for smooth transition
      setTimeout(() => {
        onToggle();
      }, 300);
    }
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onToggle();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onToggle]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={onToggle}
        className={`
          relative z-[80] flex flex-col gap-1.5 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F7FFF] transition-colors
          ${isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-100'}
        `}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          className={`block h-0.5 w-6 transition-colors ${isDark ? 'bg-gray-300' : 'bg-gray-700'}`}
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className={`block h-0.5 w-6 transition-colors ${isDark ? 'bg-gray-300' : 'bg-gray-700'}`}
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          className={`block h-0.5 w-6 transition-colors ${isDark ? 'bg-gray-300' : 'bg-gray-700'}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={onToggle}
            />
            
            {/* Sidebar Menu */}
            <motion.div
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`
                fixed top-0 h-full w-80 max-w-[85vw] shadow-2xl z-[70] overflow-y-auto
                ${isDark 
                  ? 'bg-gradient-to-b from-[#0B0C0E] via-[#16181C] to-[#0B0C0E] border-r border-white/10' 
                  : 'bg-gradient-to-b from-white via-gray-50 to-white border-r border-gray-200'
                }
                ${isRTL ? 'left-0' : 'right-0'}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`
                flex items-center justify-between p-6 border-b
                ${isDark ? 'border-white/10' : 'border-gray-200'}
              `}>
                <h2 className={`
                  text-xl font-bold
                  ${isDark ? 'text-white' : 'text-gray-900'}
                `}>
                  Menu
                </h2>
                <button
                  onClick={onToggle}
                  className={`
                    p-2 rounded-lg transition-colors
                    ${isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}
                  `}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="p-6">
                <ul className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.key}
                      initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, type: 'spring' }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`
                          group flex items-center gap-4 px-4 py-4 rounded-xl transition-all
                          ${isDark
                            ? 'text-gray-300 hover:bg-[#4F7FFF]/10 hover:text-[#4F7FFF]'
                            : 'text-gray-700 hover:bg-[#4F7FFF]/5 hover:text-[#4F7FFF]'
                          }
                        `}
                      >
                        <span className="text-2xl transition-transform group-hover:scale-110">
                          {item.icon}
                        </span>
                        <span className="text-lg font-medium flex-1">
                          {item.label}
                        </span>
                        <svg 
                          className={`
                            w-5 h-5 transition-transform group-hover:translate-x-1
                            ${isRTL ? 'rotate-180' : ''}
                            ${isDark ? 'text-gray-500' : 'text-gray-400'}
                          `}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                {/* Footer */}
                <div className={`
                  mt-8 pt-6 border-t
                  ${isDark ? 'border-white/10' : 'border-gray-200'}
                `}>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                  <p className={`
                    text-sm text-center
                    ${isDark ? 'text-gray-400' : 'text-gray-500'}
                  `}>
                    {t('nav.home')} • {new Date().getFullYear()}
                  </p>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};