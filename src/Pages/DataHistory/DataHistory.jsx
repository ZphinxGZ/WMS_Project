import React, { useState, useEffect } from "react";
import ModalDataHistory from "./ModalDataHistory/ModalDataHistory";
import "./DataHistory.css";

function DataHistory({ data_product }) {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("รออนุมัติ");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data_product); // รับข้อมูลที่ส่งผ่าน props และตั้งค่าเริ่มต้น
  }, [data_product]);

  const filteredData = tableData.filter((item) => {
    const productCode = item.haveSN ? item.series_number : item.product_number;
    const matchesSearchTerm =
      item.id.toString().includes(searchTerm) ||
      productCode.includes(searchTerm) ||
      item.product_name.includes(searchTerm) ||
      item.approve_name.includes(searchTerm);
    const matchesStatus = selectedStatus
      ? item.status === selectedStatus
      : true;
    return matchesSearchTerm && matchesStatus;
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const dataToDisplay = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const handleStatusUpdate = (id, newStatus) => {
    const updatedData = tableData.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setTableData(updatedData);
  };

  const handleDelete = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    setTableData(updatedData); // อัปเดต state หลังจากลบ
  };

  const getPaginationRange = () => {
    const range = [];
    const maxVisiblePages = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  return (
    <div className="data-history-container">
      <div className="data-history-menu-bar">
        <div className="data-history-menu-bar-page-items">
          <label htmlFor="items-per-page" className="mr-2 page-items-label">
            จำนวนรายการต่อหน้า
          </label>
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

        <div className="d-flex align-items-center">
          <div className="mr-2 data-history-menu-bar-status">
            <label
              htmlFor="status-filter"
              className="form-label mr-2 status-label"
            >
              สถานะ
            </label>
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

          <div className="data-history-menu-bar-search">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="ค้นหา ID, รหัสสินค้า, ชื่อสินค้า หรือ ผู้ทำรายการ"
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

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>ชื่อสินค้า</th>
              <th>รหัสสินค้า</th>
              <th>วันที่ทำรายการ</th>
              <th>ผู้ทำรายการ</th>
              <th>สถานะ</th>
              <th>เปิดดู</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  ไม่มีข้อมูล
                </td>
              </tr>
            ) : (
              dataToDisplay.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.product_name}</td>
                  <td>
                    {item.haveSN ? item.series_number : item.product_number}
                  </td>
                  <td>{item.outbound_date}</td>
                  <td>{item.approve_name}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "อนุมัติ"
                          ? "bg-success"
                          : item.status === "รออนุมัติ"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => openModal(item)}
                    >
                      เปิด
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <nav className="d-flex justify-content-center mt-3">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              onClick={(e) => currentPage > 1 && handlePageChange(1, e)}
            >
              First
            </a>
          </li>
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              onClick={(e) =>
                currentPage > 1 && handlePageChange(currentPage - 1, e)
              }
            >
              Previous
            </a>
          </li>
          {getPaginationRange().map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => handlePageChange(page, e)}
              >
                {page}
              </a>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <a
              className="page-link"
              href="#"
              onClick={(e) =>
                currentPage < totalPages && handlePageChange(currentPage + 1, e)
              }
            >
              Next
            </a>
          </li>
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <a
              className="page-link"
              href="#"
              onClick={(e) =>
                currentPage < totalPages && handlePageChange(totalPages, e)
              }
            >
              Last
            </a>
          </li>
        </ul>
      </nav>

      <ModalDataHistory
        isOpen={isModalOpen}
        item={selectedItem}
        onClose={closeModal}
        onConfirm={handleStatusUpdate}
        onDelete={handleDelete}
        dataProduct={data_product}
      />
    </div>
  );
}

export default DataHistory;
