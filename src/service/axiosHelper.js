import axios from "axios";

const axiosInstance = axios.create({
  timeout: 10000,
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
