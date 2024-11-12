import React, { useState } from 'react';
import './Outbound.css';
import { Button } from 'react-bootstrap';

function Outbound() {
  // ตัวอย่างข้อมูลสินค้า
  const initialItems = [
    { id: 1, name: 'Product A', quantity: 10, date: '2024-11-10', confirmed: false },
    { id: 2, name: 'Product B', quantity: 5, date: '2024-11-11', confirmed: false },
    { id: 3, name: 'Product C', quantity: 20, date: '2024-11-12', confirmed: false },
  ];

  const [outboundItems, setOutboundItems] = useState(initialItems);
  const [editingItem, setEditingItem] = useState(null); // กำหนดสถานะแก้ไข
  const [editForm, setEditForm] = useState({ name: '', quantity: '', date: '' });

  // เริ่มแก้ไขข้อมูล
  const handleEditClick = (item) => {
    setEditingItem(item.id);
    setEditForm({ name: item.name, quantity: item.quantity, date: item.date });
  };

  // อัปเดตค่าฟอร์มเมื่อพิมพ์ข้อมูลใหม่
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // บันทึกข้อมูลที่แก้ไขแล้ว
  const handleSave = () => {
    setOutboundItems(outboundItems.map(item =>
      item.id === editingItem ? { ...item, ...editForm } : item
    ));
    setEditingItem(null); // ออกจากโหมดแก้ไข
  };

  // ยกเลิกการแก้ไข
  const handleCancel = () => {
    setEditingItem(null); // ยกเลิกและออกจากโหมดแก้ไข
  };

  // ยืนยันสินค้า
  const handleConfirm = (id) => {
    setOutboundItems(outboundItems.map(item =>
      item.id === id ? { ...item, confirmed: true } : item
    ));
  };

  return (
    <div className="outbound-container">
      {/* Sticky Header Section */}
      <div className="outbound-header">
        <h1>Outbound - การส่งออกสินค้า</h1>
      </div>

      {/* Table Section */}
      <table className="outbound-table">
        <thead>
          <tr>
            <th>รหัสสินค้า</th>
            <th>ชื่อสินค้า</th>
            <th>จำนวน</th>
            <th>วันที่ส่งออก</th>
            <th>การดำเนินการ</th>
            <th>ยืนยันสินค้า</th>
          </tr>
        </thead>
        <tbody>
          {outboundItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {editingItem === item.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleChange}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editingItem === item.id ? (
                  <input
                    type="number"
                    name="quantity"
                    value={editForm.quantity}
                    onChange={handleChange}
                  />
                ) : (
                  item.quantity
                )}
              </td>
              <td>
                {editingItem === item.id ? (
                  <input
                    type="date"
                    name="date"
                    value={editForm.date}
                    onChange={handleChange}
                  />
                ) : (
                  item.date
                )}
              </td>
              <td>
                {/* แสดงปุ่มแก้ไข แต่ทำให้ปุ่มกดไม่ได้ถ้าสินค้าได้รับการยืนยันแล้ว */}
                {editingItem === item.id ? (
                  <>
                    <Button onClick={handleSave} variant="success" size="sm" className="me-2">
                      บันทึก
                    </Button>
                    <Button onClick={handleCancel} variant="danger" size="sm">
                      ยกเลิก
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => handleEditClick(item)}
                    variant="warning"
                    size="sm"
                    disabled={item.confirmed} // ปิดการใช้งานปุ่มหากยืนยันแล้ว
                  >
                    แก้ไข
                  </Button>
                )}
              </td>
              <td>
                {item.confirmed ? (
                  <span className="text-success">ยืนยันแล้ว</span>
                ) : (
                  <Button onClick={() => handleConfirm(item.id)} variant="primary" size="sm">
                    ยืนยัน
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Outbound;
