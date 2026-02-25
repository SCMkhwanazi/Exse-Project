import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/Auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const WelcomePage = () => {
  return (
    <div style={styles.pageWrapper}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroOverlay}>
          <div className="container text-center text-white">
            <h1 style={styles.heroTitle}>E'xse!</h1>
            <p style={styles.heroSubtitle}>Your Ultimate Food Delivery Experience</p>
            
            <div style={styles.buttonGroup}>
              <Link to="/pages/signin">
                <button style={styles.signInBtn}>
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Sign In
                </button>
              </Link>
              
              <Link to="/pages/signup">
                <button style={styles.signUpBtn}>
                  <i className="bi bi-person-plus me-2"></i>
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div style={styles.aboutSection}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div style={styles.aboutImagePlaceholder}>
                <i className="bi bi-cup-hot-fill" style={styles.aboutIcon}></i>
              </div>
            </div>
            
            <div className="col-lg-6">
              <h2 style={styles.aboutTitle}>About E'xse!</h2>
              <div style={styles.aboutDivider}></div>
              <p style={styles.aboutText}>
                E'xse is your ultimate platform for discovering and ordering delicious food 
                from the best restaurants in town. We connect food lovers with amazing 
                culinary experiences, offering everything from quick bites to gourmet meals.
              </p>
              
              <div style={styles.featureGrid}>
                <div style={styles.featureItem}>
                  <i className="bi bi-truck" style={styles.featureIcon}></i>
                  <span>Fast Delivery</span>
                </div>
                <div style={styles.featureItem}>
                  <i className="bi bi-star-fill" style={styles.featureIcon}></i>
                  <span>Top Rated</span>
                </div>
                <div style={styles.featureItem}>
                  <i className="bi bi-clock-history" style={styles.featureIcon}></i>
                  <span>24/7 Service</span>
                </div>
                <div style={styles.featureItem}>
                  <i className="bi bi-shield-check" style={styles.featureIcon}></i>
                  <span>Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <h4 style={styles.footerTitle}>E'xse!</h4>
              <p style={styles.footerText}>
                Delivering happiness to your doorstep, one meal at a time.
              </p>
            </div>
            
            <div className="col-md-4 mb-4 mb-md-0">
              <h5 style={styles.footerHeading}>Contact Info</h5>
              <div style={styles.contactInfo}>
                <p><i className="bi bi-envelope-fill me-2"></i> support@Exse.com</p>
                <p><i className="bi bi-telephone-fill me-2"></i> +27 (71) 376-6731</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <h5 style={styles.footerHeading}>Follow Us</h5>
              <div style={styles.socialIcons}>
                <a href="https://facebook.com" style={styles.socialLink}><i className="bi bi-facebook"></i></a>
                <a href="https://twitter.com" style={styles.socialLink}><i className="bi bi-twitter"></i></a>
                <a href="https://linkedin.com" style={styles.socialLink}><i className="bi bi-linkedin"></i></a>
                <a href="https://instagram.com" style={styles.socialLink}><i className="bi bi-instagram"></i></a>
              </div>
            </div>
          </div>
          
          <div style={styles.footerBottom}>
            <p>&copy; 2025 E'xse. All rights reserved.</p>
            <a href="#top" style={styles.backToTop}>
              Back to Top <i className="bi bi-arrow-up-short"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  pageWrapper: {
    backgroundColor: '#f8f5ff', // Light lavender background
    minHeight: '100vh'
  },
  
  heroSection: {
    background: 'linear-gradient(135deg, #8a7be0 0%, #6b5fc7 100%)', // Purple gradient
    minHeight: '500px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  heroOverlay: {
    width: '100%',
    padding: '80px 0'
  },
  
  heroTitle: {
    fontSize: '72px',
    fontWeight: '800',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
    animation: 'fadeInDown 1s ease'
  },
  
  heroSubtitle: {
    fontSize: '24px',
    marginBottom: '40px',
    opacity: '0.95',
    fontWeight: '300'
  },
  
  buttonGroup: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  
  signInBtn: {
    backgroundColor: 'white',
    color: '#8a7be0',
    border: 'none',
    padding: '15px 40px',
    borderRadius: '50px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },
  
  signUpBtn: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    padding: '15px 40px',
    borderRadius: '50px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  },
  
  aboutSection: {
    padding: '80px 0',
    backgroundColor: '#ffffff'
  },
  
  aboutImagePlaceholder: {
    width: '100%',
    height: '350px',
    background: 'linear-gradient(135deg, #e0d3ff 0%, #c5b4ff 100%)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 30px rgba(138, 123, 224, 0.2)'
  },
  
  aboutIcon: {
    fontSize: '120px',
    color: '#8a7be0'
  },
  
  aboutTitle: {
    fontSize: '42px',
    fontWeight: '700',
    color: '#2d2b4e',
    marginBottom: '15px'
  },
  
  aboutDivider: {
    width: '80px',
    height: '4px',
    backgroundColor: '#8a7be0',
    marginBottom: '25px',
    borderRadius: '2px'
  },
  
  aboutText: {
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#5f5a8a',
    marginBottom: '30px'
  },
  
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px'
  },
  
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
    color: '#2d2b4e'
  },
  
  featureIcon: {
    color: '#8a7be0',
    fontSize: '24px'
  },
  
  footer: {
    backgroundColor: '#2d2b4e', // Deep purple
    color: 'white',
    padding: '60px 0 30px'
  },
  
  footerTitle: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '15px',
    color: '#ffffff'
  },
  
  footerText: {
    color: '#b4a9e0',
    lineHeight: '1.6'
  },
  
  footerHeading: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#ffffff'
  },
  
  contactInfo: {
    color: '#b4a9e0',
    lineHeight: '2'
  },
  
  socialIcons: {
    display: 'flex',
    gap: '15px'
  },
  
  socialLink: {
    color: 'white',
    fontSize: '24px',
    transition: 'color 0.3s ease',
    textDecoration: 'none'
  },
  
  footerBottom: {
    marginTop: '50px',
    paddingTop: '30px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    color: '#b4a9e0'
  },
  
  backToTop: {
    color: '#ffffff',
    textDecoration: 'none',
    padding: '8px 20px',
    backgroundColor: 'rgba(138, 123, 224, 0.3)',
    borderRadius: '25px',
    transition: 'background-color 0.3s ease'
  }
};

// Add these animations to your global CSS or create a style tag


export default WelcomePage;