import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PhoneWrapper from '../components/layout/PhoneWrapper';

export default function SplashPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(isAuthenticated ? '/dashboard' : '/login', { replace: true });
    }, 2500);
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  return (
    <PhoneWrapper>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4338ca 60%, #1e1b4b 100%)',
        position: 'relative',
        overflow: 'hidden',
        gap: '20px',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
          animation: 'shimmer 2.5s ease-in-out infinite',
          transform: 'skewX(-20deg) translateX(-100%)',
        }} />

        <div style={{
          width: '88px',
          height: '88px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
          position: 'relative',
          zIndex: 1,
        }}>
          <Zap size={44} color="white" fill="white" />
        </div>

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: 'white', fontSize: '32px', fontWeight: 800, margin: 0, letterSpacing: '-0.03em' }}>Studly</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '6px' }}>Master your subjects with AI</p>
        </div>

        <div style={{
          width: '160px',
          height: '3px',
          borderRadius: '3px',
          background: 'rgba(255,255,255,0.15)',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{
            height: '100%',
            width: '40%',
            borderRadius: '3px',
            background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
            animation: 'loadingBar 1.5s ease-in-out infinite',
          }} />
        </div>

        <style>{`
          @keyframes shimmer {
            0% { transform: skewX(-20deg) translateX(-100%); }
            60%, 100% { transform: skewX(-20deg) translateX(200%); }
          }
          @keyframes loadingBar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(350%); }
          }
        `}</style>
      </div>
    </PhoneWrapper>
  );
}
