import React from "react";
import './manager.css';

const ManagerInterface = () => {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-logo">
          <div className="logo">
            <span className="logo-icon">
              <img src="https://www.entreprises-magazine.com/wp-content/uploads/2023/01/texte-logo11853.png"width="50px" alt="Logo"/>
            </span>
            <h1 className="logo-title">
              <span>SoMezzo</span>
            </h1>
          </div>
        </div>
        <div className="app-header-navigation">
          <div className="tabs">
            <a href="#"></a>
            <a href="#" className=""></a>
            <a href="#"></a>
            <a href="#"></a>
            <a href="#"></a>
            <a href="#"></a>
          </div>
        </div>
        <div className="app-header-actions">
          <button className="user-profile">
            <span>Ahmed ben salah</span>
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
            <a href="#"><i className="ph-browsers"></i><span>Dashboard</span></a>
             <a href="/Registration"><i className="ph-swap"></i><span>Add an Account</span></a>
            <a href="/users"><i className="ph-file-text"></i><span> Edit An Account</span></a>
            <a href="UserTable"><i className="ph-globe"></i><span>Delete An account</span></a>
            <a href="users-profile"><i className="ph-clipboard-text"></i><span>Profile</span></a>

 
  
          </nav>
          <footer className="footer">
            <h1>SoMezzo<small>©</small></h1>
            <div>SoMezzo ©<br />All Rights Reserved 2024</div>
          </footer>
        </div>




        <div className="app-body-main-content"> 
  <section className="service-section">
    <h2>Manager Dashboard</h2>
    <div className="tiles">
      {/* Tile 1: Performance Objectives */}
      <article className="tile">
        <div className="tile-header">
          <i className="ph-lightning-light"></i>
          <h3>
            <span>Performance Objectives</span>
            <span>Revenue Target Achievement:</span>
          </h3>
        </div>
        <a href="#">
          <span>View Details</span>
          <span></span>
          <span className="icon-button">
            <i className="ph-caret-right-bold"></i>
          </span>
        </a>
      </article>

      {/* Tile 2: Sales and Revenue */}
      <article className="tile">
        <div className="tile-header">
          <i className="ph-fire-simple-light"></i>
          <h3>
            <span>Monthly Sales</span>
            <span>Target Reached: 75%</span>
          </h3>
        </div>
        <a href="#">
          <span>View Details</span>
          <span></span>
          <span className="icon-button">
            <i className="ph-caret-right-bold"></i>
          </span>
        </a>
      </article>

      {/* Tile 3: Team Performance */}
      <article className="tile">
        <div className="tile-header">
          <i className="ph-file-light"></i>
          <h3>
            <span>Team Performance</span>
            <span>Team A: 85% of the target</span>
          </h3>
        </div>
        <a href="#">
          <span>View Details</span>
          <span></span>
          <span className="icon-button">
            <i className="ph-caret-right-bold"></i>
          </span>
        </a>
      </article>
    </div>

    <div className="service-section-footer">
      {/* Additional footer content can be added here if needed */}
    </div>
  </section>

  <br></br>

  <div className="app-body-main-content">
    <section className="service-section">
      <h2>Performance Dashboard</h2>
      <div className="tiles">
        {/* Tile 1: Project Tracking */}
        <article className="tile">
          <div className="tile-header">
            <i className="ph-folder-light"></i>
            <h3>
              <span>Project Tracking</span>
              <span>Ongoing Projects: 5</span>
            </h3>
          </div>
          <a href="#">
            <span>View Details</span>
            <span className="icon-button">
              <i className="ph-caret-right-bold"></i>
            </span>
          </a>
        </article>

        {/* Tile 2: Team Objectives */}
        <article className="tile">
          <div className="tile-header">
            <i className="ph-users-light"></i>
            <h3>
              <span>Team Objectives</span>
              <span>Completion Rate: 80%</span>
            </h3>
          </div>
          <a href="#">
            <span>Analyze Progress</span>
            <span className="icon-button">
              <i className="ph-caret-right-bold"></i>
            </span>
          </a>
        </article>

        {/* Tile 3: Important Notifications */}
        <article className="tile">
          <div className="tile-header">
            <i className="ph-bell-light"></i>
            <h3>
              <span>Notifications</span>
              <span>Upcoming Meetings: 2</span>
            </h3>
          </div>
          <a href="#">
            <span>View Notifications</span>
            <span className="icon-button">
              <i className="ph-caret-right-bold"></i>
            </span>
          </a>
        </article>
      </div>

      <div className="service-section-footer">
        <p>Access project and performance details to better oversee your teams.</p>
      </div>
    </section>
  </div>
</div>
</div>
</div>
  );
};

export default ManagerInterface;
 