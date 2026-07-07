import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { API_BASE_URL } from "../config/env";

const AuthContext = createContext(null);

const getStoredUser = () => {
  const storedUser = localStorage.getItem("connecto_user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("connecto_user");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [token, setToken] = useState(() =>
    localStorage.getItem("connecto_token")
  );
  const [loading, setLoading] = useState(true);

  const persistSession = (nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken);
    localStorage.setItem("connecto_user", JSON.stringify(nextUser));
    localStorage.setItem("connecto_token", nextToken);
  };

  const clearSession = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("connecto_user");
    localStorage.removeItem("connecto_token");
  };

  const login = async ({ email, password }) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      { email, password },
      { withCredentials: true }
    );

    persistSession(response.data.user, response.data.token);

    return response.data;
  };

  const register = async ({ fullName, email, password }) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/register`,
      { fullName, email, password },
      { withCredentials: true }
    );

    persistSession(response.data.user, response.data.token);

    return response.data;
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        }
      );
    } finally {
      clearSession();
    }
  };

  useEffect(() => {
    const hydrateUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
        localStorage.setItem(
          "connecto_user",
          JSON.stringify(response.data.user)
        );
      } catch {
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    hydrateUser();
  }, [token]);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user && token),
      login,
      register,
      logout,
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
