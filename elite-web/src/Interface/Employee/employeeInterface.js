import React from "react";
import './employee.css';
import { Bar } from "react-chartjs-2";  // Import the Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Import Chart.js components

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmployeeInterface = () => {
  // Data for the first chart: Payments Over Time
  const paymentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // X-axis labels
    datasets: [
      {
        label: 'Payments Over Time',
        data: [800, 980, 1200, 1580, 1850, 2000], // Data for each label (representing phone calls made)
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for customizing the payment chart
  const paymentOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Payments Overview',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Payments (dt)',
        },
        beginAtZero: true, // Ensures that the y-axis starts from 0
      },
    },
  };

  // Data for the second chart: Number of Phone Calls per Month
  const phoneCallsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // X-axis labels
    datasets: [
      {
        label: 'Phone Calls Made',
        data: [200, 400, 510, 620, 730, 800], // Data for each label (representing phone calls made)
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Bar color
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for customizing the phone calls chart
  const phoneCallsOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Phone Calls Made per Month',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Phone Calls',
        },
        beginAtZero: true, // Ensures that the y-axis starts from 0
      },
    },
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-logo">
          <div className="logo">
            <span className="logo-icon">
              <img src="./assets/logo2.png" alt="Logo" />
            </span>
            <h1 className="logo-title">
              <span>SoMezzo</span>
            </h1>
          </div>
        </div>
        <div className="app-header-navigation">
          <div className="tabs">
            <a href="#">Overview</a>
            <a href="#" className="active">Payments</a>
            <a href="#">Cards</a>
            <a href="#">Account</a>
            <a href="#">System</a>
            <a href="#">Business</a>
          </div>
        </div>
        <div className="app-header-actions">
          <button className="user-profile">
            <span>Matheo Peterson</span>
            <span>
              <img src="https://assets.codepen.io/285131/almeria-avatar.jpeg" alt="User Avatar" />
            </span>
          </button>
          <div className="app-header-actions-buttons">
            <button className="icon-button large"><i className="ph-magnifying-glass"></i></button>
            <button className="icon-button large"><i className="ph-bell"></i></button>
          </div>
        </div>
        
        <div className="app-header-mobile">
          <button className="icon-button large"><i className="ph-list"></i></button>
        </div>
      </header>
      
      <div className="app-body">
        <div className="app-body-navigation">
          <nav className="navigation">
            <a href="/dashboard"><i className="ph-browsers"></i><span>Dashboard</span></a>
            <a href="/UpdateEmp"><i className="ph-check-square"></i><span>Update Account</span></a>
          </nav>
          <footer className="footer">
            <h1>SoMezzo<small>©</small></h1>
            <div>SoMezzo ©<br />All Rights Reserved 2024</div>
          </footer>
        </div>

        <div className="app-body-main-content">
  <section className="service-section">
    <h2>Call Center Services</h2>
    <div className="tiles">
      <article className="tile">
        <div className="tile-header">
          <i className="ph-phone"></i>
          <h3>
            <span>Customer Support</span>
            <span>24/7 Assistance</span>
          </h3>
        </div>
        <a href="#">
          <span>Go to service</span>
          <span className="icon-button">
            <i className="ph-caret-right-bold"></i>
          </span>
        </a>
      </article>
      <article className="tile">
        <div className="tile-header">
          <i className="ph-headset"></i>
          <h3>
            <span>Technical Support</span>
            <span>Expert Solutions</span>
          </h3>
        </div>
        <a href="#">
          <span>Go to service</span>
          <span className="icon-button">
            <i className="ph-caret-right-bold"></i>
          </span>
        </a>
      </article>
      <article className="tile">
        <div className="tile-header">
          <i className="ph-users"></i>
          <h3>
            <span>Sales Support</span>
            <span>Boost Your Business</span>
          </h3>
        </div>
        <a href="#">
          <span>Go to service</span>
          <span className="icon-button">
            <i className="ph-caret-right-bold"></i>
          </span>
        </a>
      </article>
    </div>
    <div className="service-section-footer">
      <p>Services are available based on your plan and needs.</p>
    </div>
          </section>
          
          {/* Adding both charts */}
          <section className="charts-section">
            <h2>Overview</h2>
            <div className="charts-container">
              <div className="chart-item">
                <h3>Payment Overview</h3>
                <Bar data={paymentData} options={paymentOptions} />
              </div>
              <div className="chart-item">
                <h3>Phone Calls Made</h3>
                <Bar data={phoneCallsData} options={phoneCallsOptions} />
              </div>
            </div>
          </section>
        </div>

        <div className="app-body-sidebar">
  <section className="performance-section">
    <h2>Performance Overview</h2>
    <div className="performance-section-header">
      <p>Monitor your daily stats and targets</p>
    </div>
    <div className="performance-stats">
      <div className="stat-item">
        <div className="stat-card green">
          <span className="stat-title">Calls Taken</span>
          <span className="stat-value">120</span>
        </div>
        <div className="stat-details">
          <h3 className="stat-detail-title">Average Call Duration</h3>
          <div>
            <span className="stat-duration">4m 15s</span>
            <button className="icon-button">
              <i className="ph-caret-right-bold"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="stat-item">
        <div className="stat-card olive">
          <span className="stat-title">Calls Resolved</span>
          <span className="stat-value">85%</span>
        </div>
        <div className="stat-details">
          <h3 className="stat-detail-title">Service Level</h3>
          <div>
            <span className="stat-level">90%</span>
            <button className="icon-button">
              <i className="ph-caret-right-bold"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="stat-item">
        <div className="stat-card blue">
          <span className="stat-title">Customer Satisfaction</span>
          <span className="stat-value">4.5/5</span>
        </div>
        <div className="stat-details">
          <h3 className="stat-detail-title">Feedback</h3>
          <div>
            <span className="stat-feedback">Positive Feedback</span>
            <button className="icon-button">
              <i className="ph-caret-right-bold"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>



      </div>
    </div>
  );
};

export default EmployeeInterface;
