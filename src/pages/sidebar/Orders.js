import React from 'react';
import './AdminDashboard.css';

const Orders = () => {
    return(
        <div className="admin-page">
            {/* Header */}
            <div className="admin-header">
                <h1>Orders</h1>
                <p>Manage and track all customer orders</p>
            </div>

            {/* Search and Filter */}
            <div className="content-section">
                <div className="admin-search">
                    <div className="admin-search-box">
                        <span>🔍</span>
                        <input type="text" placeholder="Search orders by ID or customer..." />
                    </div>
                    <button className="admin-btn">Search</button>
                    <button className="admin-btn admin-btn-outline">Export</button>
                </div>

                {/* Orders Table */}
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#ORD-001</td>
                            <td>John Doe</td>
                            <td>2024-01-15</td>
                            <td>3 items</td>
                            <td>$45.99</td>
                            <td><span className="status-badge completed">Completed</span></td>
                            <td><button className="admin-btn">View</button></td>
                        </tr>
                        <tr>
                            <td>#ORD-002</td>
                            <td>Jane Smith</td>
                            <td>2024-01-14</td>
                            <td>5 items</td>
                            <td>$78.50</td>
                            <td><span className="status-badge pending">Pending</span></td>
                            <td><button className="admin-btn">View</button></td>
                        </tr>
                        <tr>
                            <td>#ORD-003</td>
                            <td>Bob Wilson</td>
                            <td>2024-01-13</td>
                            <td>2 items</td>
                            <td>$32.00</td>
                            <td><span className="status-badge active">Processing</span></td>
                            <td><button className="admin-btn">View</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Orders;
