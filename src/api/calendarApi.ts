import axios, { InternalAxiosRequestConfig } from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

const calendarAPI = axios.create({
  baseURL: VITE_API_URL,
});


// TODO: configurar interceptores
calendarAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers["x-token"] = localStorage.getItem("token");
  return config;
});


export default calendarAPI;
