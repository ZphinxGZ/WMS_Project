import React from "react";
import { Button, Modal, Table } from "react-bootstrap";

function OutboundModal({
  showModal,
  setShowModal,
  selectedItemsForConfirmation,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleCancelItem,
  handleConfirm,
  outboundItems,
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
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>รหัสสินค้า</th>
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
                    style={{ marginRight: "10px" }} // ระยะห่างระหว่างปุ่ม "+" และตัวเลข
                  >
                    +
                  </Button>
                  <span style={{ margin: "0 10px" }}>{item.quantity}</span>{" "}
                  {/* ระยะห่างระหว่างปุ่มและตัวเลข */}
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDecreaseQuantity(item)}
                    style={{ marginLeft: "10px" }} // ระยะห่างระหว่างตัวเลขและปุ่ม "-"
                  >
                    -
                  </Button>
                </td>

                <td>{item.unit}</td>
                <td>{item.price}</td>
                <td>
                  {outboundItems.find((product) => product.id === item.id)
                    ?.quantity || 0}
                </td>

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
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          ยกเลิก
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OutboundModal;
