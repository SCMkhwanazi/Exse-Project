import React from 'react';
import './AdminDashboard.css';

const ActivityLog = () => {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Activity Log</h1>
        <p>Review recent system activities</p>
      </div>
      <div className="content-section">
        <table className="data-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Action</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2026-03-01 14:22</td>
              <td>Created promotion "50% Off"</td>
              <td>admin</td>
            </tr>
            <tr>
              <td>2026-02-28 09:17</td>
              <td>Updated product "Rice 10kg" stock</td>
              <td>admin</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLog;
