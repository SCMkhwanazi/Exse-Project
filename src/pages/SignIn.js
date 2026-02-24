import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [email, setEmail] = useState('');
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fake login logic (frontend only)
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);

      // Example: choose route based on email
      if (email === "admin@gmail.com") {
        navigate('/sidebar/adminpage');   // Admin
      } else {
        navigate('/sidebar/userpage');   // Normal user
      }
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: '#12086b', minHeight: '100vh', paddingBottom: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <form style={styles.content} ref={formRef} onSubmit={handleSubmit}>
        <h1 className="text-center mb-5">Sign In</h1>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            placeholder="name@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        {/* Password */}
        <div className="mb-3 position-relative">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            id="password"
            required
          />
          <i
            className={`bi toggle-icon ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}
            onClick={handleTogglePassword}
            style={styles.icon}
          />
          <div className="forgot-link">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>

        <button type="submit" className="btn btn-outline-primary w-100">
          Sign In
        </button>
      </form>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
          <div className="toast show align-items-center text-bg-primary border-0">
            <div className="d-flex">
              <div className="toast-body">
                Sign In Successful!
              </div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;

const styles = {
  content: {
    backgroundColor: 'white',
    padding: '60px',
    maxWidth: '500px',
    borderRadius: '10px',
    color:'black',
  },
  icon: {
    position: 'absolute',
    right: '15px',
    top: '35px',
    cursor: 'pointer',
    color: '#6c757d'
  }
};