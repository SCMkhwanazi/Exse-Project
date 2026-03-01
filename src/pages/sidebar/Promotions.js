import React, { useState } from 'react';
import './PromotionsPage.css';

const Products = () => {
    const [activePromo, setActivePromo] = useState(null);

    const promotions = [
        {
            id: 1,
            company: 'Shoprite',
            title: '50% Off First Order!',
            description: 'Get 50% discount on your first online order. Minimum order R500',
            code: 'FIRST50',
            discount: '50%',
            validTill: 'March 31, 2026',
            category: 'Grocery Special'
        },
        {
            id: 2,
            company: 'Shoprite',
            title: 'Bulk orders 5% Off',
            description: 'Orders over R1000. Valid on all sizes',
            code: 'Shop5',
            discount: '5%',
            validTill: 'March 30, 2026',
            category: 'Grocery Special'
        },
        {
            id: 3,
            company: 'Takelot',
            title: 'Welcome Prome',
            description: 'Free delivery on orders over R520 for new customers',
            code: 'Take_FREE',
            discount: 'Free Delivery',
            validTill: 'March 28, 2026',
            category: 'Delivery'
        },
        {
            id: 4,
            
            company: 'PicknPay',
            title: 'Baby Choices - 10% Off',
            description: 'Get 10% off on all health and wellness products for babies',
            code: 'HEALTHY10',
            discount: '10%',
            validTill: 'April 5, 2026',
            category: 'Health'
        },
        {
            id: 5,
            company:"Waltons Stationery",
            title: 'Student Discount - 15% Off',
            description: 'Show your school ID and get 15% discount on books and stationery',
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
                <h1>Special Offers & Promotions</h1>
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

                            <p className="vpromo-description">{promo.company}</p>

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
        </div>
    );
};
export default Products;