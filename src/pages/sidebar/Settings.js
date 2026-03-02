import React from 'react';
import './AdminDashboard.css';

const Settings = () => {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Settings</h1>
        <p>Configure application preferences</p>
      </div>
      <div className="content-section">
        <h3>Preferences</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <label><input type="checkbox" checked disabled /> Enable email notifications</label>
          <label><input type="checkbox" /> Dark mode (coming soon)</label>
          <label>
            Admin email:
            <input type="email" defaultValue="admin@example.com" style={{marginLeft: '10px'}} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
