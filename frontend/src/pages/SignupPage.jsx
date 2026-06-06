import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Sun, Moon, UserPlus, User, Mail, Lock, Sparkles, Eye, EyeOff, Check } from 'lucide-react';
import PhoneWrapper from '../components/layout/PhoneWrapper';
import { useApp } from '../context/AppContext';
import { authApi } from '../services/api';

const EGCSE_SUBJECTS = [
  'Mathematics', 'English Language', 'Setswana',
  'Biology', 'Chemistry', 'Physics',
  'Agriculture', 'Accounting', 'Commerce',
  'Geography', 'History', 'Religious Education',
  'Art', 'Design & Technology', 'Food & Nutrition',
  'Fashion & Fabrics', 'Music', 'Physical Education',
];

function getPasswordStrength(pw) {
  if (pw.length === 0) return null;
  if (pw.length < 6) return { label: 'Weak', color: 'var(--accent-red)', pct: 33 };
  if (pw.length < 10) return { label: 'Medium', color: 'var(--accent-orange)', pct: 66 };
  return { label: 'Strong', color: 'var(--accent-green)', pct: 100 };
}

export default function SignupPage() {
  const navigate = useNavigate();
  const { toggleTheme, theme, showToast, login } = useApp();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [educationLevel, setEducationLevel] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(password);

  const toggleSubject = (subject) => {
    setSelectedSubjects(prev =>
      prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!educationLevel) {
      showToast('Please select your education level', 'error');
      return;
    }
    if (selectedSubjects.length === 0) {
      showToast('Please select at least one subject', 'error');
      return;
    }
    setLoading(true);
    try {
      const data = await authApi.signup({ fullname, email, password, level: (educationLevel || '').toLowerCase(), subjects: selectedSubjects });
      login(data.token, data.user);
      navigate('/dashboard');
      showToast('Welcome to Studly!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PhoneWrapper>
      <div className="app-scroll" style={{ background: 'linear-gradient(180deg, var(--primary-bg) 0%, var(--bg-primary) 100%)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
          <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ padding: '8px', borderRadius: 'var(--radius-full)' }}>
            <ChevronLeft size={20} />
          </button>
          <span style={{ fontSize: '17px', fontWeight: 700 }}>Create Account</span>
          <button className="btn btn-ghost" onClick={toggleTheme} style={{ padding: '8px', borderRadius: 'var(--radius-full)' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Hero */}
        <div className="text-center">
          <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-xl)', background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: 'white', boxShadow: '0 8px 24px rgba(99,102,241,0.3)' }}>
            <UserPlus size={28} />
          </div>
          <h1>Join Studly</h1>
          <p style={{ marginTop: '6px' }}>Create your account and start learning</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Full name */}
          <div className="input-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <User size={18} />
              <input type="text" placeholder="Enter your full name" value={fullname} onChange={e => setFullname(e.target.value)} required />
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input type={showPassword ? 'text' : 'password'} placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
              <span className="input-suffix" onClick={() => setShowPassword(!showPassword)} style={{ pointerEvents: 'auto' }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {strength && (
              <div style={{ marginTop: '6px' }}>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${strength.pct}%`, background: strength.color, borderRadius: 'var(--radius-full)' }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: strength.color, marginTop: '4px', display: 'block' }}>{strength.label}</span>
              </div>
            )}
          </div>

          {/* Education level */}
          <div className="input-group">
            <label>Education Level</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {['JC', 'EGCSE'].map(level => (
                <button
                  key={level}
                  type="button"
                  className="card"
                  onClick={() => setEducationLevel(level)}
                  style={{
                    padding: '14px', textAlign: 'center', cursor: 'pointer', border: `2px solid ${educationLevel === level ? 'var(--primary)' : 'var(--border)'}`,
                    background: educationLevel === level ? 'var(--primary-bg)' : 'var(--bg-primary)',
                    fontWeight: 700, fontSize: '15px', color: educationLevel === level ? 'var(--primary)' : 'var(--text-primary)',
                    transition: 'var(--transition)',
                  }}
                >
                  {level === 'JC' ? 'Junior Certificate' : 'EGCSE'}
                  <span style={{ display: 'block', fontSize: '11px', fontWeight: 400, color: 'var(--text-muted)', marginTop: '4px' }}>
                    {level === 'JC' ? 'Form 3' : 'Form 5'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Subjects */}
          <div className="input-group">
            <label>Select Your Subjects ({selectedSubjects.length}/18)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {EGCSE_SUBJECTS.map(subject => {
                const selected = selectedSubjects.includes(subject);
                return (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => toggleSubject(subject)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '8px 14px', borderRadius: 'var(--radius-full)',
                      border: `1.5px solid ${selected ? 'var(--primary)' : 'var(--border)'}`,
                      background: selected ? 'var(--primary-bg)' : 'var(--bg-primary)',
                      color: selected ? 'var(--primary)' : 'var(--text-secondary)',
                      fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                      transition: 'var(--transition)',
                    }}
                  >
                    <div style={{
                      width: '16px', height: '16px', borderRadius: '3px',
                      border: `1.5px solid ${selected ? 'var(--primary)' : 'var(--text-muted)'}`,
                      background: selected ? 'var(--primary)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'var(--transition)',
                    }}>
                      {selected && <Check size={10} color="white" />}
                    </div>
                    {subject}
                  </button>
                );
              })}
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'} <Sparkles size={18} />
          </button>
        </form>

        {/* Login link */}
        <p className="text-center" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ fontWeight: 700, color: 'var(--primary)' }}>Log in</Link>
        </p>
      </div>
    </PhoneWrapper>
  );
}
