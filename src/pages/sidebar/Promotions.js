import React, { useState } from 'react';
import './PromotionsPage.css';

const Products = () => {
    const [activePromo, setActivePromo] = useState(null);

    const promotions = [
        {
            id: 1,
            title: '🎉 50% Off First Order!',
            description: 'Get 50% discount on your first order. Minimum order $15',
            code: 'FIRST50',
            discount: '50%',
            validTill: 'March 31, 2026',
            category: 'New Users'
        },
        {
            id: 2,
            title: '🍕 Pizza Party - 30% Off',
            description: 'Order any pizza and get 30% discount. Valid on all sizes',
            code: 'PIZZA30',
            discount: '30%',
            validTill: 'March 30, 2026',
            category: 'Pizza Special'
        },
        {
            id: 3,
            title: '🍔 Free Delivery on Burgers',
            description: 'Free delivery on orders over $20 from burger restaurants',
            code: 'BURGER_FREE',
            discount: 'Free Delivery',
            validTill: 'March 28, 2026',
            category: 'Delivery'
        },
        {
            id: 4,
            title: '🥗 Healthy Choices - 25% Off',
            description: 'Get 25% off on all healthy salads and bowls',
            code: 'HEALTHY25',
            discount: '25%',
            validTill: 'April 5, 2026',
            category: 'Health'
        },
        {
            id: 5,
            title: '☕ Combo Deal - $9.99',
            description: 'Get any burger with fries and drink for just $9.99',
            code: 'COMBO99',
            discount: '$9.99',
            validTill: 'March 25, 2026',
            category: 'Combo'
        },
        {
            id: 6,
            title: '🎯 Loyalty Rewards - Extra 10%',
            description: 'Earn 10% extra on your loyalty points this week',
            code: 'LOYALTY10',
            discount: '10%',
            validTill: 'March 27, 2026',
            category: 'Loyalty'
        },
        {
            id: 7,
            title: '🍜 Asian Cuisine - 20% Off',
            description: 'Enjoy 20% discount on all Asian restaurants',
            code: 'ASIAN20',
            discount: '20%',
            validTill: 'April 2, 2026',
            category: 'Regional'
        },
        {
            id: 8,
            title: '🎓 Student Discount - 15% Off',
            description: 'Show your school ID and get 15% discount on all orders',
            code: 'STUDENT15',
            discount: '15%',
            validTill: 'April 15, 2026',
            category: 'Special'
        }
    ];

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        alert(`Code ${code} copied!`);
    };

    const categories = ['All', ...new Set(promotions.map(p => p.category))];
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredPromos = selectedCategory === 'All' 
        ? promotions 
        : promotions.filter(p => p.category === selectedCategory);

    return (
        <div className="promotions">
            <div className="promo-header">
                <h1>🎁 Special Offers & Promotions</h1>
                <p>Don't miss out on amazing deals!</p>
            </div>

            <div className="promo-container">
                <div className="promo-filter">
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

                <div className="promo-grid">
                    {filteredPromos.map((promo) => (
                        <div 
                            key={promo.id}
                            className="promo-card"
                            onClick={() => setActivePromo(activePromo === promo.id ? null : promo.id)}
                        >
                            <div className="promo-top">
                                <h2>{promo.title}</h2>
                                <div className="discount-badge">{promo.discount}</div>
                            </div>

                            <p className="promo-description">{promo.description}</p>

                            <div className="promo-footer">
                                <small>Valid till {promo.validTill}</small>
                                <span className="category-tag">{promo.category}</span>
                            </div>

                            {activePromo === promo.id && (
                                <div className="promo-expanded">
                                    <div className="code-display">
                                        <span className="code-label">Promo Code:</span>
                                        <code>{promo.code}</code>
                                    </div>
                                    <button 
                                        className="copy-btn"
                                        onClick={() => copyCode(promo.code)}
                                    >
                                        📋 Copy Code
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="promo-info">
                <h3>How to Use Promotions</h3>
                <ol>
                    <li>Select a promotion that interests you</li>
                    <li>Click to view the promo code</li>
                    <li>Copy the code to your clipboard</li>
                    <li>Enter the code at checkout to get your discount</li>
                </ol>
            </div>
        </div>
    );
};
export default Products;