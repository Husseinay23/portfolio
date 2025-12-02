import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { LanguageSwitcher } from '../../molecules/LanguageSwitcher';
import { ThemeToggle } from '../../molecules/ThemeToggle';
import { HamburgerMenu } from '../../molecules/HamburgerMenu';

export const NavBar = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: t('nav.home'), href: '#home' },
    { key: 'about', label: t('nav.about'), href: '#about' },
    { key: 'experience', label: t('nav.experience'), href: '#experience' },
    { key: 'projects', label: t('nav.projects'), href: '#projects' },
    { key: 'contact', label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 glass border-b ${
        isDark ? 'border-white/10' : 'border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <img 
              src="/logo.png" 
              alt="HAy Logo" 
              className="h-10 w-auto object-contain"
              style={{ objectPosition: 'center' }}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`text-sm font-medium hover:text-[#4F7FFF] transition-colors ${
                  isDark ? 'text-[#DCDCDC]' : 'text-gray-700'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/Hussein Ayoub CV.docx"
              download
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  isDark
                    ? "bg-[#4F7FFF] text-white hover:bg-[#4F7FFF]/80"
                    : "bg-[#4F7FFF] text-white hover:bg-[#4F7FFF]/80"
                }
              `}
            >
              {t("nav.downloadCV")}
            </a>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="/Hussein Ayoub CV.docx"
              download
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${
                  isDark
                    ? "bg-[#4F7FFF] text-white hover:bg-[#4F7FFF]/80"
                    : "bg-[#4F7FFF] text-white hover:bg-[#4F7FFF]/80"
                }
              `}
            >
              CV
            </a>
            <LanguageSwitcher />
            <ThemeToggle />
            <HamburgerMenu isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

