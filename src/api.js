// // src/api.js
// import axios from "axios";

// const API = axios.create({
//   // baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
//   withCredentials: true, // needed if using cookies
// });

// export default API;
// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default API;
