import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Calendar, FileText, Sparkles, Trophy } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/study', label: 'Study', icon: BookOpen },
  { path: '/planner', label: 'Planner', icon: Calendar },
  { path: '/notes', label: 'Notes', icon: FileText },
  { path: '/ai-assistant', label: 'AI', icon: Sparkles },
  { path: '/achievements', label: 'Achievements', icon: Trophy },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="desktop-footer">
      {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
        <button
          key={path}
          className={`nav-item ${location.pathname === path ? 'active' : ''}`}
          onClick={() => navigate(path)}
        >
          <Icon size={20} />
          <span className="nav-label">{label}</span>
        </button>
      ))}
    </nav>
  );
}
