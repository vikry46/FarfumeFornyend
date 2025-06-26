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
  const [isLoading, setIsLoading] = useState(true); // Loading state untuk cek initial auth
  const navigate = useNavigate();

  // Fungsi untuk mendapatkan cookie
  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop()!.split(';').shift()!);
  };

  // Fungsi login
  const login = async (email: string, password: string) => {
    try {
      // 1. Ambil CSRF cookie dari Sanctum
      const csrfResponse = await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: 'include',
      });

      if (!csrfResponse.ok) {
        throw new Error('Gagal mendapatkan CSRF token');
      }

      // 2. Ambil token XSRF dari cookie
      const xsrfToken = getCookie('XSRF-TOKEN');
      if (!xsrfToken) {
        throw new Error('CSRF token tidak ditemukan');
      }

      // 3. Kirim permintaan login
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

      // 4. Simpan user dan token ke localStorage dan state
      sessionStorage.setItem('user', JSON.stringify(data.user));
      sessionStorage.setItem('token', 'authenticated'); // Simple token indicator
      setUser(data.user);
      
      console.log('Login berhasil! Redirecting to dashboard...');
      
      // 5. Navigate ke dashboard
      navigate('/', { replace: true });

    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Fungsi logout
  const logout = async () => {
    try {
      // Panggil logout endpoint di Laravel
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Hapus data lokal dan redirect
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      setUser(null);
      navigate('/auth/signin');
    }
  };

  // Cek status login saat komponen pertama kali render
    useEffect(() => {
      const checkAuthStatus = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/users', {
            credentials: 'include',
            headers: {
              Accept: 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Unauthorized');
          }

          const userData = await response.json();
          setUser(userData);
          sessionStorage.setItem('user', JSON.stringify(userData));
          sessionStorage.setItem('token', 'authenticated');
        } catch (error) {
          console.error('Auth check failed:', error);
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('token');
          setUser(null);
          navigate('/auth/signin');
        } finally {
          setIsLoading(false);
        }
      };

      // Event listener untuk clear session saat browser ditutup
      const handleBeforeUnload = async () => {
        try {
          // Panggil logout API untuk clear session di server
          await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
              Accept: 'application/json',
            },
          });
        } catch (error) {
          console.error('Auto logout error:', error);
        }
        
        // Clear session storage
        sessionStorage.clear();
      };

      // Tambahkan event listeners
      window.addEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('unload', handleBeforeUnload);

      checkAuthStatus();

      // Cleanup
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.removeEventListener('unload', handleBeforeUnload);
      };
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