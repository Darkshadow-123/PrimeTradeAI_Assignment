import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/apiService';
import { getErrorMessage } from '../utils/helpers';
import { useFormValidation } from '../hooks/useFormValidation';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';

export default function LoginPage() {
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState('');
  const { setUser, setToken, isLoading } = useAuth();

  const form = useFormValidation({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (!form.validateForm()) {
      return;
    }

    try {
      const response = await authService.login(form.values.email, form.values.password);
      setToken(response.token);
      setUser(response.user);
      navigate('/dashboard');
    } catch (error) {
      setGeneralError(getErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2">Login</h1>
        <p className="text-gray-600 mb-6">Sign in to your account</p>

        {generalError && (
          <div className="mb-4">
            <Alert type="error" message={generalError} onClose={() => setGeneralError('')} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="you@example.com"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.email && form.errors.email}
            required
          />

          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="••••••••"
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.password && form.errors.password}
            required
          />

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-semibold">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}

