import React, { useState } from 'react';
import './Outbound.css';
import { Button } from 'react-bootstrap';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { fetchProducts } from '../../Data/DataOutbound';  // นำเข้าฟังก์ชัน fetchProducts

function Outbound() {
  // ใช้ข้อมูลที่นำเข้ามาใน state
  const [outboundItems, setOutboundItems] = useState(fetchProducts());
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleAddToCart = (item) => {
    if (!cart.some(cartItem => cartItem.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  // กรองข้อมูลตามคำค้นหาและประเภท
  const filteredItems = outboundItems.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toString().includes(searchQuery)) &&
      (selectedCategory === '' || item.category === selectedCategory)
  );

  // กรองข้อมูลตามจำนวนที่ต้องการแสดงต่อหน้า
  const currentItems = filteredItems.slice(0, itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  return (
    <div className="outbound-container">
      <div className="outbound-header">
        <h1>การเลือกสินค้า</h1>
      </div>

      {/* ค้นหาและการตั้งค่า */}
      <div className="search-cart-row">
        {/* เลือกจำนวนรายการต่อหน้า */}
        <div className="items-per-page-select">
          <label htmlFor="itemsPerPage">แสดง:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="form-select"
          >
            <option value={10}>10 รายการ</option>
            <option value={20}>20 รายการ</option>
            <option value={50}>50 รายการ</option>
          </select>
        </div>

        <div className="category-select">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select"
          >
            <option value="">ประเภททั้งหมด</option>
            <option value="ประเภท A">ประเภท A</option>
            <option value="ประเภท B">ประเภท B</option>
            <option value="ประเภท C">ประเภท C</option>
          </select>
        </div>

        <div className="search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="ค้นหาสินค้า..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>

        <button className="item-list-button">รายการ</button>

        <div className="cart-icon-container">
          <FaShoppingCart size={28} color="#007bff" />
          {cart.length > 0 && (
            <span className="badge bg-danger">
              {cart.length}
            </span>
          )}
        </div>
      </div>

      {/* ตารางสินค้า */}
      <table className="outbound-table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>รหัสสินค้า</th>
            <th>รายการ</th>
            <th>จำนวน</th>
            <th>หน่วย</th>
            <th>ประเภทสินค้า</th>
            <th>เลือก</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
              <td>{item.category}</td>
              <td>
                <Button
                  onClick={() => handleAddToCart(item)}
                  variant="primary"
                  size="sm"
                  disabled={cart.some(cartItem => cartItem.id === item.id)}
                >
                  การเลือกสินค้า
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Outbound;
