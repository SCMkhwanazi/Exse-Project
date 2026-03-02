import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const DynamicLayout = () => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <style>{`
        .nav-link:hover {
          color: #00cc00 !important;
          background-color: rgba(0, 204, 0, 0.1);
          border-radius: 4px;
          padding-left: 8px;
        }
        .nav-link:active {
          color: #00cc00 !important;
        }
      `}</style>
    
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {/* Logo/Brand at top */}
        <h4 className="mb-4" style={{ color: '#ffffff' }}>E'xse</h4>
        <p style={{ color: '#cccccc' }}>Client</p>

        {/* Navigation Links - will take available space */}
        <ul className="nav flex-column flex-grow-1">
          <li className="nav-item mb-2">
            <Link className="nav-link" style={styles.navLink} to="/sidebar/dashboard">
              <i className="bi bi-house-door me-2"></i> Dashboard
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link className="nav-link" style={styles.navLink} to="/sidebar/companyprofile">
              <i className="bi bi-bag me-2"></i> Company Profile
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link className="nav-link" style={styles.navLink} to="/sidebar/viewproducts">
              <i className="bi bi-box me-2"></i> View Products
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link className="nav-link" style={styles.navLink} to="/sidebar/viewpromotions">
              <i className="bi bi-megaphone me-2"></i> Promotion
            </Link>
          </li>
        </ul>

        {/* Logout Button - positioned at bottom */}
        <div style={styles.logoutContainer}>
          <button
            className="btn w-100"
            style={styles.logoutBtn}
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
          >
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.container}>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DynamicLayout;

const styles = {
  sidebar: {
    width: '250px',
    height: '100vh',
    backgroundColor: '#000000',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    overflowY: 'auto'
  },
  navLink: {
    color: '#ffffff',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  logoutContainer: {
    marginTop: 'auto',
    paddingTop: '20px',
    borderTop: '2px solid #00cc00'
  },
  logoutBtn: {
    backgroundColor: '#ffffff',
    color: '#000000',
    border: '2px solid #ffffff',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  container: {
    flex: 1,
    padding: '30px',
    backgroundColor: '#ffffff',
    color: '#000000',
    minHeight: '100vh',
    overflowY: 'auto'
  }
};