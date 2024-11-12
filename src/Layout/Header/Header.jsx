import React from 'react';
import { Navbar } from 'react-bootstrap';
import './Header.css';

function Header({ isActive }) {
  return (
    <div className={`header-container ${isActive ? 'header-shifted' : ''}`}>
      <Navbar.Brand href="#dashboard"><img src="public/img/metthier2.png" alt="Metthier Logo" style={{ height: '60px' }} />
      </Navbar.Brand>
    </div>
  );
}

export default Header;
