import {
  CheckSquare,
  Dumbbell,
  LayoutDashboard,
  MessageCircle,
  Moon,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../lib/utils";
import { useStore } from "../store/useStore";
import type { ActiveTab } from "../store/useStore";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NAV_TABS: {
  id: ActiveTab;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  { id: "ai-plans", label: "AI Plans", icon: <Sparkles size={20} /> },
  { id: "exercises", label: "Exercises", icon: <Dumbbell size={20} /> },
  { id: "tracking", label: "Tracking", icon: <CheckSquare size={20} /> },
  { id: "chat", label: "Chat", icon: <MessageCircle size={20} /> },
];

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <div className={cn("min-h-screen flex flex-col", darkMode ? "dark" : "")}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center shadow-lg">
              <Zap size={16} className="text-black" />
            </div>
            <span className="text-lg font-display font-bold gradient-text">
              FitAI
            </span>
          </div>

          <button
            type="button"
            data-ocid="theme.toggle"
            onClick={toggleDarkMode}
            className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth hover:bg-white/10"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pb-24 bg-background overflow-y-auto">
        <div className="max-w-screen-xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-white/10 safe-area-pb"
        data-ocid="bottom_nav"
      >
        <div className="max-w-screen-xl mx-auto px-2">
          <div className="flex items-center justify-around h-16">
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  data-ocid={`nav.${tab.id}.tab`}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-smooth min-w-0",
                    isActive
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-label={tab.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-accent/10 rounded-xl border border-accent/20"
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10",
                      isActive && "drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]",
                    )}
                  >
                    {tab.icon}
                  </span>
                  <span className="relative z-10 text-[10px] font-medium leading-none">
                    {tab.label}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Layout;
