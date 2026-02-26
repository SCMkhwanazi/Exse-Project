import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import DataService from '../../utils/dataService';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders(DataService.getOrders());
    }, []);

    const updateStatus = (id, status) => {
        const updated = orders.map(o => o.id === id ? { ...o, status } : o);
        setOrders(updated);
        DataService.updateOrder(updated.find(o => o.id === id));
    };

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
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customerName || order.customerEmail}</td>
                                <td>{order.date}</td>
                                <td>${order.total}</td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={e => updateStatus(order.id, e.target.value)}
                                    >
                                        <option>Pending</option>
                                        <option>Processing</option>
                                        <option>Completed</option>
                                        <option>Cancelled</option>
                                    </select>
                                </td>
                                <td><button className="admin-btn">View</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Orders;
