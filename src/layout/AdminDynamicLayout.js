import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminDynamicLayout = () => {
  const [stats, setStats] = useState({
    orders: 5,
    products: 12,
    inventoryAlerts: 3,
    promotions: 1,
    clients: 2,
    activity: 7
  });

  const clearBadge = (key) => {
    setStats(prev => ({ ...prev, [key]: 0 }));
  };

  return (
    <div className="d-flex">
      <style>{`
        .nav-link:hover {
          color: #00cc00 !important;
          background-color: rgba(0, 204, 0, 0.1);
          border-radius: 4px;
          padding-left: 8px;
        }
        .nav-link:active {
          color: #00aa00 !important;
        }
        .nav-link.active {
          color: #00cc00 !important;
          background-color: rgba(0, 204, 0, 0.1);
          border-radius: 4px;
        }
      `}</style>
    
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h4 style={styles.sidebarTitle}>Ek'se</h4>
          <p style={styles.sidebarSubtitle}>Admin Panel</p>
        </div>

        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <NavLink
              className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}
              style={styles.navLink}
              to="/admin/admindashboard"
              onClick={() => clearBadge('')}
            >
              <i className="bi bi-house-door me-2"></i> Dashboard
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}
              style={styles.navLink}
              to="/admin/orders"
              onClick={() => clearBadge('orders')}
            >
              <i className="bi bi-bag me-2"></i> Orders
              {stats.orders > 0 && <span className="badge bg-success ms-2">{stats.orders}</span>}
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}
              style={styles.navLink}
              to="/admin/products"
              onClick={() => clearBadge('products')}
            >
              <i className="bi bi-box me-2"></i> Products
              {stats.products > 0 && <span className="badge bg-success ms-2">{stats.products}</span>}
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}
              style={styles.navLink}
              to="/admin/inventory"
              onClick={() => clearBadge('inventoryAlerts')}
            >
              <i className="bi bi-clipboard-data me-2"></i> Inventory
              {stats.inventoryAlerts > 0 && <span className="badge bg-warning ms-2">{stats.inventoryAlerts}</span>}
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}
              style={styles.navLink}
              to="/admin/promotions"
              onClick={() => clearBadge('promotions')}
            >
              <i className="bi bi-megaphone me-2"></i> Promotions
              {stats.promotions > 0 && <span className="badge bg-success ms-2">{stats.promotions}</span>}
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}
              style={styles.navLink}
              to="/admin/clients"
              onClick={() => clearBadge('clients')}
            >
              <i className="bi bi-people me-2"></i> Clients
              {stats.clients > 0 && <span className="badge bg-success ms-2">{stats.clients}</span>}
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}
              style={styles.navLink}
              to="/admin/settings"
            >
              <i className="bi bi-gear me-2"></i> Settings
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}
              style={styles.navLink}
              to="/admin/activity-log"
              onClick={() => clearBadge('activity')}
            >
              <i className="bi bi-clock-history me-2"></i> Activity Log
              {stats.activity > 0 && <span className="badge bg-info ms-2">{stats.activity}</span>}
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}
              style={styles.navLink}
              to="/admin/onboarding"
            >
              <i className="bi bi-person-plus me-2"></i> Onboarding
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}
              style={styles.navLink}
              to="/admin/companies"
            >
              <i className="bi bi-building me-2"></i> Companies
            </NavLink>
          </li>
        </ul>

        {/* Logout */}
        <div className="mt-auto">
          <button
            className="btn w-100"
            style={styles.logoutBtn}
            onClick={() => {
              localStorage.clear();
              alert('You have been logged out!');
              window.location.href = '/';
            }}
          >
            <i className="bi bi-box-arrow-right me-2"></i> Sign out
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
    backgroundColor: '#0e0d0d',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    overflowY: 'auto',
    borderRight: '1px solid #e0e0e0'
  },
  navLink: {
    color: '#ece7e7',
    padding: '10px 20px',
    display: 'block',
    transition: 'background 0.2s ease',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  logoutBtn: {
    backgroundColor: '#ffffff',
    color: '#333333',
    border: '1px solid #ccc',
    fontWeight: '600',
    transition: 'background 0.2s ease'
  },
  sidebarHeader: {
    backgroundColor: '#0b0c0b',
    color: 'white',
    padding: '20px',
    textAlign: 'center'
  },
  sidebarTitle: { margin: 0, fontSize: '20px' },
  sidebarSubtitle: { margin: 0, fontSize: '12px' },
  container: {
    flex: 1,
    padding: '30px',
    backgroundColor: '#ffffff',
    color: '#000000',
    minHeight: '100vh'
  }
};