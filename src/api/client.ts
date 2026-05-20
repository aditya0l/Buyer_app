import axios from 'axios';
import { config } from '../constants/config';
import { storage, storageKeys } from '../utils/storage';
import { useAuthStore } from '../store/authStore';

export const apiClient = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Inject Auth Token
apiClient.interceptors.request.use(
  (reqConfig) => {
    try {
      const token = storage.getString(storageKeys.AUTH_TOKEN);
      if (token && reqConfig.headers) {
        reqConfig.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      }
    } catch (e) {
      console.error('Error reading auth token in interceptor:', e);
    }
    return reqConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Global Errors (like 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Handle token refresh logic here if needed
        // For now, if unauthorized, log out the user
        useAuthStore.getState().logout();
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
