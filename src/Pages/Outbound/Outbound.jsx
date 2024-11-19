import React, { useState } from 'react';
import './Outbound.css';
import { Button } from 'react-bootstrap';
import { FaShoppingCart, FaSearch } from 'react-icons/fa'; // ไอคอนตะกร้าและค้นหา

function Outbound() {
  const initialItems = [
    { id: 1, name: 'Product A', quantity: 10, unit: 'kg', category: 'ประเภท A', date: '2024-11-10', confirmed: false },
    { id: 2, name: 'Product B', quantity: 5, unit: 'pcs', category: 'ประเภท B', date: '2024-11-11', confirmed: false },
    { id: 3, name: 'Product C', quantity: 20, unit: 'ltr', category: 'ประเภท C', date: '2024-11-12', confirmed: false },
  ];

  const [outboundItems, setOutboundItems] = useState(initialItems);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // state สำหรับเลือกประเภทสินค้า

  const handleAddToCart = (item) => {
    if (!cart.some(cartItem => cartItem.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  const filteredItems = outboundItems.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toString().includes(searchQuery)) &&
      (selectedCategory === '' || item.category === selectedCategory) // ฟิลเตอร์ตามประเภทสินค้า
  );

  return (
    <div className="outbound-container">
      <div className="outbound-header">
        <h1>การเลือกสินค้า</h1>
      </div>

      {/* ค้นหา ไอคอนตะกร้า และปุ่มรายการ */}
      <div className="search-cart-row">
        {/* ตัวเลือกประเภทสินค้า */}
        <div className="category-select">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select"
          >
            <option value="">ประเภททั้งหมด</option>
            <option value="ประเภท A">ประเภท  A</option>
            <option value="ประเภท B">ประเภท  B</option>
            <option value="ประเภท C">ประเภท  C</option>
          </select>
        </div>

        {/* ช่องค้นหา */}
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

        {/* ปุ่มรายการ */}
        <button className="item-list-button">รายการ</button>

        {/* ไอคอนตะกร้า */}
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
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
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
