import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        navigate('/sidebar/adminpage');
      } else {
        navigate('/sidebar/dashboard');
      }
    }, 1000);
  };

  return (
    <div style={styles.pageContainer}>
      {/* Toast Notification - TOP CENTER */}
      {showToast && (
        <div style={styles.toastContainer}>
          <div style={styles.toast}>
            <div style={styles.toastContent}>
              <i className="bi bi-check-circle-fill" style={styles.toastIcon}></i>
              <span style={styles.toastMessage}>Sign In Successful!</span>
            </div>
          </div>
        </div>
      )}

      <div style={styles.formWrapper}>
        <form style={styles.content} ref={formRef} onSubmit={handleSubmit}>
          <h1 style={styles.title}>Sign In</h1>

          {/* Email */}
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email address</label>
            <input 
              type="email" 
              style={styles.input}
              id="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                style={styles.passwordInput}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}
                onClick={handleTogglePassword}
                style={styles.toggleIcon}
              />
            </div>
            <div style={styles.forgotLink}>
              <Link to="/forgot-password" style={styles.forgotText}>Forgot Password?</Link>
            </div>
          </div>

          <button type="submit" style={styles.signInButton}>
            Sign In
          </button>
          
          <div style={styles.signupLink}>
            Don't have an account? <Link to="/pages/signup" style={styles.signupText}>Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

const styles = {
  pageContainer: {
    backgroundColor: '#8a7be0',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    position: 'relative' // For toast positioning
  },
  
  // Updated Toast Container - TOP CENTER
  toastContainer: {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9999,
    animation: 'slideDown 0.3s ease'
  },
  
  toast: {
    backgroundColor: '#bb79b8', // Green for success
    color: 'white',
    padding: '16px 30px',
    borderRadius: '50px',
    boxShadow: '0 5px 20px rgba(40, 167, 69, 0.3)',
    display: 'flex',
    alignItems: 'center',
    minWidth: '300px',
    justifyContent: 'center'
  },
  
  toastContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  
  toastIcon: {
    fontSize: '22px'
  },
  
  toastMessage: {
    fontSize: '16px',
    fontWeight: '500'
  },
  
  formWrapper: {
    width: '100%',
    maxWidth: '450px',
    margin: '0 auto'
  },
  
  content: {
    backgroundColor: 'white',
    padding: '50px 40px',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
  },
  
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#2d2b4e',
    textAlign: 'center',
    marginBottom: '40px'
  },
  
  inputGroup: {
    marginBottom: '25px'
  },
  
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#2d2b4e',
    marginBottom: '8px'
  },
  
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '15px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    backgroundColor: '#f8f9fa'
  },
  
  passwordContainer: {
    position: 'relative',
    width: '100%'
  },
  
  passwordInput: {
    width: '100%',
    padding: '12px 45px 12px 16px',
    fontSize: '15px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    backgroundColor: '#f8f9fa'
  },
  
  toggleIcon: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#8a7be0',
    fontSize: '18px',
    zIndex: 10
  },
  
  forgotLink: {
    textAlign: 'right',
    marginTop: '8px'
  },
  
  forgotText: {
    color: '#8a7be0',
    fontSize: '14px',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s ease'
  },
  
  signInButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#8a7be0',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
    marginBottom: '20px'
  },
  
  signupLink: {
    textAlign: 'center',
    fontSize: '15px',
    color: '#5f5a8a'
  },
  
  signupText: {
    color: '#8a7be0',
    textDecoration: 'none',
    fontWeight: '600',
    marginLeft: '5px'
  }
};

