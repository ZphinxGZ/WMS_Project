import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import './Header.css';

function Header({ isOpen }) {
  return (
    <Navbar className={`header-container ${isOpen ? 'header-shifted' : 'header-closed'}`} fixed="top" bg="light">
      <Container fluid className="d-flex justify-content-between align-items-center header-container-content">
        {/* Logo */}
        <Navbar.Brand href="#" className="header-logo">
          <img src="../public/img/metthier logo without tg-01.png" alt="Logo"/>
        </Navbar.Brand>

        {/* Username and Icon */}
        <div className="d-flex align-items-center" align="center">
          <span className="username">User Name <span style={{ color: 'red' }}>(Super Admin)</span></span>
          <i className="bi bi-person-fill ms-2 person-icon" style={{ fontSize: 28 }}></i>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;

