import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ tab, setTab, isOpen, setIsOpen }) {
  const [selectedTab, setSelectedTab] = useState('');
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/dashboard':
        setSelectedTab('dashboard');
        break;
      case '/inbound':
        setSelectedTab('inbound');
        break;
      case '/outbound':
        setSelectedTab('outbound');
        break;
      case '/productlist':
        setSelectedTab('productlist');
        break;
      case '/withdraw':
        setSelectedTab('withdraw');
        break;
      default:
        setSelectedTab('');
    }
  }, [location]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Button
        variant="primary"
        onClick={toggleSidebar}
        className="toggle-button"
      >
        {isOpen ? <i className="bi bi-chevron-double-left"></i> : <i className="bi bi-chevron-double-right"></i>}
      </Button>

      <div className="sidebar-menu">
        <Link to="/dashboard" className={`sidebar-item ${selectedTab === 'dashboard' ? 'active' : ''}`}>
          {isOpen && <i className="bi bi-bar-chart-line-fill"></i>}
          {isOpen && <span>Dashboard</span>}
          {!isOpen && <i className="bi bi-bar-chart-line-fill"></i>}
        </Link>

        <Link to="/inbound" className={`sidebar-item ${selectedTab === 'inbound' ? 'active' : ''}`}>
          {isOpen && <i className="bi bi-arrow-down-circle-fill"></i>}
          {isOpen && <span>Inbound</span>}
          {!isOpen && <i className="bi bi-arrow-down-circle-fill"></i>}
        </Link>

        <Link to="/outbound" className={`sidebar-item ${selectedTab === 'outbound' ? 'active' : ''}`}>
          {isOpen && <i className="bi bi-arrow-up-circle-fill"></i>}
          {isOpen && <span>Outbound</span>}
          {!isOpen && <i className="bi bi-arrow-up-circle-fill"></i>}
        </Link>

        <Link to="/productlist" className={`sidebar-item ${selectedTab === 'productlist' ? 'active' : ''}`}>
          {isOpen && <i className="bi bi-list-ul"></i>}
          {isOpen && <span>Product List</span>}
          {!isOpen && <i className="bi bi-list-ul"></i>}
        </Link>

        <Link to="/withdraw" className={`sidebar-item ${selectedTab === 'withdraw' ? 'active' : ''}`}>
          {isOpen && <i className="bi bi-box-arrow-down"></i>}
          {isOpen && <span>Withdraw</span>}
          {!isOpen && <i className="bi bi-box-arrow-down"></i>}
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
