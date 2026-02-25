import React from 'react';
import './AdminDashboard.css';

const Products = () =>{
    return(
        <div className="admin-page">
            {/* Header */}
            <div className="admin-header">
                <h1>Products</h1>
                <p>Manage your product inventory</p>
            </div>

            {/* Search and Add */}
            <div className="content-section">
                <div className="admin-search">
                    <div className="admin-search-box">
                        <span>🔍</span>
                        <input type="text" placeholder="Search products..." />
                    </div>
                    <button className="admin-btn">Add Product</button>
                </div>

                {/* Products Grid */}
                <div className="admin-grid">
                    <div className="admin-card">
                        <h3>Product 1</h3>
                        <p>Category: Electronics</p>
                        <p>Price: $99.99</p>
                        <p>Stock: 50</p>
                    </div>
                    <div className="admin-card">
                        <h3>Product 2</h3>
                        <p>Category: Clothing</p>
                        <p>Price: $49.99</p>
                        <p>Stock: 100</p>
                    </div>
                    <div className="admin-card">
                        <h3>Product 3</h3>
                        <p>Category: Food</p>
                        <p>Price: $19.99</p>
                        <p>Stock: 200</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Products;
