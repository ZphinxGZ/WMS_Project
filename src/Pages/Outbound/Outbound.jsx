import React, { useState } from 'react';
import './Outbound.css';
import { Button, Modal, Table } from 'react-bootstrap';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { fetchProducts } from '../../Data/DataOutbound';

function Outbound() {
  const [outboundItems, setOutboundItems] = useState(fetchProducts());
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemsForConfirmation, setSelectedItemsForConfirmation] = useState([]);
  const [sortOrder, setSortOrder] = useState('all'); // เพิ่ม state สำหรับการเรียงลำดับ

  const handleAddToCart = (item) => {
    if (!cart.some(cartItem => cartItem.id === item.id)) {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleShowCart = () => {
    setSelectedItemsForConfirmation(cart);
    setShowModal(true);
  };

  const handleConfirm = () => {
    alert("สินค้าถูกยืนยันแล้ว");
    setShowModal(false);
    setCart([]);
  };

  const handleCancelItem = (item) => {
    const updatedCart = selectedItemsForConfirmation.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setSelectedItemsForConfirmation(updatedCart);
    setCart(updatedCart);
    alert(`สินค้าชื่อ "${item.name}" ถูกลบออกจากตะกร้า`);
  };

  // การจัดเรียงสินค้า
  const sortedItems = [...outboundItems].sort((a, b) => {
    if (sortOrder === 'asc') return a.quantity - b.quantity;
    if (sortOrder === 'desc') return b.quantity - a.quantity;
    return 0; // 'all' ไม่เปลี่ยนลำดับ
  });

  const filteredItems = sortedItems.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toString().includes(searchQuery)) &&
      (selectedCategory === '' || item.category === selectedCategory)
  );

  const currentItems = filteredItems.slice(0, itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  return (
    <div className="outbound-container">
      <div className="search-cart-row">
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
            <option value={100}>100 รายการ</option>
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

        <div className="sort-select">
          <label htmlFor="sortOrder">เรียงจำนวน:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="form-select"
          >
            <option value="all">ทั้งหมด</option>
            <option value="desc">จำนวนมากไปน้อย</option>
            <option value="asc">จำนวนน้อยไปมาก</option>
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

        <Button className="item-list-button" onClick={handleShowCart}>
          รายการ
        </Button>

        <div className="cart-icon-container">
          <FaShoppingCart size={28} color="#007bff" />
          {cart.length > 0 && (
            <span className="badge bg-danger">{cart.length}</span>
          )}
        </div>
      </div>

      <div className="outbound-table-container">
        <table className="outbound-table">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th style={{ width: '10%' }}>รหัสสินค้า</th>
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
                    เลือกสินค้า
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Outbound;
