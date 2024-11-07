import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Sidebar({ tab, setTab, isActive, setIsActive }) {
  const location = useLocation();

  useEffect(() => {
    // Update selected tab based on current route
    switch (location.pathname) {
      case '/dashboard':
        setTab('dashboard');
        break;
      case '/inbound':
        setTab('inbound');
        break;
      case '/outbound':
        setTab('outbound');
        break;
      case '/productlist':
        setTab('productlist');
        break;
      case '/withdraw':
        setTab('withdraw');
        break;
      default:
        setTab('');
    }
  }, [location, setTab]);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`sidebar ${isActive ? 'active' : ''}`}>
      <div className="logo_content">
        <div className="logo">
          <img src="../../public/img/metthier logo without tg-01.png" alt="Metthier Logo" style={{ height: '50px' }} />
          <div className="logo_name">Metthier</div>
        </div>
        <i className="bi bi-list" id="btn" onClick={toggleSidebar}></i>
      </div>
      <ul className="nav_list">
        <li className={tab === 'dashboard' ? 'active' : ''}>
          <Link to="/dashboard">
            <i className="bi bi-bar-chart-line-fill"></i>
            <span className="link_name">Dashboard</span>
          </Link>
          <span className="tooltip">Dashboard</span>
        </li>
        <li className={tab === 'inbound' ? 'active' : ''}>
          <Link to="/inbound">
            <i className="bi bi-box-seam-fill"></i>
            <span className="link_name">Inbound</span>
          </Link>
          <span className="tooltip">Inbound</span>
        </li>
        <li className={tab === 'outbound' ? 'active' : ''}>
          <Link to="/outbound">
            <i className="bi bi-box-arrow-up"></i>
            <span className="link_name">Outbound</span>
          </Link>
          <span className="tooltip">Outbound</span>
        </li>
        <li className={tab === 'productlist' ? 'active' : ''}>
          <Link to="/productlist">
            <i className="bi bi-file-earmark-spreadsheet-fill"></i>
            <span className="link_name">Log</span>
          </Link>
          <span className="tooltip">Log</span>
        </li>
        <li className={tab === 'withdraw' ? 'active' : ''}>
          <Link to="/withdraw">
            <i className="bi bi-person-fill"></i>
            <span className="link_name">Personnel Information</span>
          </Link>
          <span className="tooltip">Personnel Information</span>
        </li>
        <li className={tab === 'settings' ? 'active' : ''}>
          <Link to="/settings">
            <i className="bi bi-gear-fill"></i>
            <span className="link_name">Setting</span>
          </Link>
          <span className="tooltip">Setting</span>
        </li>
      </ul>
      <div className="profile_content">
        <div className="profile">
          <div className="profile_details">
            <img src="public/img/OIP (1).jpg" alt="Profile" />
            <div className="name_job">
              <div className="name">Nitiphon</div>
              <div className="job">Web Developer</div>
            </div>
          </div>
          <i className="bi bi-door-closed" id="log_out"></i>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
