import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminPage = () => {
  return (
    <div className="d-flex">
      {/* Main Content */}
      <div style={styles.container}>
        <div>
          <h1>Welcome Admin</h1>
          <p>This is your admin dashboard.Select a tab to view</p>
        </div>
      </div>

    </div>
  );
};

export default AdminPage;

const styles = {
  sidebar: {
    width: '250px',
    height: '100vh',
    backgroundColor: '#212529',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    flex: 1,
    padding: '30px',
    backgroundColor: '#f8f9fa',
    color: '#212529',
    minHeight: '100vh'
  }
};