import axios from "axios";
import { getStorageItemAsync, setStorageItemAsync } from "./session-storage";
import { API_URL, SESSION_KEY } from "@/constants";

export const apiClient = axios.create({
    baseURL: API_URL, // Replace with your API's base URL
    timeout: 10000, // Timeout after 10 seconds
  });
  
  // Request interceptor to add token to headers
  apiClient.interceptors.request.use(
    async (config) => {
      const token = await getStorageItemAsync(SESSION_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Response interceptor to handle errors globally
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response) {
        // Handle specific error status codes (e.g., token expiration)
        if (error.response.status === 401) {
          // Token expired or unauthorized
          await setStorageItemAsync(SESSION_KEY, null); // Optionally log out the user
        }
      }
      return Promise.reject(error);
    }
  );