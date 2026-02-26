import React, { useState } from 'react';
import DataService from '../../utils/dataService';
import './PlaceOrders.css';

const PlaceOrders = () => {
    const [cart, setCart] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const restaurants = [
        {
            id: 1,
            name: 'Pizza Palace',
            category: 'Italian',
            rating: 4.8,
            deliveryTime: '30 min',
            deliveryFee: '$2.99',
            items: [
                { id: 101, name: 'Margherita Pizza', price: 12.99, desc: 'Classic cheese pizza' },
                { id: 102, name: 'Pepperoni Pizza', price: 14.99, desc: 'Loaded with pepperoni' },
                { id: 103, name: 'Garlic Bread', price: 5.99, desc: 'Freshly baked' }
            ]
        },
        {
            id: 2,
            name: 'Burger Hub',
            category: 'American',
            rating: 4.6,
            deliveryTime: '20 min',
            deliveryFee: '$1.99',
            items: [
                { id: 201, name: 'Classic Burger', price: 9.99, desc: 'Beef patty with toppings' },
                { id: 202, name: 'Cheese Burger', price: 10.99, desc: 'Double cheese' },
                { id: 203, name: 'French Fries', price: 4.99, desc: 'Crispy and golden' }
            ]
        },
        {
            id: 3,
            name: 'Noodle House',
            category: 'Asian',
            rating: 4.7,
            deliveryTime: '25 min',
            deliveryFee: '$2.49',
            items: [
                { id: 301, name: 'Pad Thai', price: 11.99, desc: 'Authentic Thai noodles' },
                { id: 302, name: 'Fried Rice', price: 10.99, desc: 'With egg and vegetables' },
                { id: 303, name: 'Spring Rolls', price: 6.99, desc: 'Fresh rolls' }
            ]
        }
    ];

    const addToCart = (item, restaurant) => {
        const newItem = { 
            ...item, 
            restaurantId: restaurant.id, 
            restaurantName: restaurant.name,
            cartId: Date.now() + Math.random()
        };
        setCart([...cart, newItem]);
    };

    const removeFromCart = (cartId) => {
        setCart(cart.filter(item => item.cartId !== cartId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const handlePlaceOrder = () => {
        if (cart.length === 0) {
            alert('Your cart is empty! Add some items first.');
            return;
        }

        // persist order to "backend"
        const current = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const newOrder = {
            id: `ORD-${Date.now()}`,
            customerName: current.username || current.email || 'Guest',
            customerEmail: current.email || 'guest',
            date: new Date().toISOString().split('T')[0],
            items: cart,
            total: total,
            status: 'Pending'
        };
        DataService.addOrder(newOrder);

        // Show order placed toast and clear cart immediately
        setShowToast(true);
        setOrderPlaced(true);
        setCart([]); // Clear cart immediately

        // Hide toast after 3 seconds
        setTimeout(() => {
            setShowToast(false);
            setOrderPlaced(false);
        }, 3000);
    };

    const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    return (
        <div className="place-orders">
            {/* Toast Notification */}
            {showToast && (
                <div className="toast-notification">
                    <div className="toast-content">
                        <i className="bi bi-check-circle-fill"></i>
                        <span>Order placed successfully! 🎉</span>
                    </div>
                </div>
            )}

            <div className="po-header">
                <h1>🛒 Place Your Order</h1>
                <p>Select from our favorite restaurants</p>
            </div>

            <div className="po-container">
                <div className="po-main">
                    {!selectedRestaurant ? (
                        <div className="restaurants-list">
                            {restaurants.map((restaurant) => (
                                <div 
                                    key={restaurant.id}
                                    className="restaurant-item"
                                    onClick={() => setSelectedRestaurant(restaurant)}
                                >
                                    <div className="restaurant-header">
                                        <h2>{restaurant.name}</h2>
                                        <div className="restaurant-rating">
                                            <span className="star">⭐</span>
                                            <span>{restaurant.rating}</span>
                                        </div>
                                    </div>
                                    <p className="restaurant-category">{restaurant.category}</p>
                                    <div className="restaurant-info">
                                        <span>⏱️ {restaurant.deliveryTime}</span>
                                        <span>💳 {restaurant.deliveryFee} delivery</span>
                                    </div>
                                    <button className="view-menu-btn">View Menu</button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="menu-view">
                            <button className="back-btn" onClick={() => setSelectedRestaurant(null)}>
                                ← Back to Restaurants
                            </button>
                            <h2>{selectedRestaurant.name}</h2>
                            <div className="menu-items">
                                {selectedRestaurant.items.map((item) => (
                                    <div key={item.id} className="menu-item">
                                        <div className="item-content">
                                            <h3>{item.name}</h3>
                                            <p>{item.desc}</p>
                                            <span className="item-price">${item.price}</span>
                                        </div>
                                        <button 
                                            className="add-btn"
                                            onClick={() => addToCart(item, selectedRestaurant)}
                                        >
                                            + Add
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="cart-sidebar">
                    <div className="cart-header">
                        <h3>Your Cart</h3>
                        <div className="cart-header-actions">
                            {cart.length > 0 && (
                                <button className="clear-cart-btn" onClick={clearCart}>
                                    Clear All
                                </button>
                            )}
                            <span className="cart-count">{cart.length}</span>
                        </div>
                    </div>

                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <p>🛍️ Your cart is empty</p>
                            <small>Add items to get started</small>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cart.map((item) => (
                                    <div key={item.cartId} className="cart-item">
                                        <div className="cart-item-details">
                                            <p className="item-name">{item.name}</p>
                                            <p className="item-restaurant">{item.restaurantName}</p>
                                            <p className="item-price">${item.price}</p>
                                        </div>
                                        <button 
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.cartId)}
                                            title="Remove item"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-footer">
                                <div className="total">
                                    <strong>Total:</strong>
                                    <strong>${total}</strong>
                                </div>
                                <button 
                                    className={`checkout-btn ${orderPlaced ? 'placed' : ''}`}
                                    onClick={handlePlaceOrder}
                                    disabled={cart.length === 0 || orderPlaced}
                                >
                                    {orderPlaced ? '✓ Order Placed!' : 'Place Order'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlaceOrders;