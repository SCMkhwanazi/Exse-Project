import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-page">
        {/* Header */}
        <div className="admin-header">
            <h1>Admin Dashboard</h1>
            <p>View orders,stock and operations</p>
        </div>

        <div className="header-actions">
            <button className="admin-btn">New demo order</button>
            <button className="admin-btn-outline">Refresh</button>
        </div>
        {/* Info Row (mirrors screenshot boxes) */}
        <div className="info-row">
            <div className="info-card">
                <h4>Live Orders <span className="badge live">Live</span></h4>
                <p><strong>3</strong> Orders not yet delivered/cancelled.</p>
            </div>
            <div className="info-card">
                <h4>Low Stock Items <span className="badge action">Needs action</span></h4>
                <p><strong>7</strong> items below threshold.</p>
            </div>
            <div className="info-card">
                <h4>Today Revenue <span className="badge tracked">Tracked</span></h4>
                <p>R<strong>154.96</strong> Sum of delivered orders today.</p>
            </div>
            <div className="info-card">
                <h4>Avg Fulfillment ETA <span className="badge estimate">Estimate</span></h4>
                <p><strong>38 min</strong> Based on active orders.</p>
            </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
            <div className="stat-card">
                <span className="stat-icon">📦</span>
                <h3>156</h3>
                <p>Total Orders</p>
            </div>
            <div className="stat-card">
                <span className="stat-icon">💰</span>
                <h3>R12,450</h3>
                <p>Total Revenue</p>
            </div>
            <div className="stat-card">
                <span className="stat-icon">👥</span>
                <h3>8</h3>
                <p>Total Stores</p>
            </div>
            <div className="stat-card">
                <span className="stat-icon">🏷️</span>
                <h3>24</h3>
                <p>Active Promotions</p>
            </div>
        </div>

        {/* Recent Orders Section */}
        <div className="content-section">
            <h2>Recent Orders</h2>
            <div className="admin-search">
                <div className="admin-search-box">
                    <span>🔍</span>
                    <input type="text" placeholder="Search orders..." />
                </div>
                <button className="admin-btn">Filter</button>
            </div>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Store</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#ORD-001</td>
                        <td>Shoprite</td>
                        <td>2024-01-15</td>
                        <td>R245.99</td>
<td><span className="status-badge completed">Completed</span></td>
                    </tr>
                    <tr>
                        <td>#ORD-002</td>
                        <td>Luka Market</td>
                        <td>2024-01-14</td>
                        <td>R578.50</td>
                        <td><span className="status-badge pending">Pending</span></td>
                    </tr>
                    <tr>
                        <td>#ORD-003</td>
                        <td>PicknPay</td>
                        <td>2024-01-13</td>
                        <td>R732.00</td>
                        <td><span className="status-badge active">Processing</span></td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* Operations Snapshot & Quick Actions */}
        <div className="content-section">
            <h2>Operations snapshot</h2>
            <p>Quick actions for busy times.</p>
            <div className="ops-grid">
                <div className="ops-item">
                    <label><input type="checkbox" /> Auto-Assign Drivers</label>
                    <small>Toggle simulation of driver assignment.</small>
                </div>
                <div className="ops-item">
                    <label><input type="checkbox" /> Rush Mode</label>
                    <small>Shorten ETA across new orders.</small>
                </div>
            </div>
        </div>

        {/* Quick Actions */}
        <div className="content-section">
            <h2>Quick Actions</h2>
            <div className="admin-grid">
                <div className="admin-card">
                    <h3>Add Product</h3>
                    <p>Add new products to your inventory</p>
                </div>
                <div className="admin-card">
                    <h3>Create Promotion</h3>
                    <p>Set up new deals and discounts</p>
                </div>
                <div className="admin-card">
                    <h3>View Reports</h3>
                    <p>Check sales and performance reports</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AdminDashboard;
