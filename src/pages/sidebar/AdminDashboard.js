import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import DataService from '../../utils/dataService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    customers: 0,
    promotions: 0,
    deliveries: 0
  });

  useEffect(() => {
    const orders = DataService.getOrders();
    const revenue = orders.reduce((sum,o)=>sum+parseFloat(o.total||0),0);
    const users = DataService.getUsers();
    const deliveries = DataService.getDeliveries();
    // promotions and products are static for now, so leave as placeholders
    setStats({
      orders: orders.length,
      revenue,
      customers: users.filter(u=>u.role==='user').length,
      promotions: 0,
      deliveries: deliveries.length
    });
  }, []);

  return (
    <div className="admin-page">
        {/* Header */}
        <div className="admin-header">
            <h1>Admin Dashboard</h1>
            <p>Welcome back! Here's an overview of your store.</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
            <div className="stat-card">
                <span className="stat-icon">📦</span>
                <h3>{stats.orders}</h3>
                <p>Total Orders</p>
            </div>
            <div className="stat-card">
                <span className="stat-icon">💰</span>
                <h3>${stats.revenue.toFixed(2)}</h3>
                <p>Total Revenue</p>
            </div>
            <div className="stat-card">
                <span className="stat-icon">👥</span>
                <h3>{stats.customers}</h3>
                <p>Total Customers</p>
            </div>
            <div className="stat-card">
                <span className="stat-icon">🏷️</span>
                <h3>{stats.deliveries}</h3>
                <p>Deliveries</p>
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
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#ORD-001</td>
                        <td>John Doe</td>
                        <td>2024-01-15</td>
                        <td>$45.99</td>
<td><span className="status-badge completed">Completed</span></td>
                    </tr>
                    <tr>
                        <td>#ORD-002</td>
                        <td>Jane Smith</td>
                        <td>2024-01-14</td>
                        <td>$78.50</td>
                        <td><span className="status-badge pending">Pending</span></td>
                    </tr>
                    <tr>
                        <td>#ORD-003</td>
                        <td>Bob Wilson</td>
                        <td>2024-01-13</td>
                        <td>$32.00</td>
                        <td><span className="status-badge active">Processing</span></td>
                    </tr>
                </tbody>
            </table>
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
