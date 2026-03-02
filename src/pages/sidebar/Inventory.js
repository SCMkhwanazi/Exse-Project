import React from 'react';
import './AdminDashboard.css';

const Inventory = () => {
  const items = [
    { name: 'Rice 10kg', category: 'Groceries', stock: 120, status: 'In stock' },
    { name: 'Cooking Oil 5L', category: 'Groceries', stock: 8, status: 'Low stock' },
    { name: 'Soap Pack', category: 'Household', stock: 0, status: 'Out of stock' },
    { name: 'Sugar 2kg', category: 'Groceries', stock: 25, status: 'In stock' }
  ];

  const handleRestock = (item) => {
    alert(`Restocking ${item.name}`);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Inventory</h1>
        <p>Monitor and manage stock levels</p>
      </div>
      <div className="content-section">
        <table className="data-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(it => (
              <tr key={it.name}>
                <td>{it.name}</td>
                <td>{it.category}</td>
                <td>{it.stock}</td>
                <td><span className={`status-badge ${it.status === 'In stock' ? 'active' : it.status === 'Low stock' ? 'pending' : 'completed'}`}>{it.status}</span></td>
                <td>
                  <button className="admin-btn admin-btn-outline" style={{fontSize:'12px'}} onClick={() => handleRestock(it)}>Restock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
