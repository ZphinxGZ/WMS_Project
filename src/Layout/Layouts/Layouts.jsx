import React, { useState } from 'react';
import './Layouts.css';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

function Layouts({ tab, setTab }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="layout-container">
      <Sidebar tab={tab} setTab={setTab} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`main-content ${isOpen ? 'content-shifted' : ''}`}>
        <Header isOpen={isOpen} />
        <Outlet />
      </div>
    </div>
  );
}

export default Layouts;
