import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown";
import "./Dashboard.css";
import { getChartData, chartOptionsHaveSN, chartOptionsNoSN } from "../../Data/chartConfig";

drilldown(Highcharts);

function Dashboard({ products = [] }) {
  const haveSNData = products.filter((product) => product.haveSN);
  const noSNData = products.filter((product) => !product.haveSN);

  const countHaveSN = haveSNData.length;
  const countApprovedHaveSN = haveSNData.filter((product) => product.status === "อนุมัติ").length;

  const countNoSN = noSNData.length;
  const countApprovedNoSN = noSNData.filter((product) => product.status === "อนุมัติ").length;

  const [chartData, setChartData] = useState([]);
  const [chartConfigHaveSN, setChartConfigHaveSN] = useState({});
  const [chartConfigNoSN, setChartConfigNoSN] = useState({});

  useEffect(() => {
    if (products.length === 0) return;

    const data = getChartData(products);
    setChartData(data);
    setChartConfigHaveSN(chartOptionsHaveSN(data));
    setChartConfigNoSN(chartOptionsNoSN(data));
  }, [products]);

  return (
    <div className="dashboard-container">
      <div className="main-container">
        <div className="main-title">
          {/* <h2>DASHBOARD</h2> */}
        </div>

        <div className="main-cards">
          <div className="card card-1">
            <div className="card-details">
              <p className="text-title">{countHaveSN}</p>
              <p className="text-body">จำนวนสินค้าที่มี S/N</p>
            </div>
            <i className="bi bi-archive-fill"></i>
            <button className="card-button">More info</button>
          </div>
          <div className="card card-2">
            <div className="card-details">
              <p className="text-title">{countNoSN}</p>
              <p className="text-body">จำนวนสินค้าที่ไม่มี S/N</p>
            </div>
            <i className="bi bi-archive-fill"></i>
            <button className="card-button">More info</button>
          </div>
          <div className="card card-3">
            <div className="card-details">
              <p className="text-title">{countApprovedHaveSN}</p>
              <p className="text-body">จำนวนการยืมสินค้าที่มี S/N</p>
            </div>
            <i className="bi bi-laptop"></i>
            <button className="card-button">More info</button>
          </div>
          <div className="card card-4">
            <div className="card-details">
              <p className="text-title">{countApprovedNoSN}</p>
              <p className="text-body">จำนวนการยืมสินค้าที่ไม่มี S/N</p>
            </div>
            <i className="bi bi-boxes"></i>
            <button className="card-button">More info</button>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart">
            <h3>สินค้าที่มี S/N</h3>
            <HighchartsReact highcharts={Highcharts} options={chartConfigHaveSN} />
          </div>
          <div className="chart">
            <h3>สินค้าที่ไม่มี S/N</h3>
            <HighchartsReact highcharts={Highcharts} options={chartConfigNoSN} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
