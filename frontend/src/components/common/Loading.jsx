import React from 'react';

export default function Loading({ text = 'Loading...' }) {
  return (
    <div className="loading">
      <div className="spinner"></div>
      {text}
    </div>
  );
}
