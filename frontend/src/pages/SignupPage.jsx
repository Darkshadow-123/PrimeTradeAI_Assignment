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

export default function SignupPage() {
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState('');
  const { setUser, setToken, isLoading } = useAuth();

  const form = useFormValidation({
    name: '',
    email: '',
    password: '',
  });

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("SUBMIT CLICKED");

  if (!form.validateForm()) {
    console.log("FORM INVALID", form.errors);
    return;
  }


    try {
      const response = await authService.signup(
        form.values.email,
        form.values.password,
        form.values.name
      );
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
        <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
        <p className="text-gray-600 mb-6">Create your account</p>

        {generalError && (
          <div className="mb-4">
            <Alert type="error" message={generalError} onClose={() => setGeneralError('')} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            label="Full Name"
            placeholder="John Doe"
            value={form.values.name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.name && form.errors.name}
            required
          />

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
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}

