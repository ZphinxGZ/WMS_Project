// Sidebar.js
import React, { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app-container">
      <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Button
          variant="primary"
          onClick={toggleSidebar}
          className="toggle-button"
        >
          {isOpen ? 'Close' : <i className="bi bi-list"></i>}
        </Button>

        <ListGroup variant="flush" className="sidebar-menu">
          <ListGroup.Item action href="#home" className="sidebar-item text-white">
            Home
          </ListGroup.Item>
          <ListGroup.Item action href="#about" className="sidebar-item text-white">
            About
          </ListGroup.Item>
          <ListGroup.Item action href="#services" className="sidebar-item text-white">
            Services
          </ListGroup.Item>
          <ListGroup.Item action href="#contact" className="sidebar-item text-white">
            Contact
          </ListGroup.Item>
        </ListGroup>
      </div>

      {/* Content */}
      <div className={`content ${isOpen ? 'content-shifted' : ''}`}>
        <h1>Welcome to My App</h1>
        <p>This is a simple example of a sidebar using React and Bootstrap.</p>
      </div>
    </div>
  );
}

export default Sidebar;
