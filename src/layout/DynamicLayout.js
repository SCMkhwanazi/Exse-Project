import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const DynamicLayout = () => {
  const role = localStorage.getItem('role');
  const isDriver = role === 'driver';

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
    
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {/* Logo/Brand at top */}
        <h4 className="text-white mb-4">E'xse</h4>

        {/* Navigation Links - will take available space */}
        <ul className="nav flex-column flex-grow-1">
          {isDriver ? (
            <>
              <li className="nav-item mb-2">
                <Link className="nav-link text-white" to="/sidebar/driver/deliveries">
                  <i className="bi bi-truck me-2"></i> Active Deliveries
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link text-white" to="/sidebar/driver/history">
                  <i className="bi bi-clock-history me-2"></i> Delivery History
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link text-white" to="/sidebar/driver/earnings">
                  <i className="bi bi-graph-up me-2"></i> Earnings
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link text-white" to="/sidebar/driver/profile">
                  <i className="bi bi-person me-2"></i> Profile
                </Link>
              </li>
            </>
          ) : (
            <> 
              <li className="nav-item mb-2">
                <Link className="nav-link text-white" to="/sidebar/dashboard">
                  <i className="bi bi-house-door me-2"></i> Dashboard
                </Link>
              </li>

              <li className="nav-item mb-2">
                <Link className="nav-link text-white" to="/sidebar/placeorders">
                  <i className="bi bi-bag me-2"></i> Place Orders
                </Link>
              </li>

              <li className="nav-item mb-2">
                <Link className="nav-link text-white" to="/sidebar/viewproducts">
                  <i className="bi bi-box me-2"></i> View Products
                </Link>
              </li>

              <li className="nav-item mb-2">
                <Link className="nav-link text-white" to="/sidebar/viewpromotions">
                  <i className="bi bi-megaphone me-2"></i> Promotion
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Logout Button - positioned at bottom */}
        <div style={styles.logoutContainer}>
          <button
            className="btn btn-outline-light w-100"
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
    backgroundColor: 'rgb(94, 93, 199)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    overflowY: 'auto'
  },
  logoutContainer: {
    marginTop: 'auto',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)'
  },
  container: {
    flex: 1,
    padding: '30px',
    backgroundColor: '#f8f9fa',
    color: '#212529',
    minHeight: '100vh',
    overflowY: 'auto'
  }
};