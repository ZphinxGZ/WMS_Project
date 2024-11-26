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
    category: product.product_number,
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
  const [sortOrder, setSortOrder] = useState(""); // เพิ่มการจัดการเรียงลำดับสินค้า

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

  // การกรองรายการสินค้า
  const filteredItems = outboundItems.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toString().includes(searchQuery)) &&
      (selectedCategory === "" ||
        (selectedCategory === "has-series" && item.seriesNumber) ||
        (selectedCategory === "no-series" && !item.seriesNumber)) // เพิ่มกรองสำหรับไม่มี seriesNumber
  );

  // การเรียงลำดับสินค้า
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.quantity - b.quantity; // น้อยไปมาก
    } else if (sortOrder === "desc") {
      return b.quantity - a.quantity; // มากไปน้อย
    }
    return 0; // ไม่มีการเรียงลำดับ
  });

  const currentItems = sortedItems.slice(0, itemsPerPage);

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
            <option value="">ทั้งหมด</option>
            <option value="has-series">มีหมายเลขซีรี่ส์</option>
            <option value="no-series">ไม่มีหมายเลขซีรี่ส์</option>
          </select>
        </div>
        {/* Dropdown สำหรับการเรียงลำดับ */}
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
              <th>series number</th>
              <th>เลือก</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.category}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>{item.seriesNumber || "-"}</td> {/* เพิ่มแสดง "-" */}
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

      {/* Modal for Cart */}
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
                <th style={{ width: "10%" }}>ชื่อสินค้า</th>
                <th style={{ width: "10%" }}>series number</th>
                <th style={{ width: "5%" }}>จำนวน</th>
                <th>หน่วย</th>
                <th>ราคา</th>
                <th style={{ width: "15%" }}>สต๊อก</th>
                <th>ยกเลิก</th>
              </tr>
            </thead>
            <tbody>
              {selectedItemsForConfirmation.length > 0 ? (
                selectedItemsForConfirmation.map((item) => (
                  <tr key={item.id}>
                    <td>{item.category}</td>
                    <td>{item.name}</td>
                    <td>{item.seriesNumber}</td>
                    <td>
                      <div className="quantity-control">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            if (item.quantity > 1) {
                              const updatedItems =
                                selectedItemsForConfirmation.map(
                                  (selectedItem) =>
                                    selectedItem.id === item.id
                                      ? {
                                          ...selectedItem,
                                          quantity: selectedItem.quantity - 1,
                                        }
                                      : selectedItem
                                );
                              setSelectedItemsForConfirmation(updatedItems);
                            }
                          }}
                        >
                          -
                        </Button>
                        <span style={{ margin: "10px" }}>{item.quantity}</span>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            const availableQuantity = outboundItems.find(
                              (oItem) => oItem.id === item.id
                            )?.quantity;
                            if (
                              item.quantity < availableQuantity &&
                              availableQuantity > 0
                            ) {
                              const updatedItems =
                                selectedItemsForConfirmation.map(
                                  (selectedItem) =>
                                    selectedItem.id === item.id
                                      ? {
                                          ...selectedItem,
                                          quantity: selectedItem.quantity + 1,
                                        }
                                      : selectedItem
                                );
                              setSelectedItemsForConfirmation(updatedItems);
                            }
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td>{item.unit}</td>
                    <td>{item.price.toFixed(2)}</td>
                    <td>
                      {
                        outboundItems.find((oItem) => oItem.id === item.id)
                          ?.quantity
                      }
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleCancelItem(item)}
                      >
                        ยกเลิก
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    ไม่มีสินค้าในรายการ
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            ปิด
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
