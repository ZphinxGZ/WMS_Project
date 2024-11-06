import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ tab, setTab, isOpen, setIsOpen }) {
  const [selectedTab, setSelectedTab] = useState('');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
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
        <Link 
          to="/dashboard" 
          className={`sidebar-item ${selectedTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleTabClick('dashboard')}
        >
          {isOpen && <i className="bi bi-bar-chart-line-fill"></i>}
          {isOpen && <span>Dashboard</span>}
          {!isOpen && <i className="bi bi-bar-chart-line-fill"></i>}
        </Link>

        <Link 
          to="/inbound" 
          className={`sidebar-item ${selectedTab === 'inbound' ? 'active' : ''}`}
          onClick={() => handleTabClick('inbound')}
        >
          {isOpen && <i className="bi bi-arrow-down-circle-fill"></i>}
          {isOpen && <span>Inbound</span>}
          {!isOpen && <i className="bi bi-arrow-down-circle-fill"></i>}
        </Link>

        <Link 
          to="/outbound" 
          className={`sidebar-item ${selectedTab === 'outbound' ? 'active' : ''}`}
          onClick={() => handleTabClick('outbound')}
        >
          {isOpen && <i className="bi bi-arrow-up-circle-fill"></i>}
          {isOpen && <span>Outbound</span>}
          {!isOpen && <i className="bi bi-arrow-up-circle-fill"></i>}
        </Link>

        <Link 
          to="/productlist" 
          className={`sidebar-item ${selectedTab === 'productlist' ? 'active' : ''}`}
          onClick={() => handleTabClick('productlist')}
        >
          {isOpen && <i className="bi bi-list-ul"></i>}
          {isOpen && <span>Product List</span>}
          {!isOpen && <i className="bi bi-list-ul"></i>}
        </Link>

        <Link 
          to="/withdraw" 
          className={`sidebar-item ${selectedTab === 'withdraw' ? 'active' : ''}`}
          onClick={() => handleTabClick('withdraw')}
        >
          {isOpen && <i className="bi bi-box-arrow-down"></i>}
          {isOpen && <span>Withdraw</span>}
          {!isOpen && <i className="bi bi-box-arrow-down"></i>}
        </Link>
        <Link 
          to="/withdraw" 
          className={`sidebar-item ${selectedTab === 'withdraw' ? 'active' : ''}`}
          onClick={() => handleTabClick('withdraw')}
        >
          {isOpen && <i className="bi bi-box-arrow-down"></i>}
          {isOpen && <span>Withdraw</span>}
          {!isOpen && <i className="bi bi-box-arrow-down"></i>}
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
