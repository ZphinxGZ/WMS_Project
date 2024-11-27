import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";

// STYLE
import "./HaveSN.css";

function HaveSN({ addProduct, products }) {
  const [show, setShow] = useState(false);
  const [warehouse, setWarehouse] = useState("");
  const [room, setRoom] = useState("");
  const [rack, setRack] = useState("");
  const [productName, setProductName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [formError, setFormError] = useState("");

  // Function to reset all form fields and error message
  const resetForm = () => {
    setProductName("");
    setSerialNumber("");
    setQuantity("");
    setPrice("");
    setWarehouse("");
    setRoom("");
    setRack("");
    setFormError("");
  };

  const handleClose = () => {
    resetForm();
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  // Rack options (1-10)
  const rackOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  // Room options (1-4)
  const roomOptions = Array.from({ length: 4 }, (_, i) => i + 1);

  // Warehouse options (1-2)
  const warehouseOptions = [1, 2];

  // Format today's date as YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  // Handle form submission (save data)
  const handleSave = () => {
    if (
      !productName ||
      !serialNumber ||
      !quantity ||
      !price ||
      !warehouse ||
      !room ||
      !rack
    ) {
      setFormError("กรุณาใส่ข้อมูลให้ครบถ้วน");
      return;
    }

    setFormError("");

    // Get the latest ID from the existing products array and increment it
    const latestID = products.length > 0 ? Math.max(...products.map(product => parseInt(product.id))) : 0;
    const newID = (latestID + 1).toString();

    // Prepare new product object
    const newProduct = {
      id: newID, // Unique ID based on the latest ID
      product_number: "", // Leave product_number as empty string
      series_number: serialNumber,
      product_name: productName,
      unit: "ชิ้น",
      QTY: Number(quantity),
      inbound_date: today,
      outbound_date: today, // Leave outbound_date empty for now
      warehouse: Number(warehouse),
      room: Number(room),
      state: Number(rack),
      approve_name: "คุณากร",
      status: "รออนุมัติ",
      price: parseFloat(price),
      haveSN: true,
      approve: false,
    };

    // Add product to parent state
    addProduct(newProduct);

    handleClose();
  };

  // Check if the form is valid
  const isFormValid = () => {
    return (
      productName &&
      serialNumber &&
      quantity &&
      price &&
      warehouse &&
      room &&
      rack
    );
  };

  return (
    <div>
      <div className="HaveSN-Link" onClick={handleShow}>
        <span>
          เพิ่มสินค้าที่มี S/N{" "}
          <span>
            <i className="bi bi-file-plus"></i>
          </span>
        </span>
      </div>

      {/* Modal for Adding Product with S/N */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#74bdbc", color: "white" }}
        >
          <Modal.Title>เพิ่มสินค้าที่มี S/N</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Row 1: Product Name and S/N */}
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="productName">
                  <Form.Label>ชื่อสินค้า</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกชื่อสินค้า"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="serialNumber">
                  <Form.Label>S/N</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอก S/N"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Row 2: Storage Location with dropdowns */}
            <Form.Group className="mb-3" controlId="storageLocation">
              <Form.Label>สถานที่จัดเก็บ</Form.Label>
              <Row>
                <Col>
                  <Form.Select
                    onChange={(e) => setWarehouse(e.target.value)}
                    aria-label="เลือกโกดัง"
                    value={warehouse}
                  >
                    <option value="">เลือกโกดัง</option>
                    {warehouseOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select
                    disabled={!warehouse}
                    onChange={(e) => setRoom(e.target.value)}
                    aria-label="เลือกห้อง"
                    value={room}
                  >
                    <option value="">เลือกห้อง</option>
                    {warehouse &&
                      roomOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select
                    onChange={(e) => setRack(e.target.value)}
                    aria-label="เลือกชั้นวาง"
                    value={rack}
                  >
                    <option value="">เลือกชั้นวาง</option>
                    {rackOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>

            {/* Row 3: Storage Date and Price */}
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="storageDate">
                  <Form.Label>วันที่เก็บสินค้า</Form.Label>
                  <Form.Control type="text" value={today} readOnly />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="price">
                  <Form.Label>ราคาสินค้า</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="กรอกราคาสินค้า"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Row 4: Quantity */}
            <Form.Group className="mb-3" controlId="quantity">
              <Form.Label>จำนวนสินค้า</Form.Label>
              <Form.Control
                type="number"
                placeholder="กรอกจำนวนสินค้า"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            {/* Show error message if form is incomplete */}
            {formError && <Alert variant="danger">{formError}</Alert>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!isFormValid()} // Disable if form is invalid
          >
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HaveSN;
