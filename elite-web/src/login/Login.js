import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import apiClient from "../utils/apiClient"; // Utiliser le client API centralisé

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setLoginMessage("Please insert your email and password");
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post("/auth/login", { email, password });
      const { accessToken, refreshToken, isActive, roles } = response.data; // Get roles from the response
      console.log(response.data); 
      if (isActive) {
        setLoginMessage("Login successful!");

        // Save tokens to localStorage/sessionStorage
        if (rememberMe) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        } else {
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("refreshToken", refreshToken);
        }
        // Save roles to localStorage/sessionStorage
        localStorage.setItem("roles", JSON.stringify(roles));

        // Redirect based on roles
        if (roles && roles.includes('ROLE_CONTROLLER')) {
          navigate("/controller"); // Redirect to controller dashboard
        } else if (roles && roles.includes('ROLE_MANAGER')) {
          navigate("/user-dashboard"); // Redirect to Manager dashboard
        } else if (roles && roles.includes('ROLE_EMPLOYEE')) {
          navigate("/employeeinterface"); // Redirect to employee interface
        } else {
          navigate("/"); // Default redirect if no specific role is found
        }
        
        console.log("Navigating to the correct dashboard based on role");
      } else {
        setLoginMessage("Account not approved");
      }
    } catch (error) {
      if (error.response) {
        setLoginMessage(error.response.data.message || "Login failed!");
      } else {
        setLoginMessage(error.message);
      }
    } finally {
      setLoading(false);
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
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <div className="d-grid">
              <button type="submit" className={styles.btn} disabled={loading}>
                {loading ? "Logging in..." : "Submit"}
              </button>
            </div>

            {loginMessage && <p>{loginMessage}</p>}

            <p className={styles.forgotpassword}>
              Forgot <Link to="/resetpassword">password?</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
