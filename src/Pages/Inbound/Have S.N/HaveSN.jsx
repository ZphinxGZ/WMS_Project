import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';

// STYLE
import './HaveSN.css';

function HaveSN() {
  const [show, setShow] = useState(false);
  const [warehouse, setWarehouse] = useState('');
  const [room, setRoom] = useState('');
  const [rack, setRack] = useState('');
  const [productName, setProductName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [formError, setFormError] = useState('');

  // Function to reset all form fields and error message
  const resetForm = () => {
    setProductName('');
    setSerialNumber('');
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

  // Rack options (1-10)
  const rackOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  // Room options (1-4)
  const roomOptions = Array.from({ length: 4 }, (_, i) => i + 1);

  // Warehouse options (1-2)
  const warehouseOptions = [1, 2];

  // Format today's date as DD-MM-YYYY
  const today = new Date();
  const formattedToday = new Intl.DateTimeFormat('th-TH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(today);

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
    if (!productName || !serialNumber || !quantity || !price || !warehouse || !room || !rack) {
      setFormError('กรุณาใส่ข้อมูลให้ครบถ้วน');
      return;
    }

    setFormError('');
    handleClose();
    // Add logic to save the data or send it to an API here
  };

  // Check if the form is valid
  const isFormValid = () => {
    return productName && serialNumber && quantity && price && warehouse && room && rack;
  };

  return (
    <div>
      <div className='HaveSN-Link' onClick={handleShow}>
        <span>เพิ่มสินค้าที่มี S/N <span><i className="bi bi-file-plus"></i></span></span>
      </div>

      {/* Modal for Adding Product with S/N */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: '#74bdbc', color: 'white' }}>
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
                      <option key={option} value={option}>{option}</option>
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
                    {warehouse && roomOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
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
                      <option key={option} value={option}>{option}</option>
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
