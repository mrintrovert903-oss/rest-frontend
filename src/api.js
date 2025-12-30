import axios from "axios";

const API = axios.create({
  baseURL: "https://restaurant-backend.onrender.com/api",
});

export default API;
