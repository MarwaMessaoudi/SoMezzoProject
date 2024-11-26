import React from "react"; // Importing React library to create the component
import './controller.css'; // Importing the CSS file for styling the component
import logo from '../../assets/logo1.png'; // Importing the logo image
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const INACTIVITY_TIMEOUT =  5* 60 * 1000; // 5 minutes
 
// Functional component for the controller section of the application
const Controller = ({onLogout}) => {
  const navigate = useNavigate();
  const [sessionExpired, setSessionExpired] = useState(false);

  //-------------------------- Token Expiration Logic --------------------------//
  const performLogout = () => {
    // Clear tokens from storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    // Redirect to login page
    navigate("/sign-in");
  };

  const handleTokenExpiry = () => {
    const accessToken =
      localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        const expiryTime = decodedToken.exp * 1000; // Convert expiry time to milliseconds
        const currentTime = Date.now();

        if (expiryTime > currentTime) {
          // Set a timeout to log out when the token expires
          setTimeout(() => {
            performLogout();
          }, expiryTime - currentTime);
        } else {
          performLogout(); // Immediate logout if the token is already expired
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        performLogout(); // Logout in case of any decoding errors
      }
    } else {
      performLogout(); // Logout if no token is found
    }
  };

  // Monitor session expiration and token expiry on component mount
  useEffect(() => {
    handleTokenExpiry();
  }, []);  // Runs once when the component is mounted

  //---------------------------- Session Timeout Logic ------------------------//
  useEffect(() => {
    let inactivityTimer;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setSessionExpired(true);
        onLogout(); // Perform logout when the session times out
        alert("Your session has expired due to inactivity. Redirecting to login...");
        navigate("/sign-in"); // Redirect to login page
      }, INACTIVITY_TIMEOUT);
    };

    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    resetInactivityTimer();  // Initialize inactivity timer

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [onLogout, navigate]);

  //-------------------- Render Based on Session Expiry -----------------------//
  if (sessionExpired) {
    return null; // No UI is rendered if the session is expired
  }
  return (
    <div className="app">
      {/* Header section of the application */}
      <header className="app-header">
        {/* Logo section in the header */}
        <div className="app-header-logo">
          <div className="logo">
            <span className="logo-icon">
              <img src={logo} alt="Logo" /> {/* Display the imported logo */}
            </span>
            <h1 className="logo-title">SoMezzo</h1> {/* Application name */}
          </div>
        </div>

        {/* Navigation links in the header */}
        <div className="app-header-navigation">
          <div className="tabs">
            <a href="#">Overview</a> {/* Link for Overview */}
            <a href="#" className="active">Payments</a> {/* Active link for Payments */}
            <a href="#">Cards</a> {/* Link for Cards */}
            <a href="#">Account</a> {/* Link for Account */}
            <a href="#">System</a> {/* Link for System */}
            <a href="#">Business</a> {/* Link for Business */}
          </div>
        </div>

        {/* User profile and action buttons in the header */}
        <div className="app-header-actions">
          <button className="user-profile">
            <span>Matheo Peterson</span> {/* User name */}
            <img src="https://assets.codepen.io/285131/almeria-avatar.jpeg" alt="User Avatar" /> {/* User avatar */}
          </button>
          <div className="app-header-actions-buttons">
            <button className="icon-button large"><i className="ph-magnifying-glass"></i></button> {/* Magnifying glass icon */}
            <button className="icon-button large"><i className="ph-bell"></i></button> {/* Bell icon */}
          </div>
        </div>

        {/* Mobile header section */}
        <div className="app-header-mobile">
          <button className="icon-button large"><i className="ph-list"></i></button> {/* List icon for mobile view */}
        </div>
      </header>

      <div className="app-body">
        {/* Sidebar navigation section */}
        <aside className="app-body-navigation">
          <nav className="navigation">
            <a href="#"><i className="ph-browsers"></i><span>Dashboard</span></a> {/* Link for Dashboard */}
            <a href="#"><i className="ph-check-square"></i><span>Scheduled</span></a> {/* Link for Scheduled */}
            <a href="#"><i className="ph-swap"></i><span>Transfers</span></a> {/* Link for Transfers */}
            <a href="#"><i className="ph-file-text"></i><span>Templates</span></a> {/* Link for Templates */}
            <a href="#"><i className="ph-globe"></i><span>SWIFT</span></a> {/* Link for SWIFT */}
            <a href="#"><i className="ph-clipboard-text"></i><span>Exchange</span></a> {/* Link for Exchange */}
          </nav>
          {/* Footer section in the sidebar */}
          <footer className="footer">
            <h1>somezzo<small>©</small></h1> {/* Footer title */}
            <p>somezzo© All Rights Reserved 2021</p> {/* Footer text */}
          </footer>
        </aside>

        {/* Main content area */}
        <main className="app-body-main-content">
          {/* Service section */}
          <section className="service-section">
            <h2>Service</h2> {/* Section title */}
            <div className="tiles">
              {/* Mapping through an array of services to render tiles */}
              {[ 
                { title: "liste ", company: " catégories de coûts", icon: "ph-lightning-light" },
                { title: "générer", company: " un rapport de synthèse", icon: "ph-fire-simple-light" },
                { title: "mettre à jour", company: " la liste des coûts.", icon: "ph-file-light" }
              ].map((service, index) => (
                <article className="tile" key={index}>
                  <div className="tile-header">
                    <i className={service.icon}></i> {/* Icon for the service */}
                    <h3>
                      <span>{service.title}</span> {/* Service title */}
                      <span>{service.company}</span> {/* Service description */}
                    </h3>
                  </div>
                  <a href="#"> {/* Link to the service */}
                    <span>Go to service</span>
                    <span className="icon-button">
                      <i className="ph-caret-right-bold"></i> {/* Right arrow icon */}
                    </span>
                  </a>
                </article>
              ))}
            </div>
          </section>
        </main>

        {/* Sidebar for payments section */}
        <aside className="app-body-sidebar">
          <section className="payment-section">
            <h2>New Payment</h2> {/* Title for the payment section */}
            <div className="payment-section-header">
              <p>Choose a card to transfer money</p> {/* Instruction text */}
              <div>
                <button className="card-button mastercard">MasterCard</button> {/* Button for MasterCard */}
                <button className="card-button visa active">Visa</button> {/* Button for Visa (active by default) */}
              </div>
            </div>
            <div className="payments">
              {/* Example payments rendered using a map function */}
              {[ 
                { type: "Internet", amount: "$ 2,110", cardColor: "green", expiry: "01/22", lastFour: "4012" },
                { type: "Universal", amount: "$ 5,621", cardColor: "olive", expiry: "12/23", lastFour: "2228" },
                { type: "Gold", amount: "$ 3,473", cardColor: "gray", expiry: "03/22", lastFour: "5214" }
              ].map((payment, index) => (
                <div className="payment" key={index}>
                  <div className={`card ${payment.cardColor}`}>
                    <span>{payment.expiry}</span> {/* Card expiry date */}
                    <span>•••• {payment.lastFour}</span> {/* Last four digits of the card */}
                  </div>
                  <div className="payment-details">
                    <h3>{payment.type}</h3> {/* Payment type */}
                    <div>
                      <span>{payment.amount}</span> {/* Payment amount */}
                      <button className="icon-button">
                        <i className="ph-caret-right-bold"></i> {/* Icon for navigation */}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Controller; // Export the controller component for use in other parts of the application
