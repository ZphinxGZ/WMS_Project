import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';

// STYLE
import './DonthaveSN.css';

function DonthaveSN() {
  const [show, setShow] = useState(false);
  const [warehouse, setWarehouse] = useState('');
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [unitName, setUnitName] = useState('');
  const [quantity, setQuantity] = useState('');  // Changed addedBy to quantity
  const [price, setPrice] = useState('');  // Changed expiryDate to price
  const [formError, setFormError] = useState('');

  const resetForm = () => {
    setProductName('');
    setProductCode('');
    setUnitName('');
    setQuantity('');  // Reset quantity
    setPrice('');  // Reset price
    setWarehouse('');
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

  const warehouseOptions = {
    'โกดัง1': ['A', 'B', 'C'],
    'โกดัง2': ['AA', 'BB', 'CC'],
  };

  const rackOptions = Array.from({ length: 10 }, (_, i) => i + 1);

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
    if (!productName || !productCode || !unitName || !quantity || !price || !warehouse) {
      setFormError('กรุณาใส่ข้อมูลให้ครบถ้วน');
      return;
    }
    setFormError('');
    handleClose();
  };

  const isFormValid = () => {
    return productName && productCode && unitName && quantity && price && warehouse;
  };

  const generateProductCode = () => {
    const randomCode = 'P' + Math.floor(1000 + Math.random() * 9000);
    setProductCode(randomCode);
  };

  return (
    <div>
      <div className='DonthaveSN-Link' onClick={handleShow}>
        <span>เพิ่มสินค้าที่ไม่มี S/N <i className="bi bi-file-plus"></i></span>
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
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="warehouse">
                <Form.Label>สถานที่จัดเก็บ</Form.Label>
                <Form.Select onChange={(e) => setWarehouse(e.target.value)} value={warehouse}>
                  <option value="">เลือกโกดัง</option>
                  <option value="โกดัง1">โกดัง1</option>
                  <option value="โกดัง2">โกดัง2</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="position">
                <Form.Label>ตำแหน่ง</Form.Label>
                <Form.Select disabled={!warehouse}>
                  <option value="">เลือกตำแหน่ง</option>
                  {warehouse && warehouseOptions[warehouse].map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="rack">
                <Form.Label>ชั้นวาง</Form.Label>
                <Form.Select>
                  <option value="">เลือกชั้นวาง</option>
                  {rackOptions.map((rack, index) => (
                    <option key={index} value={rack}>{rack}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="กรอกราคาสินค้า"
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
          <Button variant="secondary" onClick={handleClose}>ยกเลิก</Button>
          <Button variant="primary" onClick={handleSave} disabled={!isFormValid()}>บันทึก</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DonthaveSN;
