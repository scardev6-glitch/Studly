import React, { useState, useEffect, useRef, useCallback } from 'react';
import AppShell from '../components/layout/AppShell';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { progressApi } from '../services/api';
import {
  LayoutDashboard, BookOpen, Calendar, FileText, Sparkles, Trophy,
  Award, Flame, Zap, Brain, Play, Target, CheckCircle, Bell, Moon, Sun,
  Repeat, Clock, ChevronLeft, MessageCircle, Eye, EyeOff, AlertTriangle,
  LogOut, BookText, Layers, Lightbulb, Scale, Check, Sigma, Dna,
  FlaskConical, Atom, Globe, Landmark, TrendingUp, FileSpreadsheet,
  Briefcase, BarChart3, TreePine, Monitor,
  User, Settings, KeyRound, X
} from 'lucide-react';

const LEVEL_TITLES = {
  1: 'Beginner Scholar', 2: 'Curious Mind', 3: 'Knowledge Seeker',
  4: 'Dedicated Learner', 5: 'Rising Achiever', 6: 'Disciplined Student',
  7: 'Subject Explorer', 8: 'Academic Talent', 9: 'Master Thinker',
  10: 'Brilliant Scholar', 11: 'Knowledge Expert', 12: 'Academic Elite',
  13: 'Intellectual Star', 14: 'Learning Sage', 15: 'Genius Mind',
  16: 'Doctorate Level', 17: 'Professor Rank', 18: 'Nobel Candidate',
  19: 'Living Legend', 20: 'Grand Master',
};

const getXpForLevel = (lvl) => lvl * 100;

const STATS_MOCK = {
  points: 1250, currentStreak: 7, longestStreak: 14,
  averageMastery: 68, totalTopics: 12, totalQuizzes: 48,
  totalXp: 4200, gamificationLevel: 5, aiCredits: 12,
};

const GAME_MOCK = {
  level: 5, totalXp: 4200, aiCredits: 12, points: 1250,
  nextLevelXp: 500, currentLevelXp: 200, xpProgress: 40,
};

const TOPICS_MOCK = [
  { _id: 't1', topicId: { _id: 'tt1', name: 'Algebra Fundamentals', subject: 'Mathematics' }, masteryLevel: 85, weakSubtopics: ['Quadratic Equations', 'Polynomial Division'], totalAttempts: 14, nextReviewDate: new Date(Date.now() + 86400000).toISOString() },
  { _id: 't2', topicId: { _id: 'tt2', name: 'Cell Structure', subject: 'Biology' }, masteryLevel: 45, weakSubtopics: ['Mitochondria Function', 'Protein Synthesis'], totalAttempts: 8, nextReviewDate: new Date(Date.now() + 172800000).toISOString() },
  { _id: 't3', topicId: { _id: 'tt3', name: 'Chemical Bonding', subject: 'Chemistry' }, masteryLevel: 72, weakSubtopics: ['Covalent Bonds'], totalAttempts: 11, nextReviewDate: new Date(Date.now() + 259200000).toISOString() },
  { _id: 't4', topicId: { _id: 'tt4', name: 'Newton\'s Laws', subject: 'Physics' }, masteryLevel: 91, weakSubtopics: [], totalAttempts: 20, nextReviewDate: new Date(Date.now() - 86400000).toISOString() },
  { _id: 't5', topicId: { _id: 'tt5', name: 'World War II', subject: 'History' }, masteryLevel: 38, weakSubtopics: ['Causes of War', 'Post-War Reconstruction', 'The Holocaust'], totalAttempts: 5, nextReviewDate: new Date(Date.now() + 432000000).toISOString() },
];

