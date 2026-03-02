import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    category: '',
    weight: '',
    price: '',
    stock: true
  });

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Default products
      const defaultProducts = [
        { id: 1, name: 'Rice 10kg', company: 'Shoprite', category: 'Groceries', weight: '10kg', price: 'R200.00', stock: true, stockCount: 120 },
        { id: 2, name: 'Cooking Oil 5L', company: 'Luka Market', category: 'Groceries', weight: '5L', price: 'R120.50', stock: true, stockCount: 8 },
        { id: 3, name: 'Soap Pack', company: 'PicknPay', category: 'Household', weight: '3x1kg', price: 'R45.00', stock: false, stockCount: 0 },
        { id: 4, name: 'Soda 2L', company: 'Shoprite', category: 'Drinks', weight: '2L', price: 'R25.00', stock: true, stockCount: 50 },
        { id: 5, name: 'Milk 1L', company: 'PicknPay', category: 'Dairy', weight: '1L', price: 'R30.99', stock: true, stockCount: 30 }
      ];
      setProducts(defaultProducts);
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(prod =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prod.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prod.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      company: '',
      category: '',
      weight: '',
      price: '',
      stock: true
    });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      company: product.company,
      category: product.category,
      weight: product.weight,
      price: product.price,
      stock: product.stock,
      stockCount: product.stockCount || 0
    });
    setShowModal(true);
  };

  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      const updatedProducts = products.filter(p => p.id !== product.id);
      setProducts(updatedProducts);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? { ...formData, id: editingProduct.id, stockCount: formData.stockCount || 0 }
          : p
      );
      setProducts(updatedProducts);
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: Date.now(),
        stockCount: formData.stockCount || 0
      };
      setProducts([...products, newProduct]);
    }
    
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return 'Out of stock';
    if (stock < 10) return 'Low stock';
    return 'In stock';
  };

  const getStatusClass = (status) => {
    if (status === 'Out of stock') return 'completed';
    if (status === 'Low stock') return 'pending';
    return 'active';
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <h1>Products</h1>
        <p>Manage products</p>
      </div>

      {/* Search and Add */}
      <div className="content-section">
        <div className="admin-search">
          <div className="admin-search-box">
            <span>🔍</span>
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="admin-btn" onClick={handleAdd}>+ Add Product</button>
        </div>

        {/* Products Grid */}
        <div className="admin-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(prod => (
              <div className="admin-card" key={prod.id}>
                <h3>{prod.name}</h3>
                <p><strong>Company:</strong> {prod.company}</p>
                <p><strong>Category:</strong> {prod.category}</p>
                <p><strong>Weight:</strong> {prod.weight}</p>
                <p><strong>Price:</strong> {prod.price}</p>
                <p><strong>Stock:</strong> {prod.stock ? 'Yes' : 'No'} ({prod.stockCount || 0})</p>
                <p>
                  <strong>Status:</strong> <span className={`status-badge ${getStatusClass(getStockStatus(prod.stockCount || 0))}`}>
                    {getStockStatus(prod.stockCount || 0)}
                  </span>
                </p>
                <div className="card-actions">
                  <button className="admin-btn m-2" onClick={() => handleEdit(prod)}>Edit</button>
                  <button className="admin-btn admin-btn-outline" onClick={() => handleDelete(prod)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No products found</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="product-modal" onClick={e => e.stopPropagation()}>
            <div className="product-modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter product name"
                />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="Enter company name"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Household">Household</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Frozen">Frozen</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Weight/Pack Size</label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 10kg, 5L, 3x1kg"
                />
              </div>
              <div className="form-group">
                <label>Price (R)</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="e.g., R200.00"
                />
              </div>
              <div className="form-group">
                <label>Stock Quantity</label>
                <input
                  type="number"
                  name="stockCount"
                  value={formData.stockCount || ''}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="Enter stock quantity"
                />
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="stock"
                    checked={formData.stock}
                    onChange={handleChange}
                  />
                  In Stock
                </label>
              </div>
              <div className="modal-actions">
                <button type="submit" className="admin-btn">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button 
                  type="button" 
                  className="admin-btn admin-btn-outline" 
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
