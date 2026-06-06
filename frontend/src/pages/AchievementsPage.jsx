import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Star, Flame, Target, BookOpen, Zap, Moon, Crown, ArrowLeft, Users } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { leaderboardApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

const BADGES = [
  { id: 'b1', name: 'First Steps', description: 'Complete your first study session', icon: 'Zap', unlocked: true },
  { id: 'b2', name: 'Quick Learner', description: 'Complete 5 study sessions', icon: 'Star', unlocked: true },
  { id: 'b3', name: 'Streak Master', description: 'Maintain a 7-day streak', icon: 'Flame', unlocked: true },
  { id: 'b4', name: 'Knowledge Seeker', description: 'Study 3 different subjects', icon: 'BookOpen', unlocked: false },
  { id: 'b5', name: 'Quiz Champion', description: 'Score 100% on a quiz', icon: 'Trophy', unlocked: false },
  { id: 'b6', name: 'Dedicated Scholar', description: 'Complete 20 study sessions', icon: 'Medal', unlocked: false },
  { id: 'b7', name: 'Subject Master', description: 'Master all topics in a subject', icon: 'Award', unlocked: false },
  { id: 'b8', name: 'Night Owl', description: 'Study after midnight', icon: 'Moon', unlocked: false },
  { id: 'b9', name: 'Perfect Week', description: 'Study every day for a week', icon: 'Crown', unlocked: false },
  { id: 'b10', name: 'Century Club', description: 'Complete 100 study sessions', icon: 'Target', unlocked: false },
];

const MILESTONES = [
  { id: 'm1', title: '5 Study Sessions', description: 'Complete 5 study sessions to unlock this milestone', current: 3, total: 5 },
  { id: 'm2', title: '50 Quiz Questions', description: 'Answer 50 quiz questions correctly', current: 27, total: 50 },
  { id: 'm3', title: '100% Mastery', description: 'Achieve 100% mastery on any subject', current: 0, total: 1 },
  { id: 'm4', title: '30-Day Streak', description: 'Maintain a 30-day study streak', current: 7, total: 30 },
  { id: 'm5', title: '10 Hours Study Time', description: 'Accumulate 10 hours of total study time', current: 4.5, total: 10 },
];

const BADGE_ICONS = {
  Zap, Star, Flame, BookOpen, Trophy, Medal, Award, Moon, Crown, Target,
};

const MEDAL_ICONS = {
  1: Crown,
  2: Medal,
  3: Award,
};

const TABS = [
  { id: 'badges', label: 'Badges' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'leaderboard', label: 'Leaderboard' },
];

export default function AchievementsPage() {
  const { token, user } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('badges');
  const [leaderboard, setLeaderboard] = useState([]);
  const [lbLoading, setLbLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'leaderboard') {
      (async () => {
        setLbLoading(true);
        try {
          const data = await leaderboardApi.get(token);
          setLeaderboard(data.leaderboard || []);
        } catch {
          setLeaderboard([
            { _id: 'lb1', name: 'Sarah K.', points: 2840, rank: 1 },
            { _id: 'lb2', name: 'James M.', points: 2510, rank: 2 },
            { _id: 'lb3', name: 'Emma L.', points: 2230, rank: 3 },
            { _id: 'lb4', name: 'Your Name', points: 1950, rank: 4, isMe: true },
            { _id: 'lb5', name: 'Alex R.', points: 1800, rank: 5 },
          ]);
        } finally {
          setLbLoading(false);
        }
      })();
    }
  }, [activeTab, token]);

  return (
    <AppShell>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ padding: '6px', borderRadius: 'var(--radius-full)' }}>
          <ArrowLeft size={20} />
        </button>
        <h1 style={{ fontSize: '22px', margin: 0 }}>Achievements</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '20px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '14px 8px' }}>
          <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--primary)' }}>{user?.points || 1950}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Total Points</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '14px 8px' }}>
          <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--accent-orange)' }}>{user?.streak || 7}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Day Streak</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '14px 8px' }}>
          <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--accent-green)' }}>{BADGES.filter(b => b.unlocked).length}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Badges Earned</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ flex: 1, fontSize: '13px' }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'badges' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {BADGES.map(badge => {
            const Icon = BADGE_ICONS[badge.icon] || Zap;
            return (
              <div
                key={badge.id}
                className="card"
                style={{
                  padding: '16px',
                  textAlign: 'center',
                  opacity: badge.unlocked ? 1 : 0.5,
                  borderColor: badge.unlocked ? 'var(--primary)' : 'var(--border)',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: badge.unlocked ? 'var(--primary-bg)' : 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px',
                    color: badge.unlocked ? 'var(--primary)' : 'var(--text-muted)',
                  }}
                >
                  <Icon size={22} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{badge.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{badge.description}</div>
                <div style={{ marginTop: '8px' }}>
                  {badge.unlocked ? (
                    <span className="badge badge-success" style={{ fontSize: '10px' }}>Unlocked</span>
                  ) : (
                    <span className="badge" style={{ fontSize: '10px', background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>Locked</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'milestones' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {MILESTONES.map(m => {
            const progress = Math.min(m.current / m.total, 1);
            return (
              <div key={m.id} className="card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{m.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{m.description}</div>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)', whiteSpace: 'nowrap' }}>
                    {m.current}/{m.total}
                  </div>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progress * 100}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <>
          {lbLoading ? (
            <div className="loading">Loading leaderboard...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {leaderboard.map(entry => {
                const MedalIcon = MEDAL_ICONS[entry.rank];
                return (
                  <div
                    key={entry._id}
                    className="card"
                    style={{
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      borderColor: entry.isMe ? 'var(--primary)' : 'var(--border)',
                      background: entry.isMe ? 'var(--primary-bg)' : 'var(--bg-primary)',
                    }}
                  >
                    <div style={{ width: '28px', textAlign: 'center', fontWeight: 700, fontSize: '16px', color: 'var(--text-muted)' }}>
                      {MedalIcon ? <MedalIcon size={22} style={{ color: entry.rank === 1 ? '#f59e0b' : entry.rank === 2 ? '#94a3b8' : '#d97706' }} /> : `#${entry.rank}`}
                    </div>
                    <div className="avatar avatar-sm">{entry.name?.[0] || '?'}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600 }}>
                        {entry.name} {entry.isMe && <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 400 }}>(you)</span>}
                      </div>
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)' }}>{entry.points.toLocaleString()}</div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </AppShell>
  );
}
