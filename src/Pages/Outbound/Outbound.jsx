import React, { useState } from "react";
import "./Outbound.css";
import { Button, Pagination } from "react-bootstrap";
import { FaShoppingCart, FaSearch } from "react-icons/fa"; // Add FaSearch here
import OutboundModal from "./OutboundModal/OutboundModal";

function Outbound({ products, handleOutboundUpdate }) {
  const [cart, setCart] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemsForConfirmation, setSelectedItemsForConfirmation] =
    useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const outboundItems = products.map((product) => ({
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
    maxQuantity: product.QTY // สมมุติว่า QTY คือจำนวนสินค้าคงเหลือ
  }));

  // Add item to cart
  const handleAddToCart = (item) => {
    if (!cart.some((cartItem) => cartItem.id === item.id)) {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Handle displaying cart for confirmation
  const handleShowCart = () => {
    setSelectedItemsForConfirmation(cart);
    setShowModal(true);
  };

  // Confirm cart items and update outbound
  const handleConfirm = () => {
    alert("สินค้าถูกยืนยันแล้ว");
    setShowModal(false);
    
    // สร้าง array ใหม่เพื่อส่งข้อมูลไปยัง datahistory
    const outboundHistory = cart.map((item) => ({
      productNumber: item.productNumber,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      price: item.price,
      warehouse: item.warehouse,
      status: item.status,
      timestamp: new Date().toISOString(),  // เพิ่ม timestamp เพื่อระบุเวลาที่บันทึก
    }));

    // ส่งข้อมูลไปยัง handleOutboundUpdate
    handleOutboundUpdate(outboundHistory);

    setCart([]); // Clear cart after confirmation
};

  // Remove item from cart
  const handleCancelItem = (item) => {
    const updatedCart = selectedItemsForConfirmation.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setSelectedItemsForConfirmation(updatedCart);
    setCart(updatedCart);
    alert(`สินค้าชื่อ "${item.name}" ถูกลบออกจากตะกร้า`);
  };

  // Increase item quantity in cart
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

  // Decrease item quantity in cart
  const handleDecreaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id && cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCart(updatedCart);
    setSelectedItemsForConfirmation(updatedCart);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredItems = outboundItems.filter(
    (item) =>
      item.id.toString().includes(searchQuery) ||
      item.productNumber?.toString().includes(searchQuery) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
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

  <input
    type="text"
    placeholder="ค้นหา (ID, รหัสสินค้า, ชื่อ)"
    value={searchQuery}
    onChange={handleSearchChange}
    className="form-control search-input"
  />

  <div className="search-icon-container">
    <FaSearch size={20} />
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
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
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

      <div className="pagination-container">
        <Pagination>
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </Pagination>
      </div>

      <OutboundModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedItemsForConfirmation={selectedItemsForConfirmation}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
        handleCancelItem={handleCancelItem}
        handleConfirm={handleConfirm}
        outboundItems={outboundItems}
      />
    </div>
  );
}

export default Outbound;
