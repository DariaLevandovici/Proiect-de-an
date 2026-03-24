import { useState } from 'react';
import { User, Users, Mail, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router';

export function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<'client' | 'staff'>('client');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData.email, formData.password, loginType);
    
    if (loginType === 'client') {
      navigate('/dashboard/client');
    } else {
      // Redirect based on staff role
      if (formData.email.includes('waiter')) {
        navigate('/dashboard/waiter');
      } else if (formData.email.includes('cook')) {
        navigate('/dashboard/cook');
      } else {
        navigate('/dashboard/manager');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        {/* Login Type Selection */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setLoginType('client')}
            className={`p-6 rounded-2xl border-2 transition-all ${
              loginType === 'client'
                ? 'bg-blue-900/30 border-blue-600'
                : 'bg-[#242424] border-gray-800'
            }`}
          >
            <User className={`w-10 h-10 mx-auto mb-3 ${loginType === 'client' ? 'text-blue-400' : 'text-gray-400'}`} />
            <h3 className="text-white font-bold">Client</h3>
          </button>

          <button
            onClick={() => setLoginType('staff')}
            className={`p-6 rounded-2xl border-2 transition-all ${
              loginType === 'staff'
                ? 'bg-blue-900/30 border-blue-600'
                : 'bg-[#242424] border-gray-800'
            }`}
          >
            <Users className={`w-10 h-10 mx-auto mb-3 ${loginType === 'staff' ? 'text-blue-400' : 'text-gray-400'}`} />
            <h3 className="text-white font-bold">Staff</h3>
          </button>
        </div>

        {/* Login Form */}
        <div className="bg-[#242424] rounded-2xl p-8 border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-white mb-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>Email</span>
              </label>
              <input
                type="email"
                required
                placeholder={loginType === 'staff' ? 'waiter@gastroflow.md / cook@gastroflow.md / manager@gastroflow.md' : 'your@email.com'}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-600 outline-none placeholder-gray-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-white mb-3">
                <Lock className="w-5 h-5 text-blue-400" />
                <span>Password</span>
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-600 outline-none placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-600 text-white py-4 rounded-full font-bold transition-colors"
            >
              Sign In
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-400 mb-2">Demo Credentials:</p>
            <div className="text-xs text-gray-500 space-y-1">
              {loginType === 'client' ? (
                <p>Client: client@demo.com / password</p>
              ) : (
                <>
                  <p>Waiter: waiter@gastroflow.md / pass</p>
                  <p>Cook: cook@gastroflow.md / pass</p>
                  <p>Manager: manager@gastroflow.md / pass</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
