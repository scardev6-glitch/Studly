import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const ICONS = { review_reminder: 'refresh-cw', achievement: 'trophy', session_reminder: 'play-circle', streak: 'flame', tip: 'lightbulb', general: 'bell' };
const COLORS = { review_reminder: 'var(--primary)', achievement: 'var(--accent-green)', session_reminder: 'var(--accent-purple)', streak: 'var(--accent-orange)', tip: 'var(--accent-pink)', general: 'var(--text-muted)' };

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return mins + 'm ago';
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + 'h ago';
  return Math.floor(hrs / 24) + 'd ago';
}

export default function NotificationPanel() {
  const { unreadCount, notifications, markNotifRead, markAllNotifRead, clearNotifications } = useApp();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [open]);

  const handleNotifClick = (n) => {
    if (!n.isRead) markNotifRead(n._id);
    setOpen(false);
    if (n.link) navigate(n.link);
  };

  return (
    <>
      <button ref={btnRef} className="btn btn-ghost" onClick={() => setOpen(!open)} aria-label="Notifications" style={{ padding: '6px', borderRadius: 'var(--radius-full)', position: 'relative' }}>
        <Bell size={18} />
        {unreadCount > 0 && <span className="notif-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>}
      </button>

      {open && (
        <div ref={panelRef} className="scale-in" style={{
          display: 'block', position: 'absolute', top: '84px', right: '20px', width: '340px',
          maxHeight: '420px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)', boxShadow: 'var(--shadow-xl)', zIndex: 200, overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontWeight: 700, fontSize: '15px' }}>
              Notifications{' '}
              {unreadCount > 0 && <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 400 }}>({unreadCount} new)</span>}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {unreadCount > 0 && (
                <button className="btn btn-xs btn-ghost" onClick={markAllNotifRead} style={{ fontSize: '11px' }}>Mark all read</button>
              )}
              <button className="btn btn-xs btn-ghost" onClick={clearNotifications} style={{ fontSize: '11px', color: 'var(--accent-red)' }}>Clear</button>
            </div>
          </div>

          {notifications.length === 0 ? (
            <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>No notifications yet</div>
          ) : (
            <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
              {notifications.slice(0, 30).map(n => {
                const icon = ICONS[n.type] || 'bell';
                const color = COLORS[n.type] || 'var(--text-muted)';
                return (
                  <div key={n._id}
                    style={{ display: 'flex', gap: '12px', padding: '12px 16px', borderBottom: '1px solid var(--border-light)', cursor: 'pointer', transition: 'var(--transition)', opacity: n.isRead ? 0.7 : 1 }}
                    onClick={() => handleNotifClick(n)}
                    onMouseOver={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                    onMouseOut={e => e.currentTarget.style.background = ''}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i data-lucide={icon} size="16" style={{ color }}></i>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: n.isRead ? 500 : 700, marginBottom: '2px' }}>{n.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{n.message}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{timeAgo(n.createdAt)}</div>
                    </div>
                    {!n.isRead && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', flexShrink: 0, marginTop: '4px' }}></div>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
