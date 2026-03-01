import React from 'react';
import './Dashboard.css';

const Dashboard = () => {

    // Mock data (replace later with API data)
    const orders = [
        { id: '#1001', status: 'Delivered', driver: 'John M.', total: 320 },
        { id: '#1002', status: 'On The Way', driver: 'Sizwe K.', total: 185 },
        { id: '#1003', status: 'Preparing', driver: 'Not Assigned', total: 240 },
        { id: '#1004', status: 'Delivered', driver: 'Thabo T.', total: 410 }
    ];

    const totalOrders = orders.length;
    const totalEarnings = orders
        .filter(order => order.status === 'Delivered')
        .reduce((sum, order) => sum + order.total, 0);

    return (
        <div className="dashboard">

            {/* Header Section */}
            <div className="dashboard-header">
                <h1>Store Dashboard</h1>
                <p>Overview of your store performance</p>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Orders</h3>
                    <p>{totalOrders}</p>
                </div>

                <div className="stat-card earnings-card">
                    <h3>Total Earnings</h3>
                    <p>R {totalEarnings.toLocaleString()}</p>
                </div>
            </div>

            {/* Orders Table */}
            <div className="orders-section">
                <h2>Recent Orders</h2>

                <div className="orders-card">
                    <table>
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Status</th>
                                <th>Driver</th>
                                <th>Total (R)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>
                                        <span className={`status ${order.status.replace(/\s/g, '').toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{order.driver}</td>
                                    <td>{order.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;