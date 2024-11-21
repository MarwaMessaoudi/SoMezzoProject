import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import axiosInstance from '../utils/axiosInstance'; // Import axiosInstance

const Login = () => {
  //use state for the mail case
  const [email, setEmail] = useState('');
  //use state for the password
  const [password, setPassword] = useState('');
  //the rememberMe use state
  const [rememberMe, setRememberMe] = useState(false);
  //the login message usestate
  const [loginMessage, setLoginMessage] = useState('');

  // Handle login
  const handleLogin = async (e) => {
    //to prevent the form from submitting by default when the button is pressed
    e.preventDefault();

    //checking if the case emty
    if (!email || !password) {
      setLoginMessage('Please insert your email and password');
      return;
    }
    //a try and catch
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      //console.log('Response:', response.data);
      //this line gives the attributes from the data from response to the token and status
      const { accessToken, refreshToken, status } = response.data;

      if (status === 'approved') {
        setLoginMessage('Login successful!');
        // Store the token based on the "Remember Me" checkbox
        if (rememberMe) {
          localStorage.setItem('accessToken', accessToken); // Store access token
          localStorage.setItem('refreshToken', refreshToken); // Store refresh token
        } else {
          sessionStorage.setItem('accessToken', accessToken); // Store access token
          sessionStorage.setItem('refreshToken', refreshToken); // Store refresh token
        }
        //console.log('Access Token Stored:', localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'));
        //console.log('Refresh Token Stored:', localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken'));
        // Redirect to another page (e.g., dashboard) after successful login
        // history.push('/dashboard'); // Uncomment when we use it
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
