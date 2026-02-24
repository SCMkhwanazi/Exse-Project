import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    
    <div className="content" >
      <h1 className="fw-bold display-3 ">E'xse!</h1>
      <Link to="/pages/signin">
        <button type="button" className="btn btn-outline-primary me-2">Sign-in</button>
      </Link>

      <Link to="/pages/signup">
        <button type="button" className="btn btn-outline-primary">Sign-up</button>
      </Link>
      <br /><br /><br /><br />
      
      <div className="about-section">
      <h2>About E'xse!</h2>
      <p>
        E'xse is your ultimate platform...
      </p>
      </div>

      
      <footer>
      <div className="social-icons">
        <a href="facebook.com" title="Facebook"><i className="bi bi-facebook"></i></a>
        <a href="twitter.com" title="Twitter"><i className="bi bi-twitter"></i></a>
        <a href="linkedin.com" title="LinkedIn"><i className="bi bi-linkedin"></i></a>
      </div>
      <a href="#top" className="back-to-top">Back to Top ↑</a>

      <div className="contact-info">
        📧 Email: support@Exse.com<br />
        ☎ Phone: +27 (71) 376-6731
      </div>

      <div style={{ marginTop: '15px' }}>
        &copy; 2025 E'xse. All rights reserved.
      </div>
    </footer>
    </div>

  );
};

export default WelcomePage;



