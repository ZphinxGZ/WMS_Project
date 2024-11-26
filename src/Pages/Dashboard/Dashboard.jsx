import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown";
import "./Dashboard.css";
import productData from '../../Data/ProductData';
import chartOptions from '../../Data/chartConfig';

drilldown(Highcharts);

function Dashboard() {
  const haveSNData = productData.filter(product => product.haveSN);
  const noSNData = productData.filter(product => !product.haveSN);

  const countHaveSN = haveSNData.length;
  const countApprovedHaveSN = haveSNData.filter(product => product.status === "อนุมัติ").length;

  const countNoSN = noSNData.length;
  const countApprovedNoSN = noSNData.filter(product => product.status === "อนุมัติ").length;

  return (
    <div className="dashboard-container">
      <div className="main-container">
        <div className="main-title">
          <h2>DASHBOARD</h2>
        </div>

        <div className="main-cards">
          <div className="card card-1">
            <div className="card-details">
              <p className="text-title">{countHaveSN}</p>
              <p className="text-body">จำนวนสินค้าที่มีS/N</p>
            </div>
            <i className="bi bi-archive-fill"></i>
            <button className="card-button">More info</button>
          </div>
          <div className="card card-2">
            <div className="card-details">
              <p className="text-title">{countNoSN}</p>
              <p className="text-body">จำนวนสินค้าที่ไม่มีS/N</p>
            </div>
            <i className="bi bi-archive-fill"></i>
            <button className="card-button">More info</button>
          </div>
          <div className="card card-3">
            <div className="card-details">
              <p className="text-title">{countApprovedHaveSN}</p>
              <p className="text-body">จำนวนการยืมสินค้าที่มีS/N</p>
            </div>
            <i class="bi bi-laptop"></i>
            <button className="card-button">More info</button>
          </div>
          <div className="card card-4">
            <div className="card-details">
              <p className="text-title">{countApprovedNoSN}</p>
              <p className="text-body">จำนวนการยืมสินค้าที่ไม่มีS/N</p>
            </div>
            <i class="bi bi-boxes"></i>
            <button className="card-button">More info</button>
          </div>
          
        </div>
        
        <div className="chart-container">
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