export default function DashboardPage() {
  const { user, theme, toggleTheme, unreadCount, logout } = useApp();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpInfo, setLevelUpInfo] = useState({ prevLevel: 0, newLevel: 0 });
  const [showDropdown, setShowDropdown] = useState(false);
  const [xpProgress, setXpProgress] = useState(0);

  const dropdownRef = useRef(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const statsData = await progressApi.stats(token);
      setStats(statsData);
    } catch {
      const saved = localStorage.getItem('gamificationState');
      if (saved) {
        try { setStats(JSON.parse(saved)); } catch { setStats(STATS_MOCK); }
      } else {
        setStats(STATS_MOCK);
      }
    }

    try {
      const gameData = await progressApi.game(token);
      const savedLevel = localStorage.getItem('lastLevel');
      const prevLevel = savedLevel ? parseInt(savedLevel, 10) : null;
      if (prevLevel && gameData.level > prevLevel) {
        setLevelUpInfo({ prevLevel, newLevel: gameData.level });
        setShowLevelUp(true);
      }
      localStorage.setItem('lastLevel', String(gameData.level));
      setGameState(gameData);
      setXpProgress(gameData.xpProgress || 0);
      localStorage.setItem('gamificationState', JSON.stringify(gameData));
    } catch {
      const saved = localStorage.getItem('gamificationState');
      let gameData;
      if (saved) {
        try { gameData = JSON.parse(saved); } catch { gameData = GAME_MOCK; }
      } else {
        gameData = GAME_MOCK;
      }
      const savedLevel = localStorage.getItem('lastLevel');
      const prevLevel = savedLevel ? parseInt(savedLevel, 10) : null;
      if (prevLevel && gameData.level > prevLevel) {
        setLevelUpInfo({ prevLevel, newLevel: gameData.level });
        setShowLevelUp(true);
      }
      localStorage.setItem('lastLevel', String(gameData.level));
      setGameState(gameData);
      setXpProgress(gameData.xpProgress || 0);
    }

    try {
      const topicsData = await progressApi.topics(token);
      setTopics(topicsData);
    } catch {
      setTopics(TOPICS_MOCK);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [showDropdown]);

  const level = gameState?.level || stats?.gamificationLevel || 1;
  const xpForNext = getXpForLevel(level);
  const xpInLevel = gameState?.currentLevelXp ?? 0;
  const displayName = user?.fullname || user?.name || 'Learner';
  const initial = displayName.charAt(0).toUpperCase();

  const getLevelTitle = (lvl) => LEVEL_TITLES[lvl] || 'Grand Master';

  const getMasteryColor = (val) => {
    if (val >= 80) return '#10b981';
    if (val >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const quickActions = [
    { icon: Play, label: 'Study Now', color: '#6366f1', bg: '#eef2ff' },
    { icon: Calendar, label: 'Plan Today', color: '#06b6d4', bg: '#ecfeff' },
    { icon: FileText, label: 'My Notes', color: '#8b5cf6', bg: '#f5f3ff' },
    { icon: Target, label: 'Practice Quiz', color: '#10b981', bg: '#ecfdf5' },
  ];

  if (loading) {
    return (
      <AppShell>
        <div className="loading">
          <div className="spinner" />
          Loading dashboard...
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div style={{ paddingBottom: 24 }}>
        {/* ── Dashboard Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.2 }}>
              Hey, {displayName}!
            </h1>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
              Track your learning journey
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }} ref={dropdownRef}>
            <div className="badge badge-primary" style={{ gap: 4 }}>
              <Award size={14} />
              {gameState?.points ?? stats?.points ?? 0}
            </div>
            <div className="badge badge-warning" style={{ gap: 4 }}>
              <Flame size={14} />
              {stats?.currentStreak ?? 0}
            </div>
            <div className="badge badge-success" style={{ gap: 4 }}>
              <Zap size={14} />
              Lv. {level}
            </div>

            <button
              className="btn-ghost"
              style={{ position: 'relative', padding: 6, borderRadius: 'var(--radius-full)', background: 'var(--bg-secondary)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="notif-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
              )}
            </button>

            <button
              className="btn-ghost"
              onClick={toggleTheme}
              style={{ padding: 6, borderRadius: 'var(--radius-full)', background: 'var(--bg-secondary)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div
              className="avatar avatar-sm"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowDropdown(prev => !prev)}
            >
              {initial}
            </div>

            {showDropdown && (
              <div
                className="card"
                style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: 8, zIndex: 100,
                  minWidth: 200, padding: 8, boxShadow: 'var(--shadow-xl)',
                }}
              >
                <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{user?.fullname || user?.name || 'Learner'}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user?.email || 'learner@studly.app'}</div>
                </div>
                <div className="dropdown-link" onClick={() => { setShowDropdown(false); navigate('/settings'); }}>
                  <User size={16} />
                  Profile
                </div>
                <div className="dropdown-link" onClick={() => { setShowDropdown(false); navigate('/settings'); }}>
                  <Settings size={16} />
                  Settings
                </div>
                <div className="dropdown-link" onClick={() => { setShowDropdown(false); navigate('/achievements'); }}>
                  <Award size={16} />
                  Achievements
                </div>
                <div className="dropdown-link" onClick={() => { setShowDropdown(false); navigate('/progress'); }}>
                  <BarChart3 size={16} />
                  Progress
                </div>
                <div style={{ borderTop: '1px solid var(--border)', marginTop: 4, paddingTop: 4 }}>
                  <div className="dropdown-link logout" onClick={logout}>
                    <LogOut size={16} />
                    Logout
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Level Card ── */}
        <div
          className="card"
          style={{
            padding: 0, overflow: 'hidden', marginBottom: 16,
            border: '1px solid transparent',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            backgroundImage: `
              linear-gradient(var(--bg-primary), var(--bg-primary)),
              linear-gradient(135deg, #6366f1, #06b6d4, #8b5cf6)
            `,
          }}
        >
          <div style={{ padding: 20, paddingBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white',
                }}>
                  <Zap size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>Level {level}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {getLevelTitle(level)}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>
                  {xpInLevel} / {xpForNext} XP
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                  {gameState?.totalXp ?? 0} total XP
                </div>
              </div>
            </div>

            <div className="progress-track" style={{ height: 8, position: 'relative', marginBottom: 4 }}>
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(100, xpProgress)}%`,
                  background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
                }}
              />
              <div style={{
                position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
                width: 14, height: 14, borderRadius: '50%', border: '3px solid var(--bg-primary)',
                background: xpProgress >= 100 ? '#10b981' : 'var(--bg-tertiary)',
                zIndex: 2,
              }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-secondary)' }}>
                  {gameState?.aiCredits ?? stats?.aiCredits ?? 0}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>AI Credits</div>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-secondary)' }}>
                  {gameState?.points ?? stats?.points ?? 0}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>Points</div>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--accent-orange)' }}>
                  <Flame size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} />
                  {stats?.currentStreak ?? 0}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>Day Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid-3" style={{ marginBottom: 20 }}>
          <div className="card" style={{ textAlign: 'center', padding: '16px 8px' }}>
            <div style={{ color: '#6366f1', marginBottom: 6 }}>
              <Brain size={24} style={{ display: 'inline' }} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 20 }}>{stats?.averageMastery ?? 0}%</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Mastery</div>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '16px 8px' }}>
            <div style={{ color: '#06b6d4', marginBottom: 6 }}>
              <BookOpen size={24} style={{ display: 'inline' }} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 20 }}>{stats?.totalTopics ?? 0}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Topics</div>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '16px 8px' }}>
            <div style={{ color: '#10b981', marginBottom: 6 }}>
              <CheckCircle size={24} style={{ display: 'inline' }} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 20 }}>{stats?.totalQuizzes ?? 0}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Quizzes</div>
          </div>
        </div>

        {/* ── Quick Actions ── */}
        <div className="grid-2" style={{ marginBottom: 24 }}>
          {quickActions.map(({ icon: Icon, label, color, bg }) => (
            <button
              key={label}
              className="card"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                padding: '20px 12px', cursor: 'pointer',
                background: 'var(--bg-primary)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 'var(--radius)',
                background: bg, display: 'flex', alignItems: 'center',
                justifyContent: 'center', color,
              }}>
                <Icon size={22} />
              </div>
              <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* ── Topic Progress Section ── */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Topic Progress</h3>
            <button className="btn-ghost" style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, padding: '4px 8px', border: 'none', background: 'none', cursor: 'pointer' }}>
              View all
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {topics.map((topic) => {
              const mastery = topic.masteryLevel ?? 0;
              const color = getMasteryColor(mastery);
              const weak = topic.weakSubtopics || [];
              const nextReview = topic.nextReviewDate ? new Date(topic.nextReviewDate) : null;
              const isOverdue = nextReview && nextReview < new Date();
              const subjectName = topic.topicId?.subject || 'General';
              const topicName = topic.topicId?.name || 'Unknown Topic';

              return (
                <div key={topic._id} className="card" style={{ padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--primary)', marginBottom: 2 }}>
                        {subjectName}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{topicName}</div>
                    </div>
                    <div style={{
                      fontWeight: 700, fontSize: 16, color,
                    }}>
                      {mastery}%
                    </div>
                  </div>

                  <div className="progress-track" style={{ marginBottom: 8 }}>
                    <div
                      className="progress-fill"
                      style={{
                        width: `${mastery}%`,
                        background: mastery >= 80
                          ? 'linear-gradient(90deg, #10b981, #34d399)'
                          : mastery >= 50
                          ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                          : 'linear-gradient(90deg, #ef4444, #f87171)',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <span className="badge badge-primary" style={{ fontSize: 10, padding: '2px 8px' }}>
                        <Repeat size={10} />
                        {topic.totalAttempts ?? 0} attempts
                      </span>
                      {nextReview && (
                        <span className={`badge ${isOverdue ? 'badge-danger' : 'badge-warning'}`} style={{ fontSize: 10, padding: '2px 8px' }}>
                          <Clock size={10} />
                          {isOverdue ? 'Overdue' : nextReview.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>

                  {weak.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap', marginTop: 6 }}>
                      <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>Weak:</span>
                      {weak.map((w, i) => (
                        <span key={i} className="badge badge-danger" style={{ fontSize: 9, padding: '1px 6px' }}>
                          <AlertTriangle size={9} />
                          {w}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Level-Up Modal ── */}
      {showLevelUp && (
        <div className="modal-overlay active" onClick={() => setShowLevelUp(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
              <div style={{
                width: 72, height: 72, borderRadius: 'var(--radius-xl)',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px', color: 'white',
              }}>
                <Zap size={36} />
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Level Up!</h2>
              <p style={{ fontSize: 14, marginBottom: 4 }}>
                You reached <strong style={{ color: 'var(--primary)' }}>Level {levelUpInfo.newLevel}</strong>
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                {getLevelTitle(levelUpInfo.newLevel)}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Rewards Unlocked</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 'var(--radius)', background: 'var(--bg-secondary)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 'var(--radius)', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                    <Zap size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>+{getXpForLevel(levelUpInfo.newLevel)} XP to next level</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>New milestone unlocked</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 'var(--radius)', background: 'var(--bg-secondary)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 'var(--radius)', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                    <Award size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>+5 AI Credits</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Keep learning with AI assistance</div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary btn-full"
              style={{ marginTop: 20 }}
              onClick={() => setShowLevelUp(false)}
            >
              Continue Learning
            </button>
          </div>
        </div>
      )}
    </AppShell>
  );
}
