import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminDynamicLayout = () => {
  return (
    <div className="d-flex">
    
          {/*Sidebar */}
          <div style={styles.sidebar}>
            <h4 >E'xse</h4>
    
            <ul className="nav flex-column">

                <li className="nav-item mb-2">
                                <Link className="nav-link text-white" to="/sidebar/admindashboard">
                                  <i className="bi bi-house-door me-2"></i> Dashboard
                                </Link>
                              </li>
                    
                              <li className="nav-item mb-2">
                                <Link className="nav-link text-white" to="/sidebar/orders">
                                  <i className="bi bi-bag me-2"></i> Place Orders
                                </Link>
                              </li>
                    
                              <li className="nav-item mb-2">
                                <Link className="nav-link text-white" to="/sidebar/products">
                                  <i className="bi bi-box me-2"></i> View Products
                                </Link>
                              </li>
                    
                              <li className="nav-item mb-2">
                                <Link className="nav-link text-white" to="/sidebar/promotions">
                                  <i className="bi bi-megaphone me-2"></i> Promotion
                                </Link>
                              </li>
    </ul>
    
            {/*Logout */}
            <div className="mt-auto">
              <button
                className="btn btn-outline-light w-100"
                onClick={() => {
                  localStorage.clear();
                  alert('You have been logged out!');
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

export default AdminDynamicLayout;

const styles = {
  sidebar: {
    width: '250px',
    height: '100vh',
    backgroundColor: 'rgb(7, 5, 97)',
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