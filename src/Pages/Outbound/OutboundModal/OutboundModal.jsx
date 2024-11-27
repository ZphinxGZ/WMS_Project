import React from "react";
import { Button, Modal, Table } from "react-bootstrap";

function OutboundModal({
  showModal,
  setShowModal,
  selectedItemsForConfirmation,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleCancelItem,
  handleConfirm
}) {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      size="lg"
    >
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>ยืนยันการเลือกสินค้า</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>รหัสสินค้า</th>
              <th>รายการ</th>
              <th>จำนวน</th>
              <th>หน่วย</th>
              <th>ราคา/หน่วย</th>
              <th>คลัง</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {selectedItemsForConfirmation.map((item) => (
              <tr key={item.id}>
                <td>{item.productNumber}</td>
                <td>{item.name}</td>
                <td>
                  <Button
                    variant="outline-success"
                    onClick={() => handleIncreaseQuantity(item)}
                  >
                    +
                  </Button>
                  {item.quantity}
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDecreaseQuantity(item)}
                  >
                    -
                  </Button>
                </td>
                <td>{item.unit}</td>
                <td>{item.price}</td>
                <td>{item.warehouse}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleCancelItem(item)}
                  >
                    ลบ
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowModal(false)}
        >
          ยกเลิก
        </Button>
        <Button
          variant="primary"
          onClick={handleConfirm}
        >
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OutboundModal;
