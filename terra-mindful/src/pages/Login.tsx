import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin, signup as apiSignup } from '../services/api';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        const data = await apiLogin(email, password);
        login(data);
        navigate('/');
      } else {
        await apiSignup(email, password);
        setError('Signup successful! Please check your email or log in.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 soft-gradient-bg">
      <div className="max-w-md w-full bg-surface-container-lowest p-card-padding rounded-xl shadow-2xl writing-shadow border border-outline-variant/5">
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-on-primary-container text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
          </div>
          <h1 className="font-h1 text-3xl mb-2">Thoughts</h1>
          <p className="font-body-md text-on-surface-variant uppercase tracking-widest text-[10px] font-label-caps">Deep Reflection</p>
        </div>

        <h2 className="font-h2 text-xl mb-8 text-center">{isLogin ? 'Welcome back' : 'Start your journey'}</h2>

        {error && (
          <div className={`mb-6 p-4 rounded-lg text-sm font-body-md ${error.includes('successful') ? 'bg-primary/10 text-primary' : 'bg-error-container text-on-error-container'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/20 rounded-full px-6 py-4 outline-none focus:border-primary transition-colors font-body-md"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/20 rounded-full px-6 py-4 outline-none focus:border-primary transition-colors font-body-md"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-on-primary py-4 rounded-full font-h3 shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-on-surface-variant font-body-md text-sm hover:text-primary transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
