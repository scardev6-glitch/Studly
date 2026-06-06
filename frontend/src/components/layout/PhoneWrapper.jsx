import React from 'react';
import Toast from '../common/Toast';

export default function PhoneWrapper({ children }) {
  return (
    <div className="phone-wrapper">
      <div className="app-container">
        {children}
      </div>
      <Toast />
    </div>
  );
}
