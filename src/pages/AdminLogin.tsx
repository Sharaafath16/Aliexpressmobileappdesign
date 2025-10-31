import { useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner@2.0.3';
import { supabase } from '../lib/supabase';

interface AdminLoginProps {
  onLoginSuccess: (admin: any) => void;
  onCancel: () => void;
}

export function AdminLogin({ onLoginSuccess, onCancel }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, name, role')
        .eq('email', email)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) {
        toast.error('Invalid credentials');
        setIsLoading(false);
        return;
      }

      if (password === 'admin123@') {
        const admin = {
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role,
        };
        localStorage.setItem('adminUser', JSON.stringify(admin));
        toast.success('Login successful!');
        onLoginSuccess(admin);
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-2">Access administrator dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-2 rounded-lg font-semibold transition-all"
          >
            {isLoading ? 'Logging in...' : 'Login to Admin Panel'}
          </Button>
        </form>

        <div className="pt-4 border-t">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="w-full"
          >
            Back to App
          </Button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Demo Credentials:</p>
          <p className="font-mono text-xs mt-1">
            Email: admin@gmail.com<br />
            Password: admin123@
          </p>
        </div>
      </div>
    </div>
  );
}
