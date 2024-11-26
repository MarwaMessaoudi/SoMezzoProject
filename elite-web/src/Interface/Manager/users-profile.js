import React from "react";
import "./Profile.css"; // Ajoutez votre CSS pour le style

const ManagerProfile = () => {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <img 



           src="https://assets.codepen.io/285131/almeria-avatar.jpeg"width="50px" 
          alt="Ahmed Ben Salah" 
          className="profile-picture" 
        />
        <h1>Ahmed Ben Salah</h1>
        <h2>Manager</h2>
      </div>
      <div className="profile-info">
        <section className="info-section">
          <h3>About</h3>
          <p>
            Ahmed Ben Salah is an experienced manager with a proven track record 
            in team leadership, performance optimization, and goal achievement.
          </p>
        </section>
        <section className="info-section">
          <h3>Key Metrics</h3>
          <ul>
            <li><strong>Team Members:</strong> 10</li>
            <li><strong>Projects Managed:</strong> 25+</li>
            <li><strong>Revenue Generated:</strong> €1.2M</li>
          </ul>
        </section>
        <section className="info-section">
          <h3>Contact</h3>
          <p><strong>Email:</strong> ahmed.bensalah@example.com</p>
          <p><strong>Phone:</strong> +216 12 345 678</p>
        </section>
        <section className="info-section">
          <h3>Recent Activity</h3>
          <ul>
            <li>Completed Q3 performance review.</li>
            <li>Launched the "Sales Optimization 2024" project.</li>
            <li>Hosted a team-building event last week.</li>
          </ul>
        </section>
      </div>
      <div className="profile-footer">
        <button className="edit-button">Edit Profile</button>
       </div>
    </div>
  );
};

export default ManagerProfile;
