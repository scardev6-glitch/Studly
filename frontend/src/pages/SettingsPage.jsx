import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Upload, Eye, EyeOff } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const TABS = ['Profile', 'Password', 'Notifications', 'Appearance', 'Danger Zone'];

const PASSWORD_STRENGTH = {
  0: { label: 'Weak', color: 'var(--accent-red)', width: '25%' },
  1: { label: 'Fair', color: 'var(--accent-orange)', width: '50%' },
  2: { label: 'Good', color: 'var(--accent-green)', width: '75%' },
  3: { label: 'Strong', color: 'var(--primary)', width: '100%' },
};

function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

export default function SettingsPage() {
  const { user, token, showToast, logout } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Profile');

  const [profile, setProfile] = useState({ name: user?.name || 'Your Name', email: user?.email || 'user@example.com' });
  const [password, setPassword] = useState({ current: '', newPw: '', confirm: '' });
  const [showPw, setShowPw] = useState({ current: false, newPw: false, confirm: false });
  const [notifs, setNotifs] = useState({ reminders: true, quizResults: true, streak: false, achievements: true, emailReports: false });
  const [appearance, setAppearance] = useState({ darkMode: false, fontSize: 'Medium', reduceAnimations: false, compactMode: false });
  const [deleteConfirm, setDeleteConfirm] = useState('');

  const handleProfileSave = () => {
    localStorage.setItem('user', JSON.stringify({ ...user, name: profile.name, email: profile.email }));
    showToast('Profile saved!', 'success');
  };

  const handlePasswordUpdate = () => {
    if (!password.current) { showToast('Enter your current password', 'error'); return; }
    if (password.newPw.length < 6) { showToast('New password must be at least 6 characters', 'error'); return; }
    if (password.newPw !== password.confirm) { showToast('Passwords do not match', 'error'); return; }
    showToast('Password updated!', 'success');
    setPassword({ current: '', newPw: '', confirm: '' });
  };

  const handleDeleteAccount = () => {
    if (deleteConfirm !== 'DELETE') { showToast('Type DELETE to confirm', 'error'); return; }
    showToast('Account deleted', 'success');
    logout();
    navigate('/login');
  };

  const toggleSwitch = (obj, setter, key) => {
    setter({ ...obj, [key]: !obj[key] });
  };

  const renderToggle = (label, value, onToggle) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-light)' }}>
      <span style={{ fontSize: '14px' }}>{label}</span>
      <div className={`toggle-switch ${value ? 'on' : ''}`} onClick={onToggle}></div>
    </div>
  );

  const renderPwField = (label, key, value) => (
    <div className="input-group" style={{ marginBottom: '14px' }}>
      <label>{label}</label>
      <div className="input-wrapper">
        <input
          type={showPw[key] ? 'text' : 'password'}
          value={value}
          onChange={e => setPassword({ ...password, [key]: e.target.value })}
          style={{ paddingRight: '40px' }}
        />
        <span className="input-suffix" onClick={() => setShowPw({ ...showPw, [key]: !showPw[key] })}>
          {showPw[key] ? <EyeOff size={16} /> : <Eye size={16} />}
        </span>
      </div>
    </div>
  );

  return (
    <AppShell>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ padding: '6px', borderRadius: 'var(--radius-full)' }}>
          <ArrowLeft size={20} />
        </button>
        <h1 style={{ fontSize: '22px', margin: 0 }}>Settings</h1>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {TABS.map(t => (
          <button
            key={t}
            className={`btn btn-sm ${activeTab === t ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '12px', padding: '8px 14px' }}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'Profile' && (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', cursor: 'pointer', border: '2px dashed var(--border)', position: 'relative' }}>
              <Upload size={22} style={{ color: 'var(--text-muted)' }} />
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tap to upload photo</span>
          </div>

          <div className="input-group" style={{ marginBottom: '14px' }}>
            <label>Name</label>
            <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
          </div>
          <div className="input-group" style={{ marginBottom: '20px' }}>
            <label>Email</label>
            <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
          </div>
          <button className="btn btn-primary btn-full" onClick={handleProfileSave}>
            <Save size={16} />
            Save Changes
          </button>
        </div>
      )}

      {activeTab === 'Password' && (
        <div>
          {renderPwField('Current Password', 'current', password.current)}
          {renderPwField('New Password', 'newPw', password.newPw)}
          {renderPwField('Confirm Password', 'confirm', password.confirm)}

          {password.newPw && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Password strength</span>
                <span style={{ fontWeight: 600, color: PASSWORD_STRENGTH[getStrength(password.newPw)].color }}>
                  {PASSWORD_STRENGTH[getStrength(password.newPw)].label}
                </span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: PASSWORD_STRENGTH[getStrength(password.newPw)].width, background: PASSWORD_STRENGTH[getStrength(password.newPw)].color }}></div>
              </div>
            </div>
          )}

          <button className="btn btn-primary btn-full" onClick={handlePasswordUpdate}>
            Update Password
          </button>
        </div>
      )}

      {activeTab === 'Notifications' && (
        <div>
          {renderToggle('Study Reminders', notifs.reminders, () => toggleSwitch(notifs, setNotifs, 'reminders'))}
          {renderToggle('Quiz Results', notifs.quizResults, () => toggleSwitch(notifs, setNotifs, 'quizResults'))}
          {renderToggle('Streak Reminders', notifs.streak, () => toggleSwitch(notifs, setNotifs, 'streak'))}
          {renderToggle('Achievement Alerts', notifs.achievements, () => toggleSwitch(notifs, setNotifs, 'achievements'))}
          {renderToggle('Email Reports', notifs.emailReports, () => toggleSwitch(notifs, setNotifs, 'emailReports'))}
        </div>
      )}

      {activeTab === 'Appearance' && (
        <div>
          {renderToggle('Dark Mode', appearance.darkMode, () => toggleSwitch(appearance, setAppearance, 'darkMode'))}

          <div className="input-group" style={{ marginBottom: '14px', marginTop: '14px' }}>
            <label>Font Size</label>
            <select
              value={appearance.fontSize}
              onChange={e => setAppearance({ ...appearance, fontSize: e.target.value })}
            >
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>

          {renderToggle('Reduce Animations', appearance.reduceAnimations, () => toggleSwitch(appearance, setAppearance, 'reduceAnimations'))}
          {renderToggle('Compact Mode', appearance.compactMode, () => toggleSwitch(appearance, setAppearance, 'compactMode'))}
        </div>
      )}

      {activeTab === 'Danger Zone' && (
        <div>
          <div style={{ border: '2px solid var(--accent-red)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
            <h3 style={{ color: 'var(--accent-red)', fontSize: '16px', marginBottom: '4px' }}>Danger Zone</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>Once you delete your account, there is no going back. Please be certain.</p>
            <div className="input-group" style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: 'var(--accent-red)' }}>Type DELETE to confirm</label>
              <input
                type="text"
                value={deleteConfirm}
                onChange={e => setDeleteConfirm(e.target.value)}
                placeholder='Type "DELETE"'
                style={{ borderColor: 'var(--accent-red)' }}
              />
            </div>
            <button
              className="btn btn-danger btn-full"
              onClick={handleDeleteAccount}
              disabled={deleteConfirm !== 'DELETE'}
            >
              Delete My Account
            </button>
          </div>
        </div>
      )}
    </AppShell>
  );
}
