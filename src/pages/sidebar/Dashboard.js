import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const [location, setLocation] = useState('');
    const [deliveryType, setDeliveryType] = useState('Deliver now');

    const handleSearch = () => {
        if (location.trim()) {
            console.log(`Searching for ${deliveryType} at ${location}`);
            // Add search functionality here
        }
    };

    const services = [
        {
            id: 1,
            title: 'Food Delivery',
            description: 'Order food from your favorite restaurants',
            icon: '🍔'
        },
        {
            id: 2,
            title: 'Grocery',
            description: 'Fresh groceries delivered to your door',
            icon: '🛒'
        },
        {
            id: 3,
            title: 'Fast Shipping',
            description: 'Quick and reliable delivery service',
            icon: '🚚'
        },
        {
            id: 4,
            title: 'Save More',
            description: 'Exclusive deals and promotions',
            icon: '💰'
        }
    ];

    return (
        <div className="dashboard">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Order delivery near you</h1>
                    
                    <div className="search-container">
                        <div className="search-box">
                            <span className="search-icon">📍</span>
                            <input
                                type="text"
                                placeholder="Enter delivery address"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>

                        <div className="delivery-dropdown">
                            <span className="dropdown-icon">🕐</span>
                            <select 
                                value={deliveryType} 
                                onChange={(e) => setDeliveryType(e.target.value)}
                            >
                                <option>Deliver now</option>
                                <option>Schedule for later</option>
                                <option>Pickup</option>
                            </select>
                        </div>

                        <button 
                            className="search-btn"
                            onClick={handleSearch}
                        >
                            Find Food
                        </button>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="hero-image">
                    <div className="image-placeholder">
                        <span>🍔🍟🍕</span>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="services-section">
                <h2>Why Choose Us?</h2>
                <div className="services-grid">
                    {services.map((service) => (
                        <div key={service.id} className="service-card">
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Section */}
            <div className="featured-section">
                <h2>Featured Restaurants</h2>
                <div className="featured-grid">
                    <div className="featured-card">
                        <div className="featured-image">🍕</div>
                        <h3>Pizza Palace</h3>
                        <p>Italian • 30 min</p>
                    </div>
                    <div className="featured-card">
                        <div className="featured-image">🍜</div>
                        <h3>Noodle House</h3>
                        <p>Asian • 25 min</p>
                    </div>
                    <div className="featured-card">
                        <div className="featured-image">🍔</div>
                        <h3>Burger Hub</h3>
                        <p>American • 20 min</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;