import React from 'react';
import './AdminDashboard.css';

const Orders = () => {
    const sampleOrders = [
        { id: '#ORD-001', customer: 'Shoprite', date: '2024-01-15', items: 3, total: 'R245.99', status: 'Completed' },
        { id: '#ORD-002', customer: 'Luka Market', date: '2024-01-14', items: 5, total: 'R578.50', status: 'Pending' },
        { id: '#ORD-003', customer: 'PicknPay', date: '2024-01-13', items: 2, total: 'R732.00', status: 'Processing' },
        { id: '#ORD-004', customer: 'Mzamo Traders', date: '2024-01-16', items: 1, total: 'R120.00', status: 'Completed' },
        { id: '#ORD-005', customer: 'RCO Groceries', date: '2024-01-17', items: 7, total: 'R980.40', status: 'Pending' }
    ];

    const handleView = (order) => {
        alert(`Viewing details for ${order.id}`);
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
                            <th>Customer Name</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleOrders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{order.date}</td>
                                <td>{order.items} items</td>
                                <td>{order.total}</td>
                                <td><span className={`status-badge ${order.status === 'Completed' ? 'completed' : order.status === 'Pending' ? 'pending' : 'active'}`}>{order.status}</span></td>
                                <td><button className="admin-btn" onClick={() => handleView(order)}>View</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Orders;
