// Sidebar.js
import React, { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ tab, setTab }) {
  const [isOpen, setIsOpen] = useState(false);

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
        {isOpen ? 'Close' : <i className="bi bi-list"></i>}
      </Button>

      <ListGroup variant="flush" className="sidebar-menu">
        <ListGroup.Item as={Link} to="/dashboard" action className="sidebar-item">
          Dashboard
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/inbound" action className="sidebar-item">
          Inbound
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/outbound" action className="sidebar-item">
          Outbound
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/productlist" action className="sidebar-item">
          Product List
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/withdraw" action className="sidebar-item">
          Withdraw
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Sidebar;

