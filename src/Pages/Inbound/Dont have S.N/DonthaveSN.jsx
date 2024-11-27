import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';

// STYLE
import './DonthaveSN.css';

function DonthaveSN({ addProduct, products }) {
  const [show, setShow] = useState(false);
  const [warehouse, setWarehouse] = useState('');
  const [room, setRoom] = useState('');
  const [rack, setRack] = useState('');
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [unitName, setUnitName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [formError, setFormError] = useState('');

  const resetForm = () => {
    setProductName('');
    setProductCode('');
    setUnitName('');
    setQuantity('');
    setPrice('');
    setWarehouse('');
    setRoom('');
    setRack('');
    setFormError('');
  };

  const handleClose = () => {
    resetForm();
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const today = new Date();
  const formattedToday = new Intl.DateTimeFormat('th-TH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(today);

  // Options for dropdowns
  const warehouseOptions = [1, 2];
  const roomOptions = Array.from({ length: 4 }, (_, i) => i + 1);
  const rackOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  // Handle key events for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'Enter' && show) {
        handleSave();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [show]);

  const handleSave = () => {
    if (!productName || !productCode || !unitName || !quantity || !price || !warehouse || !room || !rack) {
      setFormError('กรุณาใส่ข้อมูลให้ครบถ้วน');
      return;
    }

    const latestID = products.length > 0 ? Math.max(...products.map(product => parseInt(product.id))) : 0;
    const newID = (latestID + 1).toString();

    const newProduct = {
      id: newID, // Generate ID based on the last product ID
      product_name: productName,
      product_number: productCode,
      series_number: "",
      unit: unitName,
      QTY: parseInt(quantity, 10),
      price: parseFloat(price),
      warehouse,
      room,
      state: rack,
      inbound_date: formattedToday,
      outbound_date: formattedToday,
      approve_name: "คุณากร",
      haveSN: false, // Set haveSN to false
      approve: false,
      status: 'รออนุมัติ',
    };

    addProduct(newProduct); // ส่งข้อมูลไปยังฟังก์ชันใน Inbound
    resetForm();
    handleClose();
  };

  const isFormValid = () => {
    return productName && productCode && unitName && quantity && price && warehouse && room && rack;
  };

  const generateProductCode = () => {
    const randomCode = 'P' + Math.floor(1000 + Math.random() * 9000); // สุ่มรหัสสินค้า
    setProductCode(randomCode);
  };

  return (
    <div>
      <div className="DonthaveSN-Link" onClick={handleShow}>
        <span>
          เพิ่มสินค้าที่ไม่มี S/N <i className="bi bi-file-plus"></i>
        </span>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: '#fd6e2b', color: 'white' }}>
          <Modal.Title>เพิ่มสินค้าที่ไม่มี S/N</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Row 1: Product Name and Product Code */}
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
              <Form.Group controlId="productCode">
                <Form.Label>รหัสสินค้า</Form.Label>
                <Row>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      placeholder="กรอกรหัสสินค้า"
                      value={productCode}
                      onChange={(e) => setProductCode(e.target.value)}
                    />
                  </Col>
                  <Col xs={4}>
                    <Button variant="info" onClick={generateProductCode} className="w-100">
                      สร้างรหัส
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>

          {/* Row 2: Storage Location */}
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
                <Form.Control type="text" value={formattedToday} readOnly />
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

          {/* Row 4: Unit Name */}
          <Form.Group className="mb-3" controlId="unitName">
            <Form.Label>หน่วยสินค้า</Form.Label>
            <Form.Control
              type="text"
              placeholder="กรอกหน่วยสินค้า"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
            />
          </Form.Group>

          {/* Row 5: Quantity */}
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
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={!isFormValid()}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DonthaveSN;
