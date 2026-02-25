import React, { useState } from 'react';
import './ViewProducts.css';

const ViewProducts = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cart, setCart] = useState([]);

    const categories = ['All', 'Pizza', 'Burgers', 'Asian', 'Drinks', 'Desserts'];

    const products = [
        { id: 1, name: 'Margherita Pizza', price: 12.99, category: 'Pizza', rating: 4.8, icon: '🍕', sold: 256 },
        { id: 2, name: 'Pepperoni Pizza', price: 14.99, category: 'Pizza', rating: 4.9, icon: '🍕', sold: 342 },
        { id: 3, name: 'Classic Burger', price: 9.99, category: 'Burgers', rating: 4.7, icon: '🍔', sold: 198 },
        { id: 4, name: 'Cheese Burger', price: 10.99, category: 'Burgers', rating: 4.8, icon: '🍔', sold: 267 },
        { id: 5, name: 'Pad Thai', price: 11.99, category: 'Asian', rating: 4.9, icon: '🍜', sold: 289 },
        { id: 6, name: 'Fried Rice', price: 10.99, category: 'Asian', rating: 4.7, icon: '🍚', sold: 156 },
        { id: 7, name: 'Coca Cola', price: 2.99, category: 'Drinks', rating: 4.5, icon: '🥤', sold: 512 },
        { id: 8, name: 'Fresh Orange Juice', price: 3.99, category: 'Drinks', rating: 4.6, icon: '🧃', sold: 287 },
        { id: 9, name: 'Chocolate Cake', price: 5.99, category: 'Desserts', rating: 4.9, icon: '🍰', sold: 423 },
        { id: 10, name: 'Ice Cream Sundae', price: 4.99, category: 'Desserts', rating: 4.8, icon: '🍨', sold: 356 },
        { id: 11, name: 'BBQ Burger', price: 13.99, category: 'Burgers', rating: 4.9, icon: '🍔', sold: 289 },
        { id: 12, name: 'Spring Rolls', price: 6.99, category: 'Asian', rating: 4.7, icon: '🥟', sold: 234 }
    ];

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    const cartCount = cart.length;

    return (
        <div className="view-products">
            <div className="vp-header">
                <h1>🛍️ Our Products</h1>
                <p>Browse and order your favorite items</p>
            </div>

            <div className="vp-container">
                <div className="vp-main">
                    <div className="vp-filter">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="vp-grid">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="product-card">
                                <div className="product-image">{product.icon}</div>
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <div className="product-meta">
                                        <span className="rating">⭐ {product.rating}</span>
                                        <span className="sold">Sold: {product.sold}</span>
                                    </div>
                                    <div className="product-footer">
                                        <span className="price">${product.price}</span>
                                        <button 
                                            className="add-to-cart-btn"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="vp-cart">
                    <div className="cart-title">
                        <h3>Shopping Cart</h3>
                        <span className="cart-badge">{cartCount}</span>
                    </div>

                    {cartCount === 0 ? (
                        <div className="empty-cart-msg">
                            <p>🛒 No items yet</p>
                            <small>Add products to your cart</small>
                        </div>
                    ) : (
                        <>
                            <div className="cart-list">
                                {cart.map((item, index) => (
                                    <div key={index} className="cart-list-item">
                                        <span>{item.name}</span>
                                        <span className="item-price">${item.price}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="cart-summary">
                                <div className="summary-row">
                                    <strong>Subtotal:</strong>
                                    <strong>${total}</strong>
                                </div>
                                <button className="order-btn">Place Order</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewProducts;