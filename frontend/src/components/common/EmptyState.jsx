import React from 'react';

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="empty-state">
      {Icon && <Icon size={48} />}
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
}
