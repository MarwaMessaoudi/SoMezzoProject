import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setLoginMessage('Please insert your email and password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8084/auth/login', {
        email,
        password,
      });

      const { token, status } = response.data;

      if (status === 'approved') {
        setLoginMessage('Login successful!');
        // Store the token based on the "Remember Me" checkbox
        if (rememberMe) {
          localStorage.setItem('accessToken', token); // Store token in localStorage for persistent session
        } else {
          sessionStorage.setItem('accessToken', token); // Store token in sessionStorage for session-based session
        }
        // Redirect to another page (e.g., dashboard) after successful login
        // history.push('/dashboard'); // Uncomment if using react-router
      } else {
        setLoginMessage('Account not approved');
      }
    } catch (error) {
      setLoginMessage('Incorrect email or password');
    }
  };

  return (
    <div className={styles.App}>
      <div className={styles.authWrapper}>
        <div className={styles.authinner}>
          <form onSubmit={handleLogin}>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className={styles.formcontrol}
                placeholder="Enter email"
              />
            </div>

            <div className={styles.mb3}>
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className={styles.formcontrol}
                placeholder="Enter password"
              />
            </div>

            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                title="Remember Me"
              />
              <label className="rm" htmlFor="rememberMe">Remember Me</label>
            </div>

            <div className="d-grid">
              <button type="submit" className={styles.btn}>
                Submit
              </button>
            </div>

            {/* Display login message */}
            {loginMessage && <p style={{ color: loginMessage === 'Login successful!' ? 'green' : 'red' }}>{loginMessage}</p>}

            <p className={styles.forgotpassword}>
              Forgot {' '}
              <Link to="/resetpassword" style={{ color: 'blue', textDecoration: 'underline' }}>password?</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
