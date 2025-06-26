// src/utils/axiosInstance.ts
import axios from 'axios';

// Cache CSRF token to avoid multiple requests
let csrfToken: string | null = null;
let csrfPromise: Promise<string> | null = null;

const getCsrfToken = async (): Promise<string> => {
  // Return cached token if available
  if (csrfToken) {
    return csrfToken;
  }

  // Return existing promise if already fetching
  if (csrfPromise) {
    return csrfPromise;
  }

  // Create new promise to fetch CSRF token
  csrfPromise = axios.get('http://localhost:8000/api/csrf', {
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
    }
  }).then(response => {
    csrfToken = response.data.token;
    csrfPromise = null; // Reset promise
    return csrfToken!;
  }).catch(error => {
    csrfPromise = null; // Reset promise on error
    console.error('Error getting CSRF token:', error);
    throw error;
  });

  return csrfPromise;
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Add Bearer token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add CSRF token for state-changing requests
    if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')) {
      try {
        const token = await getCsrfToken();
        config.headers['X-CSRF-TOKEN'] = token;
      } catch (error) {
        console.error('Failed to get CSRF token:', error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle 419 CSRF token mismatch
    if (error.response?.status === 419) {
      console.error('CSRF token mismatch. Refreshing token...');
      
      // Clear cached token and retry request
      csrfToken = null;
      csrfPromise = null;
      
      try {
        // Get new CSRF token
        const newToken = await getCsrfToken();
        error.config.headers['X-CSRF-TOKEN'] = newToken;
        
        // Retry the original request
        return axiosInstance.request(error.config);
      } catch (retryError) {
        console.error('Failed to retry request with new CSRF token:', retryError);
      }
    }
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Optionally redirect to login
      // window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;