import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' // default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [matchMessage, setMatchMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleToggle = (type) => {
    if (type === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedForm = { ...formData, [id]: value };
    setFormData(updatedForm);

    // Password match validation
    if (id === 'password' || id === 'confirmPassword') {
      if (!updatedForm.confirmPassword) {
        setMatchMessage('');
      } else if (updatedForm.password === updatedForm.confirmPassword) {
        setMatchMessage('✅ Passwords match!');
      } else {
        setMatchMessage('❌ Passwords do not match');
      }
    }
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setMatchMessage('❌ Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setMatchMessage('❌ Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // simple localStorage user database
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find(u => u.email === formData.email);
    if (exists) {
      setToastMessage('Email is already registered');
      setShowToast(true);
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    users.push({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role
    });
    localStorage.setItem('users', JSON.stringify(users));

    setToastMessage('Sign Up Successful!');
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      navigate('/pages/signin'); // Redirect to sign in after success
    }, 1500);

    // Reset form
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user'
    });
    setMatchMessage('');
    setIsLoading(false);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formWrapper}>
        <form style={styles.content} onSubmit={handleSubmit} ref={formRef}>
          <h1 style={styles.title}>Create Account</h1>
          <p style={styles.subtitle}>Join E'xse today!</p>

          {/* Full Name */}
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>Full Name</label>
            <input 
              type="text" 
              style={styles.input}
              id="username" 
              placeholder="Enter your full name"
              value={formData.username} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Role selection */}
          <div style={styles.inputGroup}>
            <label htmlFor="role" style={styles.label}>I am a</label>
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="user">Customer</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email address</label>
            <input 
              type="email" 
              style={styles.input}
              id="email" 
              placeholder="name@example.com" 
              value={formData.email} 
              onChange={handleChange} 
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
                placeholder="Create a password"
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
              <i 
                className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`} 
                onClick={() => handleToggle('password')} 
                style={styles.toggleIcon} 
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div style={styles.inputGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
            <div style={styles.passwordContainer}>
              <input 
                type={showConfirmPassword ? 'text' : 'password'} 
                style={styles.passwordInput}
                id="confirmPassword" 
                placeholder="Confirm your password"
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
              />
              <i 
                className={`bi ${showConfirmPassword ? 'bi-eye' : 'bi-eye-slash'}`} 
                onClick={() => handleToggle('confirm')} 
                style={styles.toggleIcon} 
              />
            </div>
            {matchMessage && (
              <div style={{
                ...styles.message,
                color: matchMessage.includes('✅') ? '#28a745' : '#dc3545'
              }}>
                {matchMessage}
              </div>
            )}
          </div>

          {/* Password Requirements */}
          <div style={styles.requirements}>
            <p style={styles.requirementsText}>
              <i className="bi bi-shield-check" style={styles.requirementIcon}></i>
              Password must be at least 6 characters
            </p>
          </div>

          <button 
            type="submit" 
            style={styles.signUpButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
          
          <div style={styles.signinLink}>
            Already have an account? <Link to="/pages/signin" style={styles.signinText}>Sign In</Link>
          </div>
        </form>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div style={styles.toastContainer}>
          <div style={{
            ...styles.toast,
            backgroundColor: toastMessage.includes('Error') ? '#dc3545' : '#8a7be0'
          }}>
            <div style={styles.toastContent}>
              <span>{toastMessage}</span>
              <button
                style={styles.toastClose}
                onClick={() => setShowToast(false)}
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;

const styles = {
  pageContainer: {
    backgroundColor: '#8a7be0', // Purple background matching sign-in page
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  
  formWrapper: {
    width: '100%',
    maxWidth: '500px',
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
    marginBottom: '10px'
  },
  
  subtitle: {
    fontSize: '16px',
    color: '#5f5a8a',
    textAlign: 'center',
    marginBottom: '30px'
  },
  
  inputGroup: {
    marginBottom: '20px'
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
  
  message: {
    fontSize: '14px',
    marginTop: '8px',
    fontWeight: '500'
  },
  
  requirements: {
    marginBottom: '25px',
    padding: '10px',
    backgroundColor: '#f8f5ff',
    borderRadius: '8px'
  },
  
  requirementsText: {
    fontSize: '13px',
    color: '#5f5a8a',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  
  requirementIcon: {
    color: '#8a7be0',
    fontSize: '16px'
  },
  
  signUpButton: {
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
    marginBottom: '20px'
  },
  
  signinLink: {
    textAlign: 'center',
    fontSize: '15px',
    color: '#5f5a8a'
  },
  
  signinText: {
    color: '#8a7be0',
    textDecoration: 'none',
    fontWeight: '600',
    marginLeft: '5px'
  },
  
  toastContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 9999
  },
  
  toast: {
    color: 'white',
    padding: '15px 25px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(138, 123, 224, 0.3)',
    animation: 'slideIn 0.3s ease'
  },
  
  toastContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  
  toastClose: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '0',
    display: 'flex',
    alignItems: 'center'
  }
};

// Add this to your global CSS
