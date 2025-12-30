import axios from "axios";

const API = axios.create({
  baseURL: "https://rest-backend-evx8.onrender.com/api",
});

export default API;
