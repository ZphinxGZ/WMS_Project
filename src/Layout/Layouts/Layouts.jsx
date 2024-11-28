import React, { useState } from 'react';
import './Layouts.css';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

function Layouts({ tab, setTab, setToken, role, username }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="layout-container">
      <Sidebar 
        tab={tab} 
        setTab={setTab} 
        isActive={isActive} 
        setIsActive={setIsActive} 
        setToken={setToken} 
        role={role}
        username={username}
      />
      <div className={`main-content ${isActive ? 'content-shifted' : ''}`}>
        <Header isActive={isActive} />
        <div className="body-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layouts;
