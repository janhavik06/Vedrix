import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true); // checking stored token on mount

  // ── On mount: restore session from localStorage ─────────
  useEffect(() => {
    const token = localStorage.getItem("vedrix_token");
    if (token) {
      authAPI
        .getMe()
        .then((res) => setUser(res.user))
        .catch(() => {
          // token expired / invalid — clear it
          localStorage.removeItem("vedrix_token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // ── Register ─────────────────────────────────────────────
  const register = async (name, email, password) => {
    const res = await authAPI.register({ name, email, password });
    localStorage.setItem("vedrix_token", res.token);
    setUser(res.user);
    return res;
  };

  // ── Login ────────────────────────────────────────────────
  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    localStorage.setItem("vedrix_token", res.token);
    setUser(res.user);
    return res;
  };

  // ── Logout ───────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem("vedrix_token");
    setUser(null);
  };

  // ── Update profile ───────────────────────────────────────
  const updateProfile = async (data) => {
    const res = await authAPI.updateProfile(data);
    setUser(res.user);
    return res;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
