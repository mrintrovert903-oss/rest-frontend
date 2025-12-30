// import { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import API from '../api';
// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem('token', token);
//       axios.defaults.headers.common['x-auth-token'] = token;
//     } else {
//       localStorage.removeItem('token');
//       delete axios.defaults.headers.common['x-auth-token'];
//     }
//   }, [token]);

//   const login = async (email, password) => {
//     const res = await API.post('http://localhost:5000/api/auth/login', { email, password });
//     setToken(res.data.token);
//     setUser(res.data.user);
//     return res.data.user;
//   };

//   const register = async (name, email, password, role) => {
//     const res = await API.post('http://localhost:5000/api/auth/register', { name, email, password, role });
//     setToken(res.data.token);
//     setUser(res.data.user);
//     return res.data.user;
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // 🔑 Restore token on refresh
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
      API.defaults.headers.common["x-auth-token"] = token;
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
      delete API.defaults.headers.common["x-auth-token"];
    }
    setLoading(false);
  }, [token]);

  // ✅ LOGIN
  const login = async (email, password) => {
    const res = await API.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setToken(res.data.token);
    setUser(res.data.user);

    return res.data.user;
  };

  // ✅ REGISTER (YOU NEED THIS)
  const register = async (name, email, password, role) => {
    const res = await API.post(
      "http://localhost:5000/api/auth/register",
      { name, email, password, role }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setToken(res.data.token);
    setUser(res.data.user);

    return res.data.user;
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
