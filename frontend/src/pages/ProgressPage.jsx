import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, TrendingUp, Flame, AlertTriangle, BookOpen, CheckCircle,
  Clock, Brain, Target, Award, Zap, BarChart3, Repeat, Calendar
} from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { progressApi } from '../services/api';

const TABS = ['Streaks', 'Weak Points', 'Topic Mastery', 'Activity'];

export default function ProgressPage() {
  const { token } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Streaks');
  const [stats, setStats] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const statsData = await progressApi.stats(token);
      setStats(statsData);
    } catch {
      setStats(null);
    }

    try {
      const topicsData = await progressApi.topics(token);
      setTopics(topicsData);
    } catch {
      setTopics([]);
    }

    setLoading(false);
  }, [token]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const getMasteryColor = (val) => {
    if (val >= 80) return '#10b981';
    if (val >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getStreakStatus = (days) => {
    if (days >= 30) return { label: 'On Fire!', color: 'var(--accent-orange)', icon: '🔥' };
    if (days >= 14) return { label: 'Strong', color: 'var(--accent-green)', icon: '💪' };
    if (days >= 7) return { label: 'Good', color: '#06b6d4', icon: '👍' };
    if (days >= 1) return { label: 'Getting Started', color: 'var(--text-muted)', icon: '🌱' };
    return { label: 'Start Today!', color: 'var(--accent-red)', icon: '⚡' };
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().getDay();
  const weekStart = today === 0 ? 6 : today - 1;

  if (loading) {
    return (
      <AppShell>
        <div className="loading">
          <div className="spinner" />
          Loading progress...
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div style={{ paddingBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ padding: '6px', borderRadius: 'var(--radius-full)' }}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: '22px', margin: 0 }}>Progress</h1>
        </div>

        {/* Stats Summary */}
        <div className="grid-3" style={{ marginBottom: '16px' }}>
          <div className="card" style={{ textAlign: 'center', padding: '14px 8px' }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--primary)' }}>
              {stats?.currentStreak ?? 0}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              <Flame size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} />
              Day Streak
            </div>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '14px 8px' }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--accent-green)' }}>
              {stats?.averageMastery ?? 0}%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              <Brain size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} />
              Avg Mastery
            </div>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '14px 8px' }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--accent-orange)' }}>
              {stats?.totalQuizzes ?? 0}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              <CheckCircle size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} />
              Quizzes
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {TABS.map(t => (
            <button
              key={t}
              className={`btn btn-sm ${activeTab === t ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '12px', padding: '8px 14px', flex: 1 }}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Streaks Tab ── */}
        {activeTab === 'Streaks' && (
          <div>
            <div className="card" style={{ padding: '20px', marginBottom: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>
                {stats?.currentStreak >= 30 ? '🔥' : stats?.currentStreak >= 14 ? '💪' : stats?.currentStreak >= 7 ? '👍' : stats?.currentStreak >= 1 ? '🌱' : '⚡'}
              </div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary)' }}>
                {stats?.currentStreak ?? 0}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
                {getStreakStatus(stats?.currentStreak || 0).label}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                Longest streak: <strong>{stats?.longestStreak ?? 0}</strong> days
              </div>
            </div>

            {/* Weekly Calendar */}
            <div className="card" style={{ padding: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} />
                This Week
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
                {weekDays.map((day, i) => {
                  const dayOffset = (i - weekStart + 7) % 7;
                  const date = new Date();
                  date.setDate(date.getDate() - dayOffset);
                  const isToday = dayOffset === 0;
                  const isActive = false;
                  return (
                    <div key={day} style={{ textAlign: 'center', flex: 1 }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '50%', margin: '0 auto 4px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '13px', fontWeight: isToday ? 800 : 500,
                        background: isToday ? 'var(--primary)' : isActive ? 'var(--accent-green)' : 'var(--bg-tertiary)',
                        color: isToday ? 'white' : isActive ? 'white' : 'var(--text-muted)',
                      }}>
                        {date.getDate()}
                      </div>
                      <div style={{ fontSize: '9px', color: isToday ? 'var(--primary)' : 'var(--text-muted)', fontWeight: isToday ? 700 : 400 }}>
                        {day}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Streak Milestones */}
            <div style={{ marginTop: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>Streak Milestones</h3>
              {[
                { days: 7, label: '7-Day Streak', reward: '+50 XP', achieved: (stats?.currentStreak ?? 0) >= 7 },
                { days: 14, label: '14-Day Streak', reward: '+100 XP', achieved: (stats?.currentStreak ?? 0) >= 14 },
                { days: 30, label: '30-Day Streak', reward: '+300 XP, Badge', achieved: (stats?.currentStreak ?? 0) >= 30 },
                { days: 60, label: '60-Day Streak', reward: '+500 XP, Title', achieved: (stats?.currentStreak ?? 0) >= 60 },
                { days: 100, label: '100-Day Streak', reward: '+1000 XP, Legend Badge', achieved: (stats?.currentStreak ?? 0) >= 100 },
              ].map((milestone) => (
                <div
                  key={milestone.days}
                  className="card"
                  style={{
                    padding: '12px 16px', marginBottom: '8px',
                    display: 'flex', alignItems: 'center', gap: '12px',
                    borderColor: milestone.achieved ? 'var(--accent-green)' : 'var(--border)',
                    opacity: milestone.achieved ? 1 : 0.6,
                  }}
                >
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: milestone.achieved ? '#d1fae5' : 'var(--bg-tertiary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {milestone.achieved ? (
                      <CheckCircle size={18} color="var(--accent-green)" />
                    ) : (
                      <Target size={18} color="var(--text-muted)" />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{milestone.label}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{milestone.reward}</div>
                  </div>
                  <div style={{
                    fontSize: '20px',
                    filter: milestone.achieved ? 'none' : 'grayscale(1)',
                  }}>
                    {milestone.achieved ? '🏆' : '🔒'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Weak Points Tab ── */}
        {activeTab === 'Weak Points' && (
          <div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Topics and subtopics that need more practice. Focus here to improve your mastery.
            </p>
            {topics.filter(t => t.weakSubtopics?.length > 0 || t.masteryLevel < 80).length === 0 ? (
              <div className="empty-state">
                <Award size={48} color="var(--accent-green)" />
                <h3>No Weak Areas</h3>
                <p>Great job! You're on top of everything.</p>
              </div>
            ) : (
              topics
                .filter(t => t.weakSubtopics?.length > 0 || t.masteryLevel < 80)
                .sort((a, b) => a.masteryLevel - b.masteryLevel)
                .map((topic) => {
                  const mastery = topic.masteryLevel ?? 0;
                  const color = getMasteryColor(mastery);
                  const subjectName = topic.topicId?.subject || 'General';
                  const topicName = topic.topicId?.name || 'Unknown Topic';
                  const weakSubtopics = topic.weakSubtopics || [];

                  return (
                    <div key={topic._id} className="card" style={{ padding: '16px', marginBottom: '10px', borderLeft: `4px solid ${color}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary)', marginBottom: '2px' }}>
                            {subjectName}
                          </div>
                          <div style={{ fontWeight: 700, fontSize: '14px' }}>{topicName}</div>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '20px', color }}>
                          {mastery}%
                        </div>
                      </div>

                      <div className="progress-track" style={{ marginBottom: '10px' }}>
                        <div className="progress-fill" style={{
                          width: `${mastery}%`,
                          background: mastery >= 80 ? 'linear-gradient(90deg, #10b981, #34d399)' :
                                        mastery >= 50 ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' :
                                        'linear-gradient(90deg, #ef4444, #f87171)',
                        }} />
                      </div>

                      {weakSubtopics.length > 0 && (
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-red)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <AlertTriangle size={12} />
                            Weak Subtopics
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {weakSubtopics.map((w, i) => (
                              <span key={i} className="badge badge-danger" style={{ fontSize: '11px', padding: '4px 10px' }}>
                                {w}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {topic.nextReviewDate && (
                        <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={11} />
                          Next review: {new Date(topic.nextReviewDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      )}
                    </div>
                  );
                })
            )}
          </div>
        )}

        {/* ── Topic Mastery Tab ── */}
        {activeTab === 'Topic Mastery' && (
          <div>
            <div className="grid-3" style={{ marginBottom: '16px' }}>
              <div className="card" style={{ textAlign: 'center', padding: '12px 8px' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#10b981' }}>
                  {topics.filter(t => (t.masteryLevel ?? 0) >= 80).length}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Mastered</div>
              </div>
              <div className="card" style={{ textAlign: 'center', padding: '12px 8px' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#f59e0b' }}>
                  {topics.filter(t => { const m = t.masteryLevel ?? 0; return m >= 50 && m < 80; }).length}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>In Progress</div>
              </div>
              <div className="card" style={{ textAlign: 'center', padding: '12px 8px' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#ef4444' }}>
                  {topics.filter(t => (t.masteryLevel ?? 0) < 50).length}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Needs Work</div>
              </div>
            </div>

            {topics.map((topic) => {
              const mastery = topic.masteryLevel ?? 0;
              const color = getMasteryColor(mastery);
              const subjectName = topic.topicId?.subject || 'General';
              const topicName = topic.topicId?.name || 'Unknown Topic';

              return (
                <div key={topic._id} className="card" style={{ padding: '14px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--primary)', marginBottom: '2px' }}>
                        {subjectName}
                      </div>
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>{topicName}</div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '16px', color }}>{mastery}%</div>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{
                      width: `${mastery}%`,
                      background: mastery >= 80 ? 'linear-gradient(90deg, #10b981, #34d399)' :
                                    mastery >= 50 ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' :
                                    'linear-gradient(90deg, #ef4444, #f87171)',
                    }} />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      <Repeat size={10} style={{ display: 'inline', verticalAlign: 'middle' }} />
                      {' '}{topic.totalAttempts ?? 0} attempts
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Activity Tab ── */}
        {activeTab === 'Activity' && (
          <div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Your recent learning activity and XP earnings.
            </p>

            <div className="card" style={{ padding: '16px', marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={16} />
                XP Overview
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary)' }}>
                    {stats?.totalXp ?? 0}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total XP</div>
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-green)' }}>
                    {stats?.gamificationLevel ?? 1}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Level</div>
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-orange)' }}>
                    {stats?.points ?? 0}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Points</div>
                </div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} />
              Recent Activity
            </div>
            {[
              { action: 'Completed quiz on Algebra', xp: '+25 XP', time: '2 hours ago', type: 'quiz' },
              { action: 'Studied Cell Biology', xp: '+15 XP', time: '5 hours ago', type: 'study' },
              { action: 'Reviewed Newton\'s Laws', xp: '+10 XP', time: '1 day ago', type: 'review' },
              { action: '7-day streak milestone!', xp: '+50 XP', time: '2 days ago', type: 'streak' },
              { action: 'Completed quiz on Chemical Bonding', xp: '+30 XP', time: '3 days ago', type: 'quiz' },
            ].map((activity, i) => (
              <div key={i} className="card" style={{
                padding: '12px 16px', marginBottom: '6px',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: activity.type === 'quiz' ? '#dbeafe' :
                              activity.type === 'study' ? '#d1fae5' :
                              activity.type === 'review' ? '#fef3c7' : '#ede9fe',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {activity.type === 'quiz' ? <CheckCircle size={16} color="#3b82f6" /> :
                   activity.type === 'study' ? <BookOpen size={16} color="#10b981" /> :
                   activity.type === 'review' ? <Repeat size={16} color="#f59e0b" /> :
                   <Zap size={16} color="#8b5cf6" />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 500 }}>{activity.action}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{activity.time}</div>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-green)' }}>
                  {activity.xp}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
