import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, Trash2, Send, MessageSquare, Bell, Moon, Sun, LayoutDashboard, BookOpen, Calendar, FileText, Trophy } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { chatApi } from '../services/api';

const SUBJECTS = ['All Subjects', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'English', 'History'];
const SUGGESTIONS = ['Explain a topic', 'Practice questions', 'Summarize', 'Study tips'];
const STORAGE_KEY = 'studly_chat_history';

export default function AIPage() {
  const { theme, toggleTheme, token, user, showToast } = useApp();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [subject, setSubject] = useState('All Subjects');
  const [typing, setTyping] = useState(false);
  const [credits, setCredits] = useState(10);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setMessages(JSON.parse(saved)); } catch {}
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const saveMessages = (msgs) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const autoResize = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { _id: Date.now().toString(), role: 'user', content: text, timestamp: new Date().toISOString() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    saveMessages(updated);
    setInput('');
    autoResize();
    setTyping(true);
    try {
      const data = await chatApi.ask(text, token);
      const botMsg = { _id: (Date.now() + 1).toString(), role: 'assistant', content: data.response || data.message || 'Here is my response.', timestamp: new Date().toISOString() };
      const final = [...updated, botMsg];
      setMessages(final);
      saveMessages(final);
    } catch {
      const fallback = { _id: (Date.now() + 1).toString(), role: 'assistant', content: 'I am here to help! Feel free to ask me any questions about your studies.', timestamp: new Date().toISOString() };
      const final = [...updated, fallback];
      setMessages(final);
      saveMessages(final);
    } finally {
      setTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (text) => {
    setInput(text);
    setTimeout(() => {
      textareaRef.current?.focus();
      autoResize();
    }, 0);
  };

  const formatTime = (ts) => {
    const d = new Date(ts);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <AppShell>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} style={{ color: 'var(--primary)' }} />
          <h1 style={{ fontSize: '22px', margin: 0 }}>AI Tutor</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="badge badge-primary" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: 'var(--primary)', color: 'white' }}>
            <Zap size={12} />
            <span>{credits}</span>
          </div>
          <button className="btn btn-ghost" onClick={clearChat} style={{ padding: '6px', borderRadius: 'var(--radius-full)', color: 'var(--accent-red)' }} title="Clear chat">
            <Trash2 size={16} />
          </button>
          <button className="btn btn-ghost" onClick={toggleTheme} style={{ padding: '6px', borderRadius: 'var(--radius-full)' }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {SUBJECTS.map(s => (
          <button
            key={s}
            className={`btn btn-xs ${subject === s ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '6px 14px', fontSize: '12px' }}
            onClick={() => setSubject(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px', overflowY: 'auto', maxHeight: '480px', paddingRight: '4px' }}>
        {messages.length === 0 && !typing ? (
          <div className="empty-state" style={{ paddingTop: '40px' }}>
            <Sparkles size={48} style={{ color: 'var(--primary)' }} />
            <h3>Ask me anything</h3>
            <p>Get help with your studies, ask for explanations, or practice questions.</p>
          </div>
        ) : (
          messages.map(msg => (
            <div
              key={msg._id}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? 'var(--radius) var(--radius) 4px var(--radius)' : 'var(--radius) var(--radius) var(--radius) 4px',
                  background: msg.role === 'user' ? 'var(--primary)' : 'var(--bg-secondary)',
                  color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                  fontSize: '14px',
                  lineHeight: 1.5,
                }}
              >
                <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
                <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.7, textAlign: 'right' }}>{formatTime(msg.timestamp)}</div>
              </div>
            </div>
          ))
        )}

        {typing && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '12px 18px', borderRadius: 'var(--radius) var(--radius) var(--radius) 4px', background: 'var(--bg-secondary)', display: 'flex', gap: '4px', alignItems: 'center' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)', animation: 'bounce 1.4s infinite ease-in-out both' }}></span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)', animation: 'bounce 1.4s infinite ease-in-out both 0.16s' }}></span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)', animation: 'bounce 1.4s infinite ease-in-out both 0.32s' }}></span>
            </div>
          </div>
        )}

        {messages.length > 0 && (
          <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', padding: '4px 0' }}>
            {messages.length} message{messages.length !== 1 ? 's' : ''}
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {messages.length === 0 && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              className="btn btn-xs btn-secondary"
              style={{ padding: '8px 14px', fontSize: '12px' }}
              onClick={() => handleSuggestion(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => { setInput(e.target.value); autoResize(); }}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          rows={1}
          style={{
            flex: 1,
            padding: '12px 14px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            fontSize: '14px',
            resize: 'none',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            maxHeight: '120px',
            lineHeight: 1.4,
          }}
        />
        <button
          className="btn"
          onClick={handleSend}
          disabled={!input.trim()}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--primary)',
            color: 'white',
            flexShrink: 0,
            border: 'none',
          }}
        >
          <Send size={18} />
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </AppShell>
  );
}
