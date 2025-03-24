import axios from "axios";

//const BASE_URL = "https://surveyapp-backend-xapd.onrender.com"; 
const BASE_URL = "http://localhost:5002"; 

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
});