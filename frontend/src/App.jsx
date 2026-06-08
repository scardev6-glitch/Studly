import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Loading from './components/common/Loading';
import InstallPrompt from './components/common/InstallPrompt';

// Lazy load pages
const SplashPage = lazy(() => import('./pages/SplashPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const StudyPage = lazy(() => import('./pages/StudyPage'));
const NotesPage = lazy(() => import('./pages/NotesPage'));
const PlannerPage = lazy(() => import('./pages/PlannerPage'));
const AIPage = lazy(() => import('./pages/AIPage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const ProgressPage = lazy(() => import('./pages/ProgressPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
// HomePage redirects to SplashPage
const HomePage = () => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <SplashPage />;
};

function NotFound() {
  return (
    <div className="phone-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ fontSize: '72px', fontWeight: 800, color: 'var(--primary)', lineHeight: 1, marginBottom: '8px' }}>404</div>
      <h2 style={{ marginBottom: '8px' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '14px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/dashboard" className="btn btn-primary" style={{ marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
        Go to Dashboard
      </a>
    </div>
  );
}

export default function App() {
  const { isAuthenticated, loading } = useApp();

  if (loading) {
    return (
      <div className="phone-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <Loading text="Loading Studly..." />
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="phone-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <Loading text="Loading..." />
      </div>
    }>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<SplashPage />} />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        } />
        <Route path="/signup" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignupPage />
        } />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/home" element={<HomePage />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={
          isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />
        } />
        <Route path="/study" element={
          isAuthenticated ? <StudyPage /> : <Navigate to="/login" replace />
        } />
        <Route path="/notes" element={
          isAuthenticated ? <NotesPage /> : <Navigate to="/login" replace />
        } />
        <Route path="/planner" element={
          isAuthenticated ? <PlannerPage /> : <Navigate to="/login" replace />
        } />
        <Route path="/ai-assistant" element={
          isAuthenticated ? <AIPage /> : <Navigate to="/login" replace />
        } />
        <Route path="/achievements" element={
          isAuthenticated ? <AchievementsPage /> : <Navigate to="/login" replace />
        } />
        <Route path="/settings" element={
          isAuthenticated ? <SettingsPage /> : <Navigate to="/login" replace />
        } />
        <Route path="/progress" element={
          isAuthenticated ? <ProgressPage /> : <Navigate to="/login" replace />
        } />
        <Route path="/community" element={
          isAuthenticated ? <CommunityPage /> : <Navigate to="/login" replace />
        } />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <InstallPrompt />
    </Suspense>
  );
}
