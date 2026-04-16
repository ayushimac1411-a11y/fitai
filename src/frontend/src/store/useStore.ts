import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile } from "../types/fitness";

export type ActiveTab =
  | "dashboard"
  | "ai-plans"
  | "exercises"
  | "tracking"
  | "chat";

interface AppState {
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  darkMode: boolean;
  activeTab: ActiveTab;
  setUserProfile: (profile: UserProfile | null) => void;
  setIsAuthenticated: (auth: boolean) => void;
  setDarkMode: (dark: boolean) => void;
  toggleDarkMode: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      userProfile: null,
      isAuthenticated: false,
      darkMode: true,
      activeTab: "dashboard" as ActiveTab,
      setUserProfile: (profile) => set({ userProfile: profile }),
      setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
      setDarkMode: (dark) => set({ darkMode: dark }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: "fitai-store",
      partialize: (state) => ({
        darkMode: state.darkMode,
        activeTab: state.activeTab,
        userProfile: state.userProfile,
      }),
    },
  ),
);
