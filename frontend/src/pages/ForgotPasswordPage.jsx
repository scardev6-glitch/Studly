import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, KeyRound, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import PhoneWrapper from '../components/layout/PhoneWrapper';
import { useApp } from '../context/AppContext';
import { authApi } from '../services/api';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { showToast } = useApp();

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      setSent(true);
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '8px' }}>
          <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ padding: '8px', borderRadius: 'var(--radius-full)' }}>
            <ChevronLeft size={20} />
          </button>
          <span style={{ fontSize: '17px', fontWeight: 700 }}>Reset Password</span>
        </div>

        {sent ? (
          /* Success state */
          <div className="text-center" style={{ marginTop: '40px' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: 'var(--radius-full)', background: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', boxShadow: '0 8px 24px rgba(16,185,129,0.3)' }}>
              <CheckCircle size={36} />
            </div>
            <h2>Email Sent!</h2>
            <p style={{ marginTop: '8px', maxWidth: '280px', marginLeft: 'auto', marginRight: 'auto' }}>
              Check your inbox for the password reset link. It may take a few minutes to arrive.
            </p>
            <Link to="/login" className="btn btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>
              Back to Login <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          /* Form */
          <>
            <div className="text-center">
              <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-xl)', background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'white', boxShadow: '0 8px 24px rgba(99,102,241,0.3)' }}>
                <KeyRound size={28} />
              </div>
              <h1>Forgot Password?</h1>
              <p style={{ marginTop: '8px' }}>Enter your email and we'll send you a reset link</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="input-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} />
                  <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'} <ArrowRight size={18} />
              </button>
            </form>

            <p className="text-center" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Remember your password?{' '}
              <Link to="/login" style={{ fontWeight: 700, color: 'var(--primary)' }}>Log in</Link>
            </p>
          </>
        )}
      </div>
    </PhoneWrapper>
  );
}
