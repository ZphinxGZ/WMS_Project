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

  // ฟังก์ชันการเพิ่มสินค้าลงในตะกร้า
  const handleAddToCart = (item) => {
    if (!cart.some(cartItem => cartItem.id === item.id)) {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // ฟังก์ชันการแสดงรายการสินค้าที่เลือก
  const handleShowCart = () => {
    setSelectedItemsForConfirmation(cart);
    setShowModal(true);
  };

  // ฟังก์ชันการยืนยันการเลือกสินค้า
  const handleConfirm = () => {
    alert("สินค้าถูกยืนยันแล้ว");
    setShowModal(false);
    setCart([]);
  };

  // ฟังก์ชันการลบสินค้าออกจากรายการ
  const handleCancelItem = (item) => {
    const updatedCart = selectedItemsForConfirmation.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setSelectedItemsForConfirmation(updatedCart); // อัปเดตรายการใน Modal
    setCart(updatedCart); // อัปเดตตะกร้า
    alert(`สินค้าชื่อ "${item.name}" ถูกลบออกจากตะกร้า`); // แจ้งเตือนการลบสินค้า
  };

  // ฟังก์ชันการกรองสินค้า
  const filteredItems = outboundItems.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toString().includes(searchQuery)) &&
      (selectedCategory === '' || item.category === selectedCategory)
  );

  const currentItems = filteredItems.slice(0, itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  // ฟังก์ชันการจัดการการเปลี่ยนแปลงจำนวนสินค้า
  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = selectedItemsForConfirmation.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setSelectedItemsForConfirmation(updatedItems);
  };

  return (
    <div className="outbound-container">
      <div className="outbound-header">
        <h1>การเลือกสินค้า</h1>
      </div>

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
                    การเลือกสินค้า
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
        style={{
          maxWidth: '100%',
          marginTop: '2%',
        }}
      >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>ยืนยันการเลือกสินค้า</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ width: '25%' }}>รายการ</th>
                <th style={{ width: '5%' }}>รหัสสินค้า</th>
                <th style={{ width: '10%' }}>ประเภท</th>
                <th style={{ width: '10%' }}>หน่วย</th>
                <th style={{ width: '15%' }}>จำนวน</th>
                <th style={{ width: '10%' }}></th>
              </tr>
            </thead>
            <tbody>
              {selectedItemsForConfirmation.length > 0 ? (
                selectedItemsForConfirmation.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td style={{ width: '7%' }}>{item.id}</td>
                    <td style={{ width: '10%' }}>{item.category}</td>
                    <td>{item.unit}</td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="mx-3">{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleCancelItem(item)} // ฟังก์ชันยกเลิกสินค้า
                      >
                        ยกเลิก
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">ไม่มีสินค้าที่เลือก</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} className="px-4">
            ยกเลิก
          </Button>
          <Button variant="success" onClick={handleConfirm} className="px-4">
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Outbound;
