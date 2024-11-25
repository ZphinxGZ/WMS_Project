import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';

// STYLE
import './HaveSN.css'



function HaveSN() {
  const [show, setShow] = useState(false);
  const [warehouse, setWarehouse] = useState('');
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [unitName, setUnitName] = useState('');
  const [addedBy, setAddedBy] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [formError, setFormError] = useState('');

  // Function to reset all form fields and error message
  const resetForm = () => {
    setProductName('');
    setProductCode('');
    setUnitName('');
    setAddedBy('');
    setExpiryDate('');
    setWarehouse('');
    setFormError('');
  };

  const handleClose = () => {
    resetForm(); // Reset form fields and error message when modal closes
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  // Format today's date as DD-MM-YYYY
  const today = new Date();
  const formattedToday = new Intl.DateTimeFormat('th-TH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(today);

  // Options for each warehouse
  const warehouseOptions = {
    'โกดัง1': ['A', 'B', 'C'],
    'โกดัง2': ['AA', 'BB', 'CC'],
  };

  // Rack options (1-10)
  const rackOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  // Keyboard event handling for Esc and Enter keys
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

  // Handle form submission (save data)
  const handleSave = () => {
    // Validate the form before submitting
    if (
      !productName ||
      !productCode ||
      !unitName ||
      !addedBy ||
      !expiryDate ||
      !warehouse
    ) {
      setFormError('กรุณาใส่ข้อมูลให้ครบถ้วน');
      return;
    }

    // Reset error message if form is valid
    setFormError('');
    handleClose(); // Close and reset the form
    // Here, you could add logic to save the data or send it to an API
  };

  // Check if the form is valid
  const isFormValid = () => {
    return (
      productName &&
      productCode &&
      unitName &&
      addedBy &&
      expiryDate &&
      warehouse
    );
  };
  return (
    <div>
      <div className='HaveSN-Link' onClick={handleShow}>
    <span>เพิ่มสินค้าที่มี S/N <span><i className="bi bi-file-plus"></i></span></span>
      </div>

      {/* Modal for Adding Product with S/N */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton
          style={{ backgroundColor: '#74bdbc', color: 'white' }}>
          <Modal.Title>เพิ่มสินค้าที่มี S/N</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                  <Form.Control 
                    type="text" 
                    placeholder="กรอกรหัสสินค้า" 
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Row 2: Storage Location with dynamic dropdowns */}
            <Form.Group className="mb-3" controlId="storageLocation">
              <Form.Label>สถานที่จัดเก็บ</Form.Label>
              <Row>
                <Col>
                  <Form.Select 
                    onChange={(e) => setWarehouse(e.target.value)} 
                    aria-label="เลือกสถานที่จัดเก็บ"
                    value={warehouse}
                  >
                    <option value="">เลือกโกดัง</option>
                    <option value="โกดัง1">โกดัง1</option>
                    <option value="โกดัง2">โกดัง2</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select 
                    disabled={!warehouse} 
                    aria-label="เลือกตัวเลือกสถานที่จัดเก็บ"
                  >
                    <option value="">เลือกตำแหน่ง</option>
                    {warehouse && warehouseOptions[warehouse].map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select aria-label="เลือกชั้นวาง">
                    <option value="">เลือกชั้นวาง</option>
                    {rackOptions.map((rack, index) => (
                      <option key={index} value={rack}>{rack}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>

            {/* Row 3: Storage Date and Expiry Date */}
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="storageDate">
                  <Form.Label>วันที่เก็บสินค้า</Form.Label>
                  <Form.Control type="text" value={formattedToday} readOnly />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="expiryDate">
                  <Form.Label>วันหมดอายุ</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)} 
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

            {/* Row 5: Added By */}
            <Form.Group className="mb-3" controlId="addedBy">
              <Form.Label>ชื่อผู้เพิ่มสินค้า</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="กรอกชื่อผู้เพิ่มสินค้า" 
                value={addedBy}
                onChange={(e) => setAddedBy(e.target.value)} 
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
  )
}

export default HaveSN