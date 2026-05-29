"use client";

import { createContext, useState, useCallback, useEffect } from "react";
import { MOCK_USER } from "@/lib/mockData";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("vibes_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("vibes_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(() => {
    const userData = { ...MOCK_USER, loggedInAt: new Date().toISOString() };
    setUser(userData);
    localStorage.setItem("vibes_user", JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("vibes_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
