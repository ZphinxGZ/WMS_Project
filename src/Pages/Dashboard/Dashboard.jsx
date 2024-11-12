// Dashboard.js
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown";
import "./Dashboard.css";

// เรียกใช้ Drilldown module
drilldown(Highcharts);

function Dashboard() {
  const options = {
    chart: {
      type: "column"
    },
    title: {
      text: "จำนวนครุภัณฑ์"
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      title: {
        text: "จำนวน"
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [
      {
        name: "ครุภัณฑ์",
        colorByPoint: true,
        data: [
          {
            name: "ประเภท A",
            y: 13,
            drilldown: "A"
          },
          {
            name: "ประเภท B",
            y: 12,
            drilldown: "B"
          },
          {
            name: "ประเภท C",
            y: 23,
            drilldown: "C"
          },
          {
            name: "ประเภท D",
            y: 34,
            drilldown: "D"
          },
          {
            name: "ประเภท E",
            y: 23,
            drilldown: "E"
          },
          {
            name: "ประเภท F",
            y: 21,
            drilldown: "F"
          },
          {
            name: "ประเภท G",
            y: 27,
            drilldown: "G"
          },
          {
            name: "ประเภท H",
            y: 44,
            drilldown: "H"
          },
          {
            name: "ประเภท I",
            y: 34,
            drilldown: "I"
          },
          {
            name: "ประเภท J",
            y: 25,
            drilldown: "J"
          },
          {
            name: "ประเภท K",
            y: 12,
            drilldown: "K"
          }
        ]
      }
    ],
    drilldown: {
      series: [
        {
          id: "A",
          data: [["Sub A1", 5], ["Sub A2", 8]]
        },
        {
          id: "B",
          data: [["Sub B1", 6], ["Sub B2", 6]]
        },
        {
          id: "C",
          data: [["Sub C1", 11], ["Sub C2", 12]]
        },
        {
          id: "D",
          data: [["Sub D1", 15], ["Sub D2", 19]]
        }
      ]
    }
  };

  return (
    <div className="dashboard-container">
      <div className="main-container">
        <div className="main-title">
          <h2>DASHBOARD</h2>
        </div>

        <div className="main-cards">
          {/* การ์ดต่างๆ */}
          <div className="card card-1">
            <div className="card-details">
              <p className="text-title">13</p>
              <p className="text-body">จำนวนสินค้าที่มีS/N</p>
            </div>
            <i className="bi bi-archive-fill"></i>
            <button className="card-button">More info</button>
          </div>
          <div className="card card-2">
            <div className="card-details">
              <p className="text-title">13</p>
              <p className="text-body">จำนวนสินค้าที่ไม่มีS/N</p>
            </div>
            <i className="bi bi-archive-fill"></i>
            <button className="card-button">More info</button>
          </div>
          <div className="card card-3">
            <div className="card-details">
              <p className="text-title">13</p>
              <p className="text-body">จำนวนการยืมสินค้าที่มีS/n</p>
            </div>
            <i class="bi bi-laptop"></i>
            <button className="card-button">More info</button>
          </div>
          <div className="card card-4">
            <div className="card-details">
              <p className="text-title">13</p>
              <p className="text-body">จำนวนการยืมสินค้าที่ไม่มีS/N</p>
            </div>
            <i class="bi bi-boxes"></i>
            <button className="card-button">More info</button>
          </div>
          
          {/* เพิ่มการ์ดอื่น ๆ ตามที่คุณต้องการ */}
        </div>

        {/* เพิ่มกราฟ Column with Drilldown ที่นี่ */}
        <div className="chart-container">
          <HighchartsReact highcharts={Highcharts} options={options} />
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
