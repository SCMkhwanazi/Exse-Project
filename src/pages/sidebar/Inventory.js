import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  // Load products from localStorage (shared with Products)
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      const products = JSON.parse(savedProducts);
      const inventoryItems = products.map(prod => ({
        name: prod.name,
        category: prod.category,
        stock: prod.stockCount || 0,
        status: getStockStatus(prod.stockCount || 0)
      }));
      setInventory(inventoryItems);
    } else {
      // Default inventory if no products exist
      setInventory([
        { name: 'Rice 10kg', category: 'Groceries', stock: 120, status: 'In stock' },
        { name: 'Cooking Oil 5L', category: 'Groceries', stock: 8, status: 'Low stock' },
        { name: 'Soap Pack', category: 'Household', stock: 0, status: 'Out of stock' },
        { name: 'Sugar 2kg', category: 'Groceries', stock: 25, status: 'In stock' }
      ]);
    }
  }, []);

  const getStockStatus = (stock) => {
    if (stock === 0) return 'Out of stock';
    if (stock < 10) return 'Low stock';
    return 'In stock';
  };

  const handleRestock = (item) => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      const products = JSON.parse(savedProducts);
      const updatedProducts = products.map(p => {
        if (p.name === item.name) {
          return { ...p, stockCount: (p.stockCount || 0) + 50, stock: true };
        }
        return p;
      });
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      // Update local inventory state
      setInventory(updatedProducts.map(prod => ({
        name: prod.name,
        category: prod.category,
        stock: prod.stockCount || 0,
        status: getStockStatus(prod.stockCount || 0)
      })));
      
      alert('Restocked ' + item.name + '! New stock: ' + (item.stock + 50));
    }
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
            {inventory.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.stock}</td>
                <td>
                  <span className={'status-badge ' + (item.status === 'In stock' ? 'active' : item.status === 'Low stock' ? 'pending' : 'completed')}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="admin-btn admin-btn-outline" 
                    style={{fontSize:'12px'}} 
                    onClick={() => handleRestock(item)}
                  >
                    Restock
                  </button>
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
