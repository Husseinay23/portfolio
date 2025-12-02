import { Suspense } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { NavBar } from './components/organisms/NavBar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import './i18n/config';

function AppContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDark 
        ? 'bg-[#0B0C0E] text-[#DCDCDC]' 
        : 'bg-white text-gray-900'
    }`}>
      <NavBar />
      <main>
        <Home />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={
        <div className="min-h-screen bg-white dark:bg-[#0B0C0E] flex items-center justify-center transition-colors duration-200">
          <div className="text-gray-900 dark:text-white">Loading...</div>
        </div>
      }>
        <AppContent />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
