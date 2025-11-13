import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
  role?: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = "http://localhost/web-market/server";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMe = async () => {
      try {
        const res = await fetch(`${API_BASE}/me.php`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser(data.user as User);
        } else {
          setUser(null);
        }
      } catch (e) {
        console.error("me.php error", e);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadMe();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/logout.php`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("logout error", e);
    } finally {
      setUser(null);
    }
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
