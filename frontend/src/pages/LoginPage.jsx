import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, BookOpen, Mail, Lock, ArrowRight, Sun, Moon, Eye, EyeOff } from 'lucide-react';
import PhoneWrapper from '../components/layout/PhoneWrapper';
import { useApp } from '../context/AppContext';
import { authApi } from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, toggleTheme, theme, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authApi.login(email, password);
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PhoneWrapper>
      <div className="app-scroll" style={{ background: 'linear-gradient(180deg, var(--primary-bg) 0%, var(--bg-primary) 100%)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius)', background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Zap size={22} />
            </div>
            <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.03em' }}>Studly</span>
          </div>
          <button className="btn btn-ghost" onClick={toggleTheme} style={{ padding: '8px', borderRadius: 'var(--radius-full)' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Hero */}
        <div className="text-center" style={{ marginTop: '16px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-xl)', background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'white', boxShadow: '0 8px 24px rgba(99,102,241,0.3)' }}>
            <BookOpen size={28} />
          </div>
          <h1>Welcome Back!</h1>
          <p style={{ marginTop: '8px' }}>Log in to continue your learning journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="input-wrapper">
            <Mail size={18} />
            <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div className="input-wrapper">
            <Lock size={18} />
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <span className="input-suffix" onClick={() => setShowPassword(!showPassword)} style={{ pointerEvents: 'auto' }}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-8" style={{ cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>
              <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }} />
              Remember me
            </label>
            <Link to="/forgot-password" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>Forgot password?</Link>
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'} <ArrowRight size={18} />
          </button>
        </form>

        {/* Divider */}
        <div className="divider">or continue with</div>

        {/* Social buttons */}
        <div className="grid-2">
          <button type="button" className="btn btn-secondary" style={{ fontSize: '13px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>
          <button type="button" className="btn btn-secondary" style={{ fontSize: '13px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Facebook
          </button>
        </div>

        {/* Signup link */}
        <p className="text-center" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ fontWeight: 700, color: 'var(--primary)' }}>Create account</Link>
        </p>
      </div>
    </PhoneWrapper>
  );
}
