import React from 'react';
import PhoneWrapper from './PhoneWrapper';
import BottomNav from './BottomNav';
import NotificationPanel from '../features/NotificationPanel';

export default function AppShell({ children, showNav = true }) {
  return (
    <>
      <div className="app-scroll">
        {children}
      </div>
      {showNav && <BottomNav />}
      <NotificationPanel />
    </>
  );
}
