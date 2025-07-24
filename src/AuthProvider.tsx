import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Ambil cookie
  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop()!.split(';').shift()!);
  };

  // Login
  const login = async (email: string, password: string) => {
    try {
      await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: 'include',
      });

      const xsrfToken = getCookie('XSRF-TOKEN');
      if (!xsrfToken) {
        throw new Error('CSRF token tidak ditemukan');
      }

      const loginResponse = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-XSRF-TOKEN': xsrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(data.message || 'Login gagal. Cek email dan password.');
      }

      // ✅ Cek ulang user dari endpoint /api/user
      await checkAuthStatus();

      console.log('Login berhasil! Redirecting to dashboard...');
      navigate('/', { replace: true });

    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      const xsrfToken = getCookie('XSRF-TOKEN');
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'X-XSRF-TOKEN': xsrfToken || '',
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      sessionStorage.removeItem('user');
      setUser(null);
      navigate('/auth/signin');
    }
  };

  // ✅ Cek status login saat komponen pertama kali render
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user', {
        credentials: 'include',
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Unauthorized');
      }

      const userData = await response.json();
      setUser(userData);
      sessionStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Auth check failed:', error);
      sessionStorage.removeItem('user');
      setUser(null);
      // Redirect hanya jika bukan di halaman login
      if (window.location.pathname !== '/auth/signin') {
        navigate('/auth/signin');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
    //  Tidak ada handleBeforeUnload — biarkan session Laravel awet
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
