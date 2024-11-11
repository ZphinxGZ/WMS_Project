import React, { useState } from 'react';
import datahistory from '../../Data/DataHistory';
import './DataHistory.css';

function DataHistory() {
  // State สำหรับจำนวนรายการที่จะแสดง
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // State สำหรับคำค้นหา
  const [searchTerm, setSearchTerm] = useState("");

  // ฟังก์ชันสำหรับการค้นหาข้อมูล
  const filteredData = datahistory.filter(item => {
    return (
      item.id.toString().includes(searchTerm) || 
      item.date_borrowed.includes(searchTerm) || 
      item.approver.includes(searchTerm)
    );
  });

  // เลือกข้อมูลที่จะแสดงตามจำนวนที่เลือก
  const dataToDisplay = filteredData.slice(0, itemsPerPage);

  // ฟังก์ชันสำหรับการเปลี่ยนแปลงจำนวนรายการ
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  // ฟังก์ชันสำหรับการค้นหาคำค้นหา
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="data-history-container">
      <div className="d-flex justify-content-between mb-3">
        {/* ปุ่มจำนวนรายการ */}
        <div>
          <label htmlFor="items-per-page" className="form-label">จำนวนรายการต่อหน้า:</label>
          <select
            id="items-per-page"
            className="form-select"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={10}>10 รายการ</option>
            <option value={25}>25 รายการ</option>
            <option value={50}>50 รายการ</option>
            <option value={100}>100 รายการ</option>
          </select>
        </div>

        {/* ปุ่มค้นหา */}
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="ค้นหาจาก ID, วันที่ หรือ ผู้อนุมัติ"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="col-id">ID</th>
              <th className="col-date">วันที่เบิก</th>
              <th className="col-item">รายการ</th>
              <th className="col-qty">QTY</th>
              <th className="col-approver">ผู้อนุมัติ</th>
              <th className="col-status">สถานะ</th>
              <th className="col-action">เปิดดูรายการ</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.map((item) => (
              <tr key={item.id}>
                <td className="col-id">{item.id}</td>
                <td className="col-date">{item.date_borrowed}</td>
                <td className="col-item">{item.item}</td>
                <td className="col-qty">{item.qty}</td>
                <td className="col-approver">{item.approver}</td>
                <td className="col-status">
                  <span className={`badge ${item.status === "อนุมัติ" ? "bg-success" : item.status === "รออนุมัติ" ? "bg-warning" : "bg-danger"}`}>
                    {item.status}
                  </span>
                </td>
                <td className="col-action">
                  <button className="btn btn-info btn-sm">เปิดดู</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataHistory;
