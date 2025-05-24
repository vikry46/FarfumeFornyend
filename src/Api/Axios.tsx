import axios from 'axios';

// Buat instance axios dasar
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Tanpa tanda kutip, agar terbaca sebagai variabel
  withCredentials: true, // Penting untuk cookies Sanctum
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
});

// Interceptor untuk menangani CSRF Token
api.interceptors.request.use(
  async (config) => {
    const method = config.method?.toLowerCase() || 'get';

    // Hanya ambil CSRF untuk metode selain GET/HEAD dan bukan request csrf-cookie
    if (!['get', 'head'].includes(method) && !config.url?.includes('sanctum/csrf-cookie')) {
      try {
        await axios.get(`${import.meta.env.VITE_API_BASE_URL}/sanctum/csrf-cookie`, {
          withCredentials: true
        });
      } catch (error) {
        console.error('CSRF Error:', error);
        return Promise.reject(error);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
