// src/utils/csrfAxios.ts
import axiosInstance from './axiosInstance';

// Ambil token XSRF dari cookie
const getXsrfToken = () => {
  return decodeURIComponent(
    document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1] || ''
  );
};

export const csrfAxios = async (
  method: 'post' | 'put' | 'patch' | 'delete',
  url: string,
  data?: any
) => {
  // Ambil CSRF cookie (hanya pertama kali atau sebelum request penting)
  await axiosInstance.get('/sanctum/csrf-cookie');

  const xsrfToken = getXsrfToken();

  return axiosInstance({
    method,
    url,
    data,
    headers: {
      'X-XSRF-TOKEN': xsrfToken,
    },
  });
};
