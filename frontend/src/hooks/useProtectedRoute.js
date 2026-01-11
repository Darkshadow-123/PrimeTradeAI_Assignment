import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useProtectedRoute = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        navigate('/login');
      }
    }
  }, [token, navigate]);

  return token || localStorage.getItem('token');
};
