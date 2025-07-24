import { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';


type User = {
  id: string;
  name: string;
  permissions: string[];
};

export const useAuth = () => {
  // 2️⃣ Gunakan tipenya di useState
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const res = await axios.get('/me');
    setUser(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 3️⃣ Sekarang TypeScript tahu user?.permissions valid
  const hasPermission = (permission: string) => {
    return user?.permissions?.includes(permission);
  };

  return { user, hasPermission };
};
