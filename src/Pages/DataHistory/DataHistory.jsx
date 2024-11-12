import React, { useState } from 'react';
import datahistory from '../../Data/datahistory';
import ModalDataHistory from './ModalDataHistory/ModalDataHistory';
import './DataHistory.css';

function DataHistory() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tableData, setTableData] = useState(datahistory);  // สร้าง state สำหรับเก็บข้อมูลในตาราง

  // ฟังก์ชันสำหรับการค้นหาข้อมูล
  const filteredData = tableData.filter(item => {
    const matchesSearchTerm = item.id.toString().includes(searchTerm) ||
      item.date_borrowed.includes(searchTerm) ||
      item.approver.includes(searchTerm);
    const matchesStatus = selectedStatus ? item.status === selectedStatus : true;
    return matchesSearchTerm && matchesStatus;
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const dataToDisplay = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber, e) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // ฟังก์ชันสำหรับการอัปเดตสถานะ
  const handleStatusUpdate = (id, newStatus) => {
    const updatedData = tableData.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };  // อัปเดตสถานะของรายการ
      }
      return item;
    });
    setTableData(updatedData);  // อัปเดต state ของ tableData
  };


  
  return (
    <div className="data-history-container">
      {/* ส่วนของเมนูด้านบน */}
      <div className="data-history-menu-bar">
        {/* จำนวนรายการต่อหน้า */}
        <div className="data-history-menu-bar-page-items">
          <label htmlFor="items-per-page" className="mr-2 page-items-label">จำนวนรายการต่อหน้า</label>
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

        {/* ช่องค้นหา และ สถานะ */}
        <div className="d-flex align-items-center">
          {/* สถานะ */}
          <div className="mr-2 data-history-menu-bar-status">
            <label htmlFor="status-filter" className="form-label mr-2 status-label">สถานะ</label>
            <select
              id="status-filter"
              className="form-select"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value="">ทั้งหมด</option>
              <option value="อนุมัติ">อนุมัติ</option>
              <option value="รออนุมัติ">รออนุมัติ</option>
              <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
            </select>
          </div>

          {/* ช่องค้นหา */}
          <div className="data-history-menu-bar-search">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="ค้นหา ID, วันที่ หรือ ผู้อนุมัติ"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ตารางแสดงผล */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="col-id">ID</th>
              <th className="col-date">วันที่เบิก</th>
              <th className="col-item">รายการ</th>
              <th className="col-qty">QTY</th>
              <th className="col-approver">ผู้ทำรายการ</th>
              <th className="col-status">สถานะ</th>
              <th className="col-action">เปิดดูรายการ</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">ยังไม่มีรายการในขณะนี้...</td>
              </tr>
            ) : (
              dataToDisplay.map((item) => (
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
                    <button className="btn btn-info btn-sm" onClick={() => openModal(item)}>
                      เปิดดู
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-3">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a
              className={`page-link ${currentPage !== 1 ? 'pointer' : ''}`}
              href="#"
              onClick={(e) => currentPage > 1 && handlePageChange(1, e)}
            >
              First
            </a>
          </li>
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a
              className={`page-link ${currentPage !== 1 ? 'pointer' : ''}`}
              href="#"
              onClick={(e) => currentPage > 1 && handlePageChange(currentPage - 1, e)}
            >
              Previous
            </a>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <a
                className="page-link pointer"
                href="#"
                onClick={(e) => handlePageChange(index + 1, e)}
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <a
              className={`page-link ${currentPage !== totalPages ? 'pointer' : ''}`}
              href="#"
              onClick={(e) => currentPage < totalPages && handlePageChange(currentPage + 1, e)}
            >
              Next
            </a>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <a
              className={`page-link ${currentPage !== totalPages ? 'pointer' : ''}`}
              href="#"
              onClick={(e) => currentPage < totalPages && handlePageChange(totalPages, e)}
            >
              Last
            </a>
          </li>
        </ul>
      </nav>

      {/* เปิด Modal */}
      <ModalDataHistory 
        isOpen={isModalOpen} 
        item={selectedItem} 
        onClose={closeModal} 
        onConfirm={handleStatusUpdate} 
      />
    </div>
  );
}

export default DataHistory;
