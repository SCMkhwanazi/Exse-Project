import React from 'react';
import './AdminDashboard.css';

const Clients = () => {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Clients</h1>
        <p>View and manage client accounts</p>
      </div>
      <div className="content-section">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mary Ncube</td>
              <td>mary@example.com</td>
              <td>081 234 5678</td>
              <td><span className="status-badge completed">Active</span></td>
            </tr>
            <tr>
              <td>Peter Brown</td>
              <td>peter.brown@example.com</td>
              <td>082 345 6789</td>
              <td><span className="status-badge pending">Inactive</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;
