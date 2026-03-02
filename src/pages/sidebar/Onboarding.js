import React from 'react';
import './AdminDashboard.css';

const Onboarding = () => {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Onboarding</h1>
        <p>Setup new users and vendors</p>
      </div>
      <div className="content-section">
        <h3>Add new user</h3>
        <form style={{display:'flex', flexDirection:'column', gap:'10px', maxWidth:'400px'}}>
          <input type="text" placeholder="Full name" />
          <input type="email" placeholder="Email" />
          <select><option>Admin</option><option>Driver</option><option>Store</option></select>
          <button className="admin-btn" type="button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
