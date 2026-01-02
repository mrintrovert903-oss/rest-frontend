import { createContext, useContext, useEffect, useState } from "react";
import API from "../api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      API.defaults.headers.common["x-auth-token"] = token;
    } else {
      delete API.defaults.headers.common["x-auth-token"];
    }
    setLoading(false);
  }, [token]);

  // ✅ LOGIN
  const login = async (email, password) => {
    const res = await API.post("/api/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setToken(res.data.token);
    setUser(res.data.user);

    return res.data.user;
  };

  // ✅ REGISTER
  const register = async (name, email, password, role) => {
    const res = await API.post("/api/auth/register", {
      name,
      email,
      password,
      role,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setToken(res.data.token);
    setUser(res.data.user);

    return res.data.user;
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
