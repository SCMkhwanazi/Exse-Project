import React, { useState } from 'react';
import './AdminDashboard.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    darkMode: false,
    twoFactorAuth: false,
    language: 'en',
    timezone: 'UTC',
    adminEmail: 'admin@exse-project.com',
    companyName: 'Exse Project Inc.',
    currency: 'USD'
  });

  const handleToggle = (field) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Settings</h1>
        <p>Manage your application preferences and account settings</p>
      </div>

      <div className="settings-container">
        {/* Profile Settings Section */}
        <div className="settings-section">
          <h2><i className="fas fa-user-circle"></i> Profile Settings</h2>
          <div className="settings-card">
            <div className="form-group">
              <label>Company Name</label>
              <input 
                type="text" 
                value={settings.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Admin Email</label>
              <input 
                type="email" 
                value={settings.adminEmail}
                onChange={(e) => handleChange('adminEmail', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Timezone</label>
              <select 
                value={settings.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time (EST)</option>
                <option value="PST">Pacific Time (PST)</option>
                <option value="GMT">Greenwich Mean Time (GMT)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Currency</label>
              <select 
                value={settings.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="ZAR">ZAR - South African Rand</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings Section */}
        <div className="settings-section">
          <h2><i className="fas fa-bell"></i> Notification Settings</h2>
          <div className="settings-card">
            <div className="toggle-item">
              <div className="toggle-info">
                <span className="toggle-label">Email Notifications</span>
                <span className="toggle-description">Receive email updates about orders and inventory</span>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="toggle-item">
              <div className="toggle-info">
                <span className="toggle-label">SMS Notifications</span>
                <span className="toggle-description">Receive text messages for urgent updates</span>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.smsNotifications}
                  onChange={() => handleToggle('smsNotifications')}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="toggle-item">
              <div className="toggle-info">
                <span className="toggle-label">Push Notifications</span>
                <span className="toggle-description">Receive push notifications in your browser</span>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.pushNotifications}
                  onChange={() => handleToggle('pushNotifications')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings Section */}
        <div className="settings-section">
          <h2><i className="fas fa-shield-alt"></i> Security Settings</h2>
          <div className="settings-card">
            <div className="toggle-item">
              <div className="toggle-info">
                <span className="toggle-label">Two-Factor Authentication</span>
                <span className="toggle-description">Add an extra layer of security to your account</span>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.twoFactorAuth}
                  onChange={() => handleToggle('twoFactorAuth')}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="action-item">
              <div className="action-info">
                <span className="action-label">Change Password</span>
                <span className="action-description">Update your account password</span>
              </div>
              <button className="btn-secondary">Change</button>
            </div>
            <div className="action-item">
              <div className="action-info">
                <span className="action-label">Active Sessions</span>
                <span className="action-description">Manage your active login sessions</span>
              </div>
              <button className="btn-secondary">View</button>
            </div>
          </div>
        </div>

        {/* Appearance Settings Section */}
        <div className="settings-section">
          <h2><i className="fas fa-palette"></i> Appearance</h2>
          <div className="settings-card">
            <div className="toggle-item">
              <div className="toggle-info">
                <span className="toggle-label">Dark Mode</span>
                <span className="toggle-description">Switch between light and dark theme</span>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.darkMode}
                  onChange={() => handleToggle('darkMode')}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="form-group">
              <label>Language</label>
              <select 
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Management Section */}
        <div className="settings-section">
          <h2><i className="fas fa-database"></i> Data Management</h2>
          <div className="settings-card">
            <div className="action-item">
              <div className="action-info">
                <span className="action-label">Export Data</span>
                <span className="action-description">Download all your data in CSV format</span>
              </div>
              <button className="btn-secondary">Export</button>
            </div>
            <div className="action-item">
              <div className="action-info">
                <span className="action-label">Backup Settings</span>
                <span className="action-description">Configure automatic backup schedule</span>
              </div>
              <button className="btn-secondary">Configure</button>
            </div>
            <div className="action-item danger">
              <div className="action-info">
                <span className="action-label">Delete All Data</span>
                <span className="action-description">Permanently delete all project data</span>
              </div>
              <button className="btn-danger">Delete</button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="settings-actions">
          <button className="btn-primary" onClick={handleSave}>
            <i className="fas fa-save"></i> Save Changes
          </button>
          <button className="btn-secondary" onClick={() => window.location.reload()}>
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
