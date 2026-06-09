import React, { useState, useEffect } from 'react';
import { FileText, Bell, Moon, Sun, Search, BookOpen, PenLine, X, ChevronLeft } from 'lucide-react';
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
  Accounting: { bg: '#f0f9ff', text: '#0284c7' },
  'Business Studies': { bg: '#f5f3ff', text: '#7c3aed' },
  Economics: { bg: '#ecfdf5', text: '#059669' },
  Geography: { bg: '#fefce8', text: '#ca8a04' },
  ICT: { bg: '#f0f9ff', text: '#0284c7' },
  'First Language English': { bg: '#fdf4ff', text: '#c026d3' },
  'French - Foreign Language': { bg: '#fce7f3', text: '#db2777' },
  'Additional Mathematics': { bg: '#eef2ff', text: '#6366f1' },
  'Literature in English': { bg: '#fdf4ff', text: '#c026d3' },
  'Design and Technology': { bg: '#f0fdf4', text: '#16a34a' },
  'Food and Nutrition': { bg: '#fef2f2', text: '#dc2626' },
};

export default function NotesPage() {
  const { theme, toggleTheme, token, user } = useApp();
  const [notes, setNotes] = useState([]);
  const [providedNotes, setProvidedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('user');
  const [search, setSearch] = useState('');
  const [activeNote, setActiveNote] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [data, provided] = await Promise.all([
          notesApi.getAll(token),
          notesApi.getProvided(token),
        ]);
        setNotes(data || []);
        setProvidedNotes(provided || []);
        if (!data || data.length === 0) {
          setViewMode('provided');
        }
      } catch {
        setNotes([]);
        setProvidedNotes([]);
        setViewMode('provided');
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const displayNotes = viewMode === 'user' ? notes : providedNotes;

  const filtered = search
    ? displayNotes.filter(n =>
        (n.subject || '').toLowerCase().includes(search.toLowerCase()) ||
        (n.title || '').toLowerCase().includes(search.toLowerCase())
      )
    : displayNotes;

  const toggleStyle = (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: 600,
    border: 'none',
    borderRadius: 'var(--radius-full)',
    cursor: 'pointer',
    background: active ? 'var(--primary)' : 'var(--bg-secondary)',
    color: active ? '#fff' : 'var(--text-secondary)',
    transition: 'all 0.2s',
  });

  if (activeNote) {
    return (
      <AppShell showNav={false}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <button
            onClick={() => setActiveNote(null)}
            className="btn btn-ghost"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', border: 'none', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontSize: '14px', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          >
            <ChevronLeft size={18} /> Back
          </button>
          <h3 style={{ margin: 0, fontSize: '16px', flex: 1, textAlign: 'center' }}>{activeNote.title}</h3>
          <button
            onClick={() => setActiveNote(null)}
            className="btn btn-ghost"
            style={{ display: 'flex', padding: '6px', border: 'none', borderRadius: 'var(--radius-full)', cursor: 'pointer', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          >
            <X size={18} />
          </button>
        </div>
        <iframe
          src={activeNote.url}
          title={activeNote.title}
          style={{ width: '100%', height: 'calc(100vh - 180px)', border: 'none', borderRadius: 'var(--radius)', background: '#fff' }}
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '24px', margin: 0 }}>Knowledge Vault</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0' }}>
            {viewMode === 'user' ? 'Your AI-summarized revision notes' : 'Curated revision notes from your syllabus'}
          </p>
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

      {notes.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button style={toggleStyle(viewMode === 'user')} onClick={() => setViewMode('user')}>
            <PenLine size={16} /> My Notes
          </button>
          <button style={toggleStyle(viewMode === 'provided')} onClick={() => setViewMode('provided')}>
            <BookOpen size={16} /> Provided Notes
          </button>
        </div>
      )}

      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ paddingLeft: '40px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px', fontSize: '14px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', width: '100%', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
        />
      </div>

      {loading ? (
        <Loading text="Loading notes..." />
      ) : filtered.length === 0 ? (
        viewMode === 'user' ? (
          <EmptyState icon={FileText} title="No notes yet" description="Complete study sessions to generate AI-powered revision notes." />
        ) : (
          <EmptyState icon={BookOpen} title="No provided notes available" description="Check back later for curated revision notes." />
        )
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((note) => {
            const colors = SUBJECT_COLORS[note.subject] || { bg: '#f8fafc', text: '#475569' };
            const isUserNote = viewMode === 'user';
            return (
              <div
                key={note._id || note.id}
                className="card"
                style={{ padding: '16px', cursor: 'pointer' }}
                onClick={() => isUserNote ? null : setActiveNote(note)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: colors.text, background: colors.bg, padding: '2px 10px', borderRadius: 'var(--radius-full)' }}>{note.subject}</span>
                </div>
                <h3 style={{ fontSize: '15px', marginBottom: '6px' }}>{note.title}</h3>
                {isUserNote && note.summary && (
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '10px', padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: colors.bg, borderLeft: `3px solid ${colors.text}` }}>
                    {note.summary}
                  </div>
                )}
                {isUserNote && note.preview && (
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{note.preview}</p>
                )}
                {!isUserNote && (
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Tap to view PDF
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
