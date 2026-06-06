import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext(null);

const MOCK_NOTIFICATIONS = [
  { _id: 'n1', type: 'review_reminder', title: 'Time to Review!', message: 'Algebra is due for review. A quick 5-minute session will lock it in.', link: '/study', isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { _id: 'n2', type: 'streak', title: 'Streak Saver', message: 'Your 7-day streak is on the line! One study session today keeps it alive.', link: '/study', isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
  { _id: 'n3', type: 'achievement', title: 'Milestone Unlocked!', message: 'You\'ve completed 5 topics this week. Keep the momentum!', link: '', isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { _id: 'n4', type: 'session_reminder', title: 'Study Session Ready', message: 'Your study session on Cell Biology is ready. Pick up where you left off.', link: '/study', isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
  { _id: 'n5', type: 'tip', title: 'Study Tip', message: 'Active recall beats re-reading. Try closing your notes and explaining the concept out loud.', link: '', isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() },
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [toast, setToast] = useState(null);

  // Load auth on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      try { setUser(JSON.parse(savedUser)); } catch {}
    }
  }, []);

  // Apply theme
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/notifications?limit=20', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      } else throw new Error('Failed');
    } catch {
      setNotifications(MOCK_NOTIFICATIONS);
      setUnreadCount(MOCK_NOTIFICATIONS.filter(n => !n.isRead).length);
    }
  }, [token]);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  const login = (newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const markNotifRead = async (id) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } });
    } catch {}
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllNotifRead = async () => {
    try {
      await fetch('/api/notifications/all/read', { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } });
    } catch {}
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const clearNotifications = async () => {
    try {
      await fetch('/api/notifications/all', { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    } catch {}
    setNotifications([]);
    setUnreadCount(0);
  };

  const value = {
    user, token, login, logout, isAuthenticated: !!token,
    theme, toggleTheme,
    notifications, unreadCount, fetchNotifications, markNotifRead, markAllNotifRead, clearNotifications,
    toast, showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
