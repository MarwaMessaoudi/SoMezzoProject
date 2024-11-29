import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import apiClient from "../utils/apiClient";

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
    setLoginMessage("");

    // Vérification des champs vides
    if (!email || !password) {
      setLoginMessage("Please insert your email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post("/auth/login", { email, password });
      const { accessToken, refreshToken, isActive, roles, user } = response.data;

      console.log("Login response data:", response.data); // Debug log

      // Vérification si le compte est actif
      if (isActive) {
        setLoginMessage("Login successful!");

        // Sauvegarde des tokens et informations utilisateur
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("accessToken", accessToken);
        storage.setItem("refreshToken", refreshToken);
        storage.setItem("roles", JSON.stringify(roles));
        storage.setItem("user", JSON.stringify(user));

        console.log("Tokens and user data saved to storage."); // Debug log

        // Redirection vers le tableau de bord
        navigate("/dashboard");
      } else {
        setLoginMessage("Account not approved. Please contact the administrator.");
      }
    } catch (error) {
      console.error("Login error:", error.response || error.message); // Debug log

      if (error.response) {
        setLoginMessage(error.response.data.message || "Login failed. Please check your credentials.");
      } else {
        setLoginMessage("Unable to connect to the server. Please try again later.");
      }

      // Nettoyage des données sensibles
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
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
                required
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
                required
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

            {loginMessage && <p style={{ color: loginMessage.includes("successful") ? "green" : "red" }}>{loginMessage}</p>}

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
