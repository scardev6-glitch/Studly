import React, { useState, useEffect } from 'react';
import { FileText, Bell, Moon, Sun, Search } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { notesApi } from '../services/api';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';

const SUBJECT_COLORS = {
  Mathematics: { bg: '#eef2ff', text: '#6366f1' },
  Biology: { bg: '#f0fdf4', text: '#16a34a' },
  Chemistry: { bg: '#fef2f2', text: '#dc2626' },
  Physics: { bg: '#fff7ed', text: '#ea580c' },
  English: { bg: '#fdf4ff', text: '#c026d3' },
  History: { bg: '#fefce8', text: '#ca8a04' },
};

export default function NotesPage() {
  const { theme, toggleTheme, token, user } = useApp();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await notesApi.getAll(token);
        setNotes(data.notes || []);
      } catch {
        setNotes([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const formatDate = (d) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <AppShell>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '24px', margin: 0 }}>Knowledge Vault</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0' }}>AI-summarized revision notes from your study sessions</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="btn btn-ghost" onClick={toggleTheme} style={{ padding: '6px', borderRadius: 'var(--radius-full)' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="btn btn-ghost" style={{ padding: '6px', borderRadius: 'var(--radius-full)', position: 'relative' }}>
            <Bell size={18} />
          </button>
          <div className="avatar avatar-sm">{user?.name?.[0] || 'U'}</div>
        </div>
      </div>

      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input type="text" placeholder="Search notes..." style={{ paddingLeft: '40px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px', fontSize: '14px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', width: '100%', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
      </div>

      {loading ? (
        <Loading text="Loading notes..." />
      ) : notes.length === 0 ? (
        <EmptyState icon={FileText} title="No notes yet" description="Complete study sessions to generate AI-powered revision notes." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notes.map((note) => {
            const colors = SUBJECT_COLORS[note.subject] || { bg: '#f8fafc', text: '#475569' };
            return (
              <div key={note._id} className="card" style={{ padding: '16px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: colors.text, background: colors.bg, padding: '2px 10px', borderRadius: 'var(--radius-full)' }}>{note.subject}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{formatDate(note.createdAt)}</span>
                </div>
                <h3 style={{ fontSize: '15px', marginBottom: '6px' }}>{note.title}</h3>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '10px', padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: colors.bg, borderLeft: `3px solid ${colors.text}` }}>
                  {note.summary}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{note.preview}</p>
              </div>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
