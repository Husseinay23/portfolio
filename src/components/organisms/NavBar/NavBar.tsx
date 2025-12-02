import { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { LanguageSwitcher } from '../../molecules/LanguageSwitcher';
import { ThemeToggle } from '../../molecules/ThemeToggle';

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const NavBar = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeSection, setActiveSection] = useState('home');

  const navigation = [
    { key: 'home', name: t('nav.home'), href: '#home' },
    { key: 'about', name: t('nav.about'), href: '#about' },
    { key: 'experience', name: t('nav.experience'), href: '#experience' },
    { key: 'projects', name: t('nav.projects'), href: '#projects' },
    { key: 'contact', name: t('nav.contact'), href: '#contact' },
  ];

  // Smooth scroll function
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, closeMenu?: () => void) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // NavBar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      
      // Close mobile menu if open
      if (closeMenu) {
        setTimeout(() => closeMenu(), 100);
      }
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigation]);

  return (
    <Disclosure
      as="nav"
      className={classNames(
        'fixed top-0 left-0 right-0 z-50 transition-colors',
        isDark
          ? 'bg-[#0B0C0E]/80 backdrop-blur-xl border-b border-white/10 dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10'
          : 'bg-white/80 backdrop-blur-xl border-b border-gray-200'
      )}
    >
      {({ open, close }) => (
        <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton
              className={classNames(
                'group relative inline-flex items-center justify-center rounded-md p-2 focus:outline-2 focus:-outline-offset-1 focus:outline-[#4F7FFF]',
                isDark
                  ? 'text-gray-400 hover:bg-white/5 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className={classNames('block size-6', open && 'hidden')} />
              <XMarkIcon aria-hidden="true" className={classNames('hidden size-6', open && 'block')} />
            </DisclosureButton>
          </div>

          {/* Logo and Desktop Navigation */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className="flex items-center"
              >
                <img
                  src={`${import.meta.env.BASE_URL}logo.png`}
                  alt="HAy Logo"
                  className="h-10 w-auto object-contain"
                  style={{ objectPosition: 'center' }}
                  loading="lazy"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-1">
                {navigation.map((item) => {
                  const sectionId = item.href.substring(1);
                  const isActive = activeSection === sectionId;

                  return (
                    <a
                      key={item.key}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={classNames(
                        isActive
                          ? isDark
                            ? 'bg-gray-900 text-white dark:bg-gray-950/50'
                            : 'bg-[#4F7FFF]/10 text-[#4F7FFF]'
                          : isDark
                            ? 'text-gray-400 hover:bg-white/5 hover:text-white'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-[#4F7FFF]',
                        'rounded-md px-3 py-2 text-sm font-medium transition-colors'
                      )}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right side controls */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel className="sm:hidden">
        <div className={classNames(
          'px-2 pt-2 pb-3 space-y-1 border-t',
          isDark ? 'border-white/10' : 'border-gray-200'
        )}>
          {navigation.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;

            return (
              <DisclosureButton
                key={item.key}
                as="a"
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, close)}
                aria-current={isActive ? 'page' : undefined}
                className={classNames(
                  isActive
                    ? isDark
                      ? 'bg-gray-900 text-white dark:bg-gray-950/50'
                      : 'bg-[#4F7FFF]/10 text-[#4F7FFF]'
                    : isDark
                      ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-[#4F7FFF]',
                  'block rounded-md px-3 py-2 text-base font-medium transition-colors'
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
          
          {/* Mobile controls */}
          <div className={classNames(
            'pt-4 mt-4 border-t flex items-center justify-center gap-3',
            isDark ? 'border-white/10' : 'border-gray-200'
          )}>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </DisclosurePanel>
          </>
      )}
    </Disclosure>
  );
};
