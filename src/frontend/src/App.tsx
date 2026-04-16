import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { useAuth } from "./hooks/useAuth";
import { cn } from "./lib/utils";
import { LandingPage } from "./pages/LandingPage";
import { useStore } from "./store/useStore";
import type { ActiveTab } from "./store/useStore";

// Lazy-loaded pages
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const AIPlansPage = lazy(() => import("./pages/AIPlansPage"));
const ExercisesPage = lazy(() => import("./pages/ExercisesPage"));
const TrackingPage = lazy(() => import("./pages/TrackingPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));

function PageFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    </div>
  );
}

function ActivePage({ tab }: { tab: ActiveTab }) {
  return (
    <Suspense fallback={<PageFallback />}>
      {tab === "dashboard" && <DashboardPage />}
      {tab === "ai-plans" && <AIPlansPage />}
      {tab === "exercises" && <ExercisesPage />}
      {tab === "tracking" && <TrackingPage />}
      {tab === "chat" && <ChatPage />}
    </Suspense>
  );
}

export default function App() {
  const { isAuthenticated } = useAuth();
  const { darkMode, activeTab, setActiveTab } = useStore();

  // Apply dark mode class to root
  const rootClass = cn(
    "min-h-screen",
    darkMode ? "dark bg-[#0F172A]" : "bg-background",
  );

  if (!isAuthenticated) {
    return (
      <div className={rootClass}>
        <LandingPage />
      </div>
    );
  }

  return (
    <div className={rootClass}>
      <Layout
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as ActiveTab)}
      >
        <ActivePage tab={activeTab} />
      </Layout>
    </div>
  );
}
