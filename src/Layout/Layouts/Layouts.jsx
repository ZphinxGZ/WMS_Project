// Layouts.js
import React from 'react';
import './Layouts.css';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

function Layouts({ tab, setTab }) {
  return (
    <div className="layout-container">
      <Sidebar tab={tab} setTab={setTab} />
      <div className="main-content">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Layouts;
