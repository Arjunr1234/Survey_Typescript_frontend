import axios from "axios";


const BASE_URL = "https://survey-typescript-backend.onrender.com"
//const BASE_URL = "http://localhost:5002"; 
//const BASE_URL = import.meta.env.VITE_URL

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
});