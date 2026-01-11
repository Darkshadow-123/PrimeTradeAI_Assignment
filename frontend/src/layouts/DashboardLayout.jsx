import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/apiService';
import { getErrorMessage } from '../utils/helpers';
import Header from '../components/Header';
import Loading from '../components/Loading';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { user, token, setUser, setToken, logout, isLoading } = useAuth();

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');

      if (!storedToken && !token) {
        navigate('/login');
        return;
      }

      if (storedToken && !token) {
        setToken(storedToken);
      }

      if ((storedToken || token) && !user) {
        try {
          const profile = await authService.getProfile();
          setUser(profile.user);
        } catch (error) {
          console.error('Failed to load profile:', getErrorMessage(error));
          logout();
          navigate('/login');
        }
      }
    };

    initAuth();
  }, [token, user, setToken, setUser, logout, navigate]);

  if (isLoading || !user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

