import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useEffect } from "react";
import { useStore } from "../store/useStore";

export function useAuth() {
  const { identity, login, clear, loginStatus, isAuthenticated, isLoggingIn } =
    useInternetIdentity();
  const setIsAuthenticated = useStore((s) => s.setIsAuthenticated);

  useEffect(() => {
    setIsAuthenticated(isAuthenticated);
  }, [isAuthenticated, setIsAuthenticated]);

  const principal = identity?.getPrincipal()?.toText() ?? null;

  return {
    isAuthenticated,
    isLoggingIn,
    loginStatus,
    login,
    logout: clear,
    principal,
    identity,
  };
}
