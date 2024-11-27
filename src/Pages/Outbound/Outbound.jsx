import React, { useState } from "react";
import "./Outbound.css";
import { Button, Modal, Table } from "react-bootstrap";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import ProductData from "../../Data/ProductData"; // นำเข้าข้อมูลสินค้า

function fetchProducts() {
  return ProductData.map((product) => ({
    id: product.id,
    name: product.product_name,
    quantity: product.QTY,
    unit: product.unit,
    seriesNumber: product.series_number,
    productNumber: product.product_number,
    haveSN: product.haveSN,
    price: product.price,
    warehouse: product.warehouse,
    status: product.status,
  }));
}

function Outbound() {
  const [outboundItems, setOutboundItems] = useState(fetchProducts());
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemsForConfirmation, setSelectedItemsForConfirmation] =
    useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddToCart = (item) => {
    if (!cart.some((cartItem) => cartItem.id === item.id)) {
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

  const handleIncreaseQuantity = (item) => {
    const availableItem = outboundItems.find((product) => product.id === item.id);
    if (availableItem && item.quantity < availableItem.quantity) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
      setSelectedItemsForConfirmation(updatedCart);
    } else {
      alert(`ไม่สามารถเพิ่มจำนวนได้ เนื่องจากจำนวนสินค้าในคลังมีไม่เพียงพอ`);
    }
  };

  const handleDecreaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id && cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCart(updatedCart);
    setSelectedItemsForConfirmation(updatedCart);
  };

  const filteredItems = outboundItems.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toString().includes(searchQuery)) &&
      (selectedCategory === "" ||
        (selectedCategory === "has-series" && item.haveSN) ||
        (selectedCategory === "no-series" && !item.haveSN))
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.quantity - b.quantity;
    } else if (sortOrder === "desc") {
      return b.quantity - a.quantity;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const currentItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
            <option value="">ทั้งหมด</option>
            <option value="has-series">มีs/n</option>
            <option value="no-series">ไม่มีs/n</option>
          </select>
        </div>

        <div className="sort-select">
          <label htmlFor="itemsPerPage">จำนวน:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="form-select"
          >
            <option value="">เรียงตามจำนวน</option>
            <option value="asc">น้อยไปมาก</option>
            <option value="desc">มากไปน้อย</option>
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
              <th>ID</th>
              <th>รหัสสินค้า</th>
              <th>รายการ</th>
              <th>จำนวน</th>
              <th>หน่วย</th>
              <th>ราคา/หน่วย</th>
              <th>เลือก</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.haveSN ? item.seriesNumber : item.productNumber}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>{item.price || "-"}</td>
                <td>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    variant="primary"
                    size="sm"
                    disabled={cart.some((cartItem) => cartItem.id === item.id)}
                  >
                    เลือกสินค้า
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* เพิ่ม Pagination พร้อมตัวเลข */}
      <div className="pagination-container">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          ก่อนหน้า
        </Button>

        {/* แสดงตัวเลขของหน้า */}
        {pageNumbers.map((number) => (
          <Button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`page-number-button ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </Button>
        ))}

        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          ถัดไป
        </Button>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
        style={{
          maxWidth: "100%",
          marginTop: "2%",
        }}
      >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>ยืนยันการเลือกสินค้า</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>รหัสสินค้า</th>
                <th>รายการ</th>
                <th>จำนวน</th>
                <th>หน่วย</th>
                <th>ราคา/หน่วย</th>
                <th>คลัง</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {selectedItemsForConfirmation.length > 0 ? (
                selectedItemsForConfirmation.map((item) => {
                  const availableItem = outboundItems.find(
                    (product) => product.id === item.id
                  );
                  return (
                    <tr key={item.id}>
                      <td>
                        {item.haveSN ? item.seriesNumber : item.productNumber}
                      </td>
                      <td style={{ width: "20%" }}>{item.name}</td>
                      <td style={{ width: "18%" }}>
                        <div className="quantity-buttons-container">
                          <Button
                            variant="secondary"
                            className="quantity-button"
                            onClick={() => handleDecreaseQuantity(item)}
                          >
                            -
                          </Button>
                          {item.quantity}
                          <Button
                            variant="secondary"
                            className="quantity-button"
                            onClick={() => handleIncreaseQuantity(item)}
                            disabled={
                              availableItem &&
                              item.quantity >= availableItem.quantity
                            }
                          >
                            +
                          </Button>
                        </div>
                      </td>

                      <td>{item.unit}</td>
                      <td>{item.price}</td>
                      <td>
                        {availableItem ? availableItem.quantity : "ไม่มีข้อมูล"}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleCancelItem(item)}
                        >
                          ยกเลิก
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    ไม่มีสินค้าในตะกร้า
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Outbound;