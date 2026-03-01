import React from 'react';
import './AdminDashboard.css';

const Products = () =>{
    return(
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
                        <input type="text" placeholder="Search products..." />
                    </div>
                    <button className="admin-btn">Add Product</button>
                </div>

                {/* Products Grid */}
                <div className="admin-grid">
                    <div className="admin-card">
                        <h3>Product 1</h3>
                        <p>Company: Shoprite</p>
                        <p>Category: Meat</p>
                        <p>Weight: 5kg</p>
                        <p>Price: R200.00</p>
                        <p>Stock: Yes</p>
                        <button className="admin-btn m-2">Edit</button>
                        <button className="admin-btn">Delete</button>
                    </div>
                    <div className="admin-card">
                        <h3>Product 2</h3>
                        <p>Company: Luka Market</p>
                        <p>Category: Drinks</p>
                        <p>Weight: 6 x 500ml</p>
                        <p>Price: R149.99</p>
                        <p>Stock: Yes</p>
                        <button className="admin-btn m-2">Edit</button>
                        <button className="admin-btn">Delete</button>
                    </div>
                    <div className="admin-card">
                        <h3>Product 3</h3>
                        <p>Company: PicknPay</p>
                        <p>Category: Dairy</p>
                        <p>Weight: 1 x 1L</p>
                        <p>Price: R30.99</p>
                        <p>Stock: No</p>
                        <button className="admin-btn m-2">Edit</button>
                        <button className="admin-btn">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Products;
