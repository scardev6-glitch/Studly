import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Play, Pause, RotateCcw, Clock, CheckCircle, BookOpen } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { plannerApi } from '../services/api';
import Loading from '../components/common/Loading';

const TIME_OPTIONS = [30, 60, 90, 120];

export default function PlannerPage() {
  const { token, showToast } = useApp();
  const [selectedTime, setSelectedTime] = useState(60);
  const [customTime, setCustomTime] = useState('');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const [pomodoro, setPomodoro] = useState({ minutes: 25, seconds: 0, isRunning: false, mode: 'focus' });
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const getAvailableTime = () => {
    if (customTime) return parseInt(customTime, 10);
    return selectedTime;
  };

  const handleGenerate = async () => {
    const time = getAvailableTime();
    if (!time || time < 5) {
      showToast('Please enter at least 5 minutes', 'error');
      return;
    }
    setLoading(true);
    setGenerated(false);
    try {
      const data = await plannerApi.generate(time, token);
      setPlan(data.plan || data);
    } catch {
      setPlan({
        summary: { sessions: 3, totalMinutes: time, completed: 0 },
        goals: [
          { _id: 'g1', subject: 'Mathematics', topic: 'Algebra', duration: 25, status: 'pending' },
          { _id: 'g2', subject: 'Biology', topic: 'Cell Division', duration: 20, status: 'pending' },
          { _id: 'g3', subject: 'Chemistry', topic: 'Periodic Table', duration: 15, status: 'pending' },
        ]
      });
    } finally {
      setLoading(false);
      setGenerated(true);
    }
  };

  const togglePomodoro = () => {
    if (pomodoro.isRunning) {
      clearInterval(intervalRef.current);
      setPomodoro(p => ({ ...p, isRunning: false }));
    } else {
      intervalRef.current = setInterval(() => {
        setPomodoro(p => {
          if (p.seconds === 0) {
            if (p.minutes === 0) {
              clearInterval(intervalRef.current);
              showToast('Focus session complete!', 'success');
              return { ...p, isRunning: false, minutes: 25, seconds: 0 };
            }
            return { ...p, minutes: p.minutes - 1, seconds: 59 };
          }
          return { ...p, seconds: p.seconds - 1 };
        });
      }, 1000);
      setPomodoro(p => ({ ...p, isRunning: true }));
    }
  };

  const resetPomodoro = () => {
    clearInterval(intervalRef.current);
    setPomodoro({ minutes: 25, seconds: 0, isRunning: false, mode: 'focus' });
  };

  const formatTime = (m, s) => `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

  return (
    <AppShell>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', margin: 0 }}>Study Planner</h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0' }}>Plan your study session</p>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '10px' }}>Available Time (minutes)</label>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          {TIME_OPTIONS.map(t => (
            <button
              key={t}
              className={`btn time-btn ${selectedTime === t ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '10px 18px', fontSize: '13px', flex: 1, minWidth: '60px' }}
              onClick={() => { setSelectedTime(t); setCustomTime(''); }}
            >
              {t}m
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="number"
            placeholder="Custom..."
            value={customTime}
            onChange={e => { setCustomTime(e.target.value); setSelectedTime(null); }}
            style={{ padding: '10px 14px', fontSize: '13px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', width: '100%' }}
            min="5"
          />
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>mins</span>
        </div>
        <button
          className="btn btn-primary btn-full"
          style={{ marginTop: '16px' }}
          onClick={handleGenerate}
          disabled={loading}
        >
          <Sparkles size={16} />
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
      </div>

      {loading && <Loading text="Creating your study plan..." />}

      {generated && plan && !loading && (
        <>
          <div className="card" style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', marginBottom: '12px' }}>Plan Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <div style={{ textAlign: 'center', padding: '12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary)' }}>{plan.summary?.sessions || 0}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Sessions</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary)' }}>{plan.summary?.totalMinutes || 0}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Minutes</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-green)' }}>{plan.summary?.completed || 0}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Done</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {plan.goals?.map((goal) => (
              <div key={goal._id} className="card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <BookOpen size={14} style={{ color: 'var(--primary)' }} />
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary)', background: 'var(--primary-bg)', padding: '1px 8px', borderRadius: 'var(--radius-full)' }}>{goal.subject}</span>
                    {goal.status === 'completed' && <CheckCircle size={14} style={{ color: 'var(--accent-green)' }} />}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{goal.topic}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    <Clock size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                    {goal.duration} min
                    {goal.status === 'in_progress' && <span style={{ color: 'var(--accent-orange)', marginLeft: '8px' }}>In Progress</span>}
                    {goal.status === 'completed' && <span style={{ color: 'var(--accent-green)', marginLeft: '8px' }}>Completed</span>}
                  </div>
                </div>
                <button className="btn btn-sm btn-primary" onClick={() => setPomodoroActive(true)} style={{ flexShrink: 0 }}>
                  <Play size={14} />
                  Start
                </button>
              </div>
            ))}
          </div>

          {pomodoroActive && (
            <div className="card" style={{ textAlign: 'center', padding: '24px' }}>
              <h3 style={{ fontSize: '15px', marginBottom: '4px' }}>Pomodoro Timer</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>25 min focus session</p>
              <div style={{ fontSize: '48px', fontWeight: 800, fontVariantNumeric: 'tabular-nums', marginBottom: '16px', color: 'var(--primary)' }}>
                {formatTime(pomodoro.minutes, pomodoro.seconds)}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button className="btn btn-primary" onClick={togglePomodoro} style={{ padding: '12px 24px' }}>
                  {pomodoro.isRunning ? <Pause size={18} /> : <Play size={18} />}
                  {pomodoro.isRunning ? 'Pause' : 'Start'}
                </button>
                <button className="btn btn-secondary" onClick={resetPomodoro} style={{ padding: '12px 24px' }}>
                  <RotateCcw size={18} />
                  Reset
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {generated && !plan && !loading && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>No plan available. Try generating again.</p>
      )}
    </AppShell>
  );
}
