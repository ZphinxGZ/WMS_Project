import React from 'react';
import { Navbar } from 'react-bootstrap';
import './Header.css';

function Header({ isActive }) {
  return (
    <div className={`header-container ${isActive ? 'header-shifted' : ''}`}>
      <Navbar.Brand href="#dashboard"><img src="../../public/img/metthier logo without tg-01.png" alt="Metthier Logo" style={{ height: '50px' }} />
      </Navbar.Brand>
    </div>
  );
}

export default Header;
