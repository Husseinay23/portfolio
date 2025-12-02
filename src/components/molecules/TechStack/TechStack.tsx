import { motion } from "framer-motion";
import { useTheme } from "../../../contexts/ThemeContext";

interface TechStackProps {
  tech: {
    name: string;
    icon: React.ReactNode;
  };
  index: number;
}

export const TechStackItem = ({ tech, index }: TechStackProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.1, y: -5 }}
      className={`
        px-6 py-4 rounded-lg flex flex-col items-center gap-2 transition-all
        ${isDark 
          ? 'bg-[#16181C] border border-white/10 hover:border-[#4F7FFF]/50' 
          : 'bg-gray-50 border border-gray-200 hover:border-[#4F7FFF]/50'
        }
      `}
    >
      <div className="w-12 h-12 flex items-center justify-center">
        {tech.icon}
      </div>
      <span className={`
        text-sm font-medium
        ${isDark ? 'text-gray-300' : 'text-gray-700'}
      `}>
        {tech.name}
      </span>
    </motion.div>
  );
};

