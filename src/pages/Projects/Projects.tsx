import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fetchGitHubRepos, inferStack, type GitHubRepo } from '../../lib/github';
import { ProjectCard } from '../../components/molecules/ProjectCard';
import { useTheme } from '../../contexts/ThemeContext';

type FilterType = 'All' | 'React' | 'TypeScript' | 'Fullstack' | 'UI/UX' | 'Systems';

const FILTERS: FilterType[] = ['All', 'React', 'TypeScript', 'Fullstack', 'UI/UX', 'Systems'];

export const Projects = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isRTL = i18n.language === 'ar';

  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  useEffect(() => {
    const loadRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedRepos = await fetchGitHubRepos('Husseinay23');
        
        // Filter to only show specific repos
        const allowedRepos = [
          'Lebanese-Crisis-Support-Program-Platform',
          'qrcode-wifi-connection-Alex-Co',
          'asalyah'
        ];
        
        const filtered = fetchedRepos.filter(repo => 
          allowedRepos.some(allowed => 
            repo.name.toLowerCase().includes(allowed.toLowerCase()) ||
            repo.html_url.includes(allowed)
          )
        );
        
        // Sort repos: pinned first, then by stars, then by updated date
        const sortedRepos = filtered.sort((a, b) => {
          // Pinned repos (with homepage) first
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          
          // Then by stars
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }
          
          // Finally by updated date
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });
        
        setRepos(sortedRepos);
        setFilteredRepos(sortedRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('projects.error'));
      } finally {
        setLoading(false);
      }
    };

    loadRepos();
  }, [t]);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredRepos(repos);
      return;
    }

    const filtered = repos.filter((repo) => {
      const stack = inferStack(repo);
      const repoLanguage = repo.language?.toLowerCase() || '';
      const repoTopics = repo.topics.map((t) => t.toLowerCase());

      switch (activeFilter) {
        case 'React':
          return (
            repoLanguage === 'javascript' ||
            repoLanguage === 'typescript' ||
            repoTopics.includes('react') ||
            stack.includes('React')
          );
        case 'TypeScript':
          return (
            repoLanguage === 'typescript' ||
            repoTopics.includes('typescript') ||
            stack.includes('TypeScript')
          );
        case 'Fullstack':
          return (
            repoTopics.includes('fullstack') ||
            stack.includes('Fullstack') ||
            (repoTopics.includes('frontend') && repoTopics.includes('backend'))
          );
        case 'UI/UX':
          return (
            repoTopics.includes('ui') ||
            repoTopics.includes('ux') ||
            repoTopics.includes('design') ||
            stack.includes('UI/UX')
          );
        case 'Systems':
          return (
            repoTopics.includes('system') ||
            repoTopics.includes('systems') ||
            stack.includes('Systems')
          );
        default:
          return true;
      }
    });

    setFilteredRepos(filtered);
  }, [activeFilter, repos]);

  if (loading) {
    return (
      <section id="projects" className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-[#4F7FFF] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            {t('projects.loading')}
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className={`
            p-6 rounded-xl mb-4
            ${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}
          `}>
            <p className={isDark ? 'text-red-400' : 'text-red-600'}>
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className={`
            text-4xl md:text-5xl font-bold mb-4
            ${isDark ? 'text-white' : 'text-gray-900'}
          `}>
            {t('projects.title')}
          </h2>
          <p className={`
            text-lg
            ${isDark ? 'text-gray-400' : 'text-gray-600'}
          `}>
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`
            flex flex-wrap gap-2 justify-center mb-12
            ${isRTL ? 'flex-row-reverse' : ''}
          `}
        >
          {FILTERS.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  activeFilter === filter
                    ? isDark
                      ? 'bg-[#4F7FFF] text-white shadow-lg shadow-[#4F7FFF]/50'
                      : 'bg-[#4F7FFF] text-white shadow-lg shadow-[#4F7FFF]/30'
                    : isDark
                    ? 'bg-[#16181C] text-gray-300 hover:bg-[#0B0C0E] border border-white/10'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }
              `}
            >
              {filter === 'All' ? t('projects.filters.all') : 
               filter === 'React' ? t('projects.filters.react') :
               filter === 'TypeScript' ? t('projects.filters.typescript') :
               filter === 'Fullstack' ? t('projects.filters.fullstack') :
               filter === 'UI/UX' ? t('projects.filters.uiux') :
               t('projects.filters.systems')}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredRepos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                No projects found for this filter.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
                ${isRTL ? 'direction-rtl' : ''}
              `}
            >
              {filteredRepos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCard
                    title={repo.name}
                    description={repo.description}
                    repoUrl={repo.html_url}
                    liveUrl={repo.homepage}
                    language={repo.language}
                    topics={repo.topics}
                    stars={repo.stargazers_count}
                    updatedAt={repo.updated_at}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
