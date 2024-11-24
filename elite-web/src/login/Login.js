import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./login.module.css";
import axios from 'axios';

const Login = () => {
  //use state for the mail case
  const [email, setEmail] = useState('');
  //use state for the password
  const [password, setPassword] = useState('');
  //the rememberMe use state
  const [rememberMe, setRememberMe] = useState(false);
  //the login message usestate
  const [loginMessage, setLoginMessage] = useState('');
  //loading state to show a loader when logging in
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate hook for redirection

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
  
    if (!email || !password) {
      setLoginMessage('Please insert your email and password');
      setLoading(false); // Stop loading
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8084/auth/login', { email, password });
      
      // Debug response
      console.log('Response Data:', response.data);
  
      const { accessToken, refreshToken, isActive } = response.data;
  
      if (isActive) {
        setLoginMessage('Login successful!');
  
        if (rememberMe) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
        } else {
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);
        }
  
        // Redirect to dashboard or another protected route
        navigate('/dashboard');
      } else {
        setLoginMessage('Account not approved');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        setLoginMessage(error.response.data.message || 'Login failed!');
      } else {
        console.error('Error:', error.message);
        setLoginMessage('An unexpected error occurred.');
      }
    } finally {
      setLoading(false); // Stop loading after attempt
    }
  };
  //we use this in further developping when we have requests from different users
  /*const handleRequest = async (endpoint, method = 'GET', data = null) => {
    try {
      const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

      const response = await axios({
        url: `http://localhost:8084/${endpoint}`,
        method,
        data,
        headers,
      });

      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token expired, attempt refresh
        const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const refreshResponse = await axios.post('http://localhost:8084/auth/refresh', { refreshToken });
            const { accessToken: newAccessToken } = refreshResponse.data;

            // Store the new access token
            if (localStorage.getItem('accessToken')) {
              localStorage.setItem('accessToken', newAccessToken);
            } else {
              sessionStorage.setItem('accessToken', newAccessToken);
            }

            // Retry the original request with the new token
            const retryHeaders = { Authorization: `Bearer ${newAccessToken}` };
            const retryResponse = await axios({
              url: `http://localhost:8084/${endpoint}`,
              method,
              data,
              headers: retryHeaders,
            });

            return retryResponse;
          } catch (refreshError) {
            console.error("Refresh token failed:", refreshError);
            setLoginMessage('Session expired. Please log in again.');
            localStorage.clear();
            sessionStorage.clear();
            navigate('/sign-up'); // Redirect to login page
          }
        } else {
          setLoginMessage('No refresh token available. Please log in again.');
          navigate('/sign-up'); // Redirect to login page
        }
      } else {
        throw error;
      }
    }
  };*/

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
              <button type="submit" className={styles.btn} disabled={loading}>
                {loading ? 'Logging in...' : 'Submit'}
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
