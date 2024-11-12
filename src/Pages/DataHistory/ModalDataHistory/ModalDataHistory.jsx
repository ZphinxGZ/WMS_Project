import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // ใช้ Bootstrap Component

function ModalDataHistory({ isOpen, item, onClose, onConfirm }) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [note, setNote] = useState(''); // State สำหรับหมายเหตุ
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // State สำหรับเปิด/ปิด Modal รหัสผ่าน
  const [password, setPassword] = useState(''); // State สำหรับเก็บรหัสผ่าน

  // ตั้งค่า default value ของ selectedStatus เมื่อมีการเปิด modal
  useEffect(() => {
    if (item) {
      setSelectedStatus(item.status);
    }
  }, [item]);

  useEffect(() => {
    // เมื่อ modal สำหรับการกรอกรหัสผ่านเปิด จะรีเซ็ตค่ารหัสผ่าน
    if (isPasswordModalOpen) {
      setPassword('');
    }
  }, [isPasswordModalOpen]); // จะทำงานทุกครั้งที่ isPasswordModalOpen เปลี่ยนค่า

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    if (e.target.value !== 'ไม่อนุมัติ') {
      setNote(''); // ถ้าไม่ได้เลือก "ไม่อนุมัติ" ให้ลบหมายเหตุ
    }
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleConfirm = () => {
    // ถ้าเลือก "อนุมัติ" ให้แสดง Modal สำหรับกรอกรหัสผ่าน
    if (selectedStatus === 'อนุมัติ') {
      setIsPasswordModalOpen(true);
    } else {
      // ส่งค่ากลับไปยัง DataHistory ถ้าไม่ได้เลือก "อนุมัติ"
      onConfirm(item.id, selectedStatus, note);
      onClose(); // ปิด modal
    }
  };

  const handlePasswordSubmit = () => {
    // เมื่อกรอกรหัสผ่านแล้ว กดยืนยัน
    onConfirm(item.id, selectedStatus, note, password); // ส่งรหัสผ่านด้วย
    setIsPasswordModalOpen(false); // ปิด modal รหัสผ่าน
    onClose(); // ปิด modal หลัก
  };

  return (
    <>
      <Modal show={isOpen} onHide={onClose} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: '#473366', color: '#fff' }}>
          <Modal.Title>รายละเอียดรายการ</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="text-left">
            {/* ข้อมูลรายการ */}
            <div className="mb-4">
              <h5><strong>รายการ:</strong> {item ? item.item : ''}</h5>
              <p><strong>ID:</strong> {item ? item.id : ''}</p>
              <p><strong>วันที่เบิก:</strong> {item ? item.date_borrowed : ''}</p>
              <p><strong>ผู้ทำรายการ:</strong> {item ? item.approver : ''}</p>
            </div>

            {/* Dropdown สำหรับการเลือกสถานะ */}
            <Form.Group controlId="statusSelect" className="my-3">
              <Form.Label><strong>สถานะ</strong></Form.Label>
              <Form.Control 
                as="select" 
                value={selectedStatus} 
                onChange={handleStatusChange}
                custom
                style={{
                  backgroundColor: '#f7f7f7', 
                  borderColor: '#ccc', 
                  fontSize: '1rem', 
                  padding: '10px'
                }}
              >
                <option value="อนุมัติ">อนุมัติ</option>
                <option value="รออนุมัติ">รออนุมัติ</option>
                <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
              </Form.Control>
            </Form.Group>

            {/* ช่องกรอกหมายเหตุ (จะแสดงเมื่อเลือก "ไม่อนุมัติ") */}
            {selectedStatus === 'ไม่อนุมัติ' && (
              <Form.Group controlId="note" className="my-3">
                <Form.Label><strong>หมายเหตุ</strong></Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={note} 
                  onChange={handleNoteChange}
                  placeholder="กรุณากรอกหมายเหตุ"
                />
              </Form.Group>
            )}

            {/* แสดงข้อความผู้ทำการอนุมัติ เมื่อเลือกสถานะเป็น "อนุมัติ" */}
            {selectedStatus === 'อนุมัติ' && (
              <div className="mt-3" style={{ fontWeight: 'bold', color: '#28a745' }}>
                ผู้ทำการอนุมัติ: Kunakorn (SA)
              </div>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={onClose}>
            ยกเลิก
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal สำหรับกรอกรหัสผ่านเมื่อเลือก "อนุมัติ" */}
      <Modal show={isPasswordModalOpen} onHide={() => setIsPasswordModalOpen(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#473366', color: '#fff' }}>
          <Modal.Title>กรอกรหัสผ่าน</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="password" className="my-3">
            <Form.Label><strong>รหัสผ่าน</strong></Form.Label>
            <Form.Control 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="กรุณากรอกรหัสผ่าน"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => setIsPasswordModalOpen(false)}>
            ยกเลิก
          </Button>
          <Button variant="success" onClick={handlePasswordSubmit}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDataHistory;
