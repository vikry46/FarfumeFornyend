// src/utils/axiosBase.ts
import axios from 'axios';

const axiosBase = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, 
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosBase;
