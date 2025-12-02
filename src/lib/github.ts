export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
  pinned?: boolean;
}

interface CachedData {
  repos: GitHubRepo[];
  timestamp: number;
}

const CACHE_KEY = 'github_repos_cache';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const cachedData: CachedData = JSON.parse(cached);
      const now = Date.now();
      
      // Check if cache is still valid
      if (cachedData.timestamp && (now - cachedData.timestamp) < CACHE_TTL) {
        return cachedData.repos;
      }
    } catch (error) {
      console.warn('Failed to parse cached GitHub repos:', error);
      localStorage.removeItem(CACHE_KEY);
    }
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&direction=desc`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User "${username}" not found on GitHub`);
      }
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again later.');
      }
      throw new Error(`Failed to fetch repositories: ${response.statusText}`);
    }

    const data: any[] = await response.json();

    const repos: GitHubRepo[] = data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      topics: repo.topics || [],
      stargazers_count: repo.stargazers_count,
      updated_at: repo.updated_at,
      pinned: !!repo.homepage, // Mark repos with homepage as pinned
    }));

    // Cache the results
    const cacheData: CachedData = {
      repos,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

    return repos;
  } catch (error) {
    // If fetch fails, try to return cached data even if expired
    if (cached) {
      try {
        const cachedData: CachedData = JSON.parse(cached);
        console.warn('Using expired cache due to fetch error:', error);
        return cachedData.repos;
      } catch {
        // Ignore parse errors
      }
    }
    
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while fetching repositories');
  }
};

// Helper function to infer stack from language and topics
export const inferStack = (repo: GitHubRepo): string[] => {
  const stack: string[] = [];
  
  if (repo.language) {
    stack.push(repo.language);
  }
  
  // Infer from topics
  const topicMap: Record<string, string> = {
    'react': 'React',
    'typescript': 'TypeScript',
    'javascript': 'JavaScript',
    'nodejs': 'Node.js',
    'python': 'Python',
    'nextjs': 'Next.js',
    'vue': 'Vue',
    'angular': 'Angular',
    'tailwindcss': 'TailwindCSS',
    'ui': 'UI/UX',
    'ux': 'UI/UX',
    'design': 'UI/UX',
    'fullstack': 'Fullstack',
    'backend': 'Backend',
    'frontend': 'Frontend',
    'system': 'Systems',
    'systems': 'Systems',
  };
  
  repo.topics.forEach((topic) => {
    const normalizedTopic = topic.toLowerCase();
    if (topicMap[normalizedTopic] && !stack.includes(topicMap[normalizedTopic])) {
      stack.push(topicMap[normalizedTopic]);
    }
  });
  
  return stack;
};

