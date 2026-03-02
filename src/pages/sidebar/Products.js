import React from 'react';
import './AdminDashboard.css';

const Products = () =>{
    const productList = [
        { id: 1, name: 'Rice 10kg', company: 'Shoprite', category: 'Groceries', weight: '10kg', price: 'R200.00', stock: true },
        { id: 2, name: 'Cooking Oil 5L', company: 'Luka Market', category: 'Groceries', weight: '5L', price: 'R120.50', stock: true },
        { id: 3, name: 'Soap Pack', company: 'PicknPay', category: 'Household', weight: '3x1kg', price: 'R45.00', stock: false },
        { id: 4, name: 'Soda 2L', company: 'Shoprite', category: 'Drinks', weight: '2L', price: 'R25.00', stock: true },
        { id: 5, name: 'Milk 1L', company: 'PicknPay', category: 'Dairy', weight: '1L', price: 'R30.99', stock: true }
    ];

    const handleEdit = (product) => alert(`Edit ${product.name}`);
    const handleDelete = (product) => alert(`Delete ${product.name}`);

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
                    {productList.map(prod => (
                        <div className="admin-card" key={prod.id}>
                            <h3>{prod.name}</h3>
                            <p>Company: {prod.company}</p>
                            <p>Category: {prod.category}</p>
                            <p>Weight: {prod.weight}</p>
                            <p>Price: {prod.price}</p>
                            <p>Stock: {prod.stock ? 'Yes' : 'No'}</p>
                            <button className="admin-btn m-2" onClick={() => handleEdit(prod)}>Edit</button>
                            <button className="admin-btn" onClick={() => handleDelete(prod)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Products;
