import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ModalDataHistory({ isOpen, item, onClose, onConfirm, onDelete }) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [note, setNote] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (item) {
      setSelectedStatus(item.status || "");
    }
  }, [item]);

  useEffect(() => {
    if (isPasswordModalOpen) {
      setPassword("");
    }
  }, [isPasswordModalOpen]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    if (e.target.value !== "ไม่อนุมัติ") {
      setNote("");
    }
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleConfirm = () => {
    if (selectedStatus === "อนุมัติ") {
      setIsPasswordModalOpen(true);
    } else {
      onConfirm(item.id, selectedStatus, note);
      onClose();
    }
  };

  const handlePasswordSubmit = () => {
    onConfirm(item.id, selectedStatus, note, password);
    setIsPasswordModalOpen(false);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("คุณแน่ใจที่จะลบข้อมูลนี้?")) {
      onDelete(item.id);
      onClose(); // ปิด modal หลังจากลบ
    }
  };

  return (
    <>
      <Modal show={isOpen} onHide={onClose} centered size="lg">
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#473366", color: "#fff" }}
        >
          <Modal.Title>รายละเอียดรายการ</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            {/* แสดงข้อมูลสินค้าจาก item */}
            <h5>
              <strong>ชื่อสินค้า:</strong> {item?.product_name || "N/A"}
            </h5>
            <h5>
              <strong>รหัสสินค้า :</strong>{" "}
              {item?.haveSN
                ? item?.series_number
                : item?.product_number || "N/A"}
            </h5>
            <p>
              <strong>ID:</strong> {item?.id || "N/A"}
            </p>
            <p>
              <strong>วันที่ทำรายการ:</strong> {item?.outbound_date || "N/A"}
            </p>
            <p>
              <strong>ผู้ทำรายการ:</strong> {item?.approve_name || "N/A"}
            </p>
            <p>
              <strong>จำนวนสินค้าที่เบิก:</strong> {item?.QTY || "N/A"}
            </p>

            <Form.Group controlId="statusSelect" className="my-3">
              <Form.Label>
                <strong>สถานะ</strong>
              </Form.Label>
              <Form.Control
                as="select"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="อนุมัติ">อนุมัติ</option>
                <option value="รออนุมัติ">รออนุมัติ</option>
                <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
              </Form.Control>
            </Form.Group>

            {selectedStatus === "ไม่อนุมัติ" && (
              <Form.Group controlId="note" className="my-3">
                <Form.Label>
                  <strong>หมายเหตุ</strong>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={note}
                  onChange={handleNoteChange}
                  placeholder="กรุณากรอกหมายเหตุ"
                />
              </Form.Group>
            )}

            {selectedStatus === "อนุมัติ" && (
              <div
                className="mt-3"
                style={{ fontWeight: "bold", color: "#28a745" }}
              >
                ผู้ทำการอนุมัติ: Kunakorn (SA)
              </div>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            ยกเลิก
          </Button>
          {(item?.status === "อนุมัติ" || item?.status === "ไม่อนุมัติ") && (
            <Button variant="danger" onClick={handleDelete}>
              ลบ
            </Button>
          )}
          <Button variant="success" onClick={handleConfirm}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal สำหรับกรอกรหัสผ่าน */}
      <Modal
        show={isPasswordModalOpen}
        onHide={() => setIsPasswordModalOpen(false)}
        centered
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#473366", color: "#fff" }}
        >
          <Modal.Title>กรอกรหัสผ่าน</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="password" className="my-3">
            <Form.Label>
              <strong>รหัสผ่าน</strong>
            </Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="กรุณากรอกรหัสผ่าน"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsPasswordModalOpen(false)}
          >
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
