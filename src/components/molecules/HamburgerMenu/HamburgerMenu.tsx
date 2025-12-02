import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const HamburgerMenu = ({ isOpen, onToggle }: HamburgerMenuProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const menuItems = [
    { key: 'home', label: t('nav.home'), href: '#home' },
    { key: 'about', label: t('nav.about'), href: '#about' },
    { key: 'experience', label: t('nav.experience'), href: '#experience' },
    { key: 'projects', label: t('nav.projects'), href: '#projects' },
    { key: 'contact', label: t('nav.contact'), href: '#contact' },
  ];

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

  return (
    <>
      <button
        onClick={onToggle}
        className="flex flex-col gap-1.5 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F7FFF]"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          className="block h-0.5 w-6 bg-current transition-colors"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="block h-0.5 w-6 bg-current transition-colors"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          className="block h-0.5 w-6 bg-current transition-colors"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={onToggle}
            />
            <motion.div
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 h-full w-80 bg-[#16181C] shadow-2xl z-50 p-6 ${
                isRTL ? 'left-0' : 'right-0'
              }`}
            >
              <nav className="mt-16">
                <ul className="space-y-4">
                  {menuItems.map((item) => (
                    <li key={item.key}>
                      <a
                        href={item.href}
                        onClick={onToggle}
                        className="block px-4 py-3 rounded-lg hover:bg-[#0B0C0E] transition-colors text-lg font-medium text-[#DCDCDC]"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

