import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../components/Header';
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
                                <Link className="nav-link text-white" to="/admin/admindashboard">
                                  <i className="bi bi-house-door me-2"></i> Dashboard
                                </Link>
                              </li>
                    
                              <li className="nav-item mb-2">
                                <Link className="nav-link text-white" to="/admin/orders">
                                  <i className="bi bi-bag me-2"></i> Orders
                                </Link>
                              </li>
                    
                              <li className="nav-item mb-2">
                                <Link className="nav-link text-white" to="/admin/products">
                                  <i className="bi bi-box me-2"></i> View Products
                                </Link>
                              </li>
                    
                              <li className="nav-item mb-2">
                                <Link className="nav-link text-white" to="/admin/promotions">
                                  <i className="bi bi-megaphone me-2"></i> Promotion
                                </Link>
                              </li>
                              <li className="nav-item mb-2">
                                <Link className="nav-link text-white" to="/admin/deliveries">
                                  <i className="bi bi-truck me-2"></i> Deliveries
                                </Link>
                              </li>    </ul>
    
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
          <div style={{flex:1, display:'flex', flexDirection:'column'}}>
            <Header />
            <div style={styles.container}>
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
    backgroundColor: '#2d2b4e',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    flex: 1,
    padding: '30px',
    backgroundColor: '#f8f5ff',
    color: '#2d2b4e',
    minHeight: '100vh'
  }
};
