import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">PrimeTrade AI</h1>
          <p className="text-blue-100 text-sm">Task Management Dashboard</p>
          <p className="text-blue-50 text-xs">made by: Rishi Lalwani</p>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">{user.name}</p>
              <p className="text-blue-100 text-sm">{user.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="secondary"
              size="sm"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
