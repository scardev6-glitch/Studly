import React, { useState, useEffect, useRef } from 'react';
import { Send, Heart, Reply, Trash2, MessageCircle } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { communityApi } from '../services/api';
import Loading from '../components/common/Loading';

export default function CommunityPage() {
  const { token, user, showToast } = useApp();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    loadMessages();
  }, [token]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadMessages = async () => {
    try {
      const data = await communityApi.getAll(token);
      setMessages(data.messages || data.chat || []);
    } catch {
      setMessages([
        { _id: 'm1', user: { name: 'Sarah K.', avatar: 'S' }, text: 'Has anyone started revising for the Math exam?', createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), likes: 3, liked: false, replies: [{ user: { name: 'James M.', avatar: 'J' }, text: 'Yes! I found chapter 5 really tricky.', createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString() }] },
        { _id: 'm2', user: { name: 'Emma L.', avatar: 'E' }, text: 'The Biology flashcards are super helpful!', createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), likes: 5, liked: true, replies: [] },
        { _id: 'm3', user: { name: 'Alex R.', avatar: 'A' }, text: 'Study group for Chemistry this weekend?', createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), likes: 2, liked: false, replies: [] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    try {
      const data = await communityApi.send(text, token);
      const newMsg = data.message || data;
      setMessages(prev => [...prev, newMsg]);
    } catch {
      const optimistic = {
        _id: Date.now().toString(),
        user: { name: user?.name || 'You', avatar: user?.name?.[0] || 'Y' },
        text,
        createdAt: new Date().toISOString(),
        likes: 0,
        liked: false,
        replies: [],
      };
      setMessages(prev => [...prev, optimistic]);
    }
    setInput('');
  };

  const handleLike = async (id) => {
    try {
      await communityApi.like(id, token);
    } catch {}
    setMessages(prev => prev.map(m => m._id === id ? { ...m, liked: !m.liked, likes: m.liked ? m.likes - 1 : m.likes + 1 } : m));
  };

  const handleReply = async (id) => {
    if (!replyText.trim()) return;
    try {
      await communityApi.reply(id, replyText, token);
    } catch {}
    setMessages(prev => prev.map(m => m._id === id ? { ...m, replies: [...(m.replies || []), { user: { name: user?.name || 'You', avatar: user?.name?.[0] || 'Y' }, text: replyText, createdAt: new Date().toISOString() }] } : m));
    setReplyText('');
    setReplyTo(null);
  };

  const handleDelete = async (id) => {
    try {
      await communityApi.delete(id, token);
      setMessages(prev => prev.filter(m => m._id !== id));
    } catch {
      showToast('Could not delete message', 'error');
    }
  };

  const formatTime = (ts) => {
    const d = new Date(ts);
    const now = Date.now();
    const diff = now - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const isOwnMessage = (msg) => msg.user?.name === user?.name || msg.user?.name === 'You';

  return (
    <AppShell>
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{ fontSize: '22px', margin: 0 }}>Community Chat</h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0' }}>Connect with fellow learners</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '520px', paddingRight: '4px' }}>
        {loading ? (
          <Loading text="Loading messages..." />
        ) : messages.length === 0 ? (
          <div className="empty-state" style={{ paddingTop: '40px' }}>
            <MessageCircle size={48} />
            <h3>No messages yet</h3>
            <p>Be the first to start a conversation!</p>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg._id} className="fade-in">
              <div style={{ display: 'flex', gap: '10px' }}>
                <div className="avatar avatar-sm">{msg.user?.avatar || msg.user?.name?.[0] || '?'}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>{msg.user?.name || 'Anonymous'}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{formatTime(msg.createdAt)}</span>
                  </div>
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius) var(--radius) var(--radius) 4px',
                      background: 'var(--bg-secondary)',
                      fontSize: '14px',
                      lineHeight: 1.5,
                      marginBottom: '6px',
                    }}
                  >
                    {msg.text}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
                    <button
                      className="btn btn-ghost"
                      onClick={() => handleLike(msg._id)}
                      style={{ padding: '4px 8px', fontSize: '12px', color: msg.liked ? 'var(--accent-red)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Heart size={14} fill={msg.liked ? 'var(--accent-red)' : 'none'} />
                      {msg.likes || 0}
                    </button>
                    <button
                      className="btn btn-ghost"
                      onClick={() => setReplyTo(replyTo === msg._id ? null : msg._id)}
                      style={{ padding: '4px 8px', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Reply size={14} />
                      {msg.replies?.length > 0 ? msg.replies.length : ''}
                    </button>
                    {isOwnMessage(msg) && (
                      <button
                        className="btn btn-ghost"
                        onClick={() => handleDelete(msg._id)}
                        style={{ padding: '4px 8px', fontSize: '12px', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  {msg.replies?.length > 0 && (
                    <div style={{ marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid var(--border)' }}>
                      {msg.replies.map((reply, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                          <div className="avatar avatar-sm" style={{ width: '24px', height: '24px', fontSize: '10px' }}>{reply.user?.avatar || reply.user?.name?.[0] || '?'}</div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '12px', fontWeight: 600 }}>{reply.user?.name || 'Anonymous'}</span>
                              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{formatTime(reply.createdAt)}</span>
                            </div>
                            <div style={{ fontSize: '13px', marginTop: '2px' }}>{reply.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {replyTo === msg._id && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        style={{ flex: 1, padding: '8px 12px', fontSize: '13px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                        onKeyDown={e => { if (e.key === 'Enter') handleReply(msg._id); }}
                      />
                      <button className="btn" onClick={() => handleReply(msg._id)} style={{ padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--primary)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Send size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '12px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '14px', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
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
    </AppShell>
  );
}
