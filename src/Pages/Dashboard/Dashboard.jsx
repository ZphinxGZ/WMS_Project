import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="main-container">
        <div className="main-title">
          <h2>DASHBOARD</h2>
        </div>

        <div className="main-cards">
          <div className="card card-1">
            <div className="card-details">
              <p className="text-title">13</p>
              <p className="text-body">จำนวนครุภัณฑ์</p>
            </div>
            <i class="bi bi-archive-fill"></i>
            <button className="card-button">More info</button>
          </div>
          <div className="card card-2">
            <div className="card-details">
              <p className="text-title">12</p>
              <p className="text-body">จำนวนครุภัณฑ์</p>
            </div>
            <i class="bi bi-laptop-fill"></i>
            <button className="card-button">More info</button>
          </div>
          <div className="card card-3">
            <div className="card-details">
              <p className="text-title">23</p>
              <p className="text-body">จำนวนครุภัณฑ์</p>
            </div>
            <i class="bi bi-archive"></i>
            <button className="card-button">More info</button>
          </div>
          <div className="card card-4">
            <div className="card-details">
              <p className="text-title">34</p>
              <p className="text-body">จำนวนครุภัณฑ์</p>
            </div>
            <i class="bi bi-archive"></i>
            <button className="card-button">More info</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
