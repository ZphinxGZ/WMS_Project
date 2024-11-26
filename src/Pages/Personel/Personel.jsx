import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { fetchPersonels } from "../../Data/Personels";
import "./Personel.css";

const initadmin = false;

function Personel() {
  const [PersonelsRaw, setPersonelsRaw] = useState([]);
  const [admin, setadmin] = useState(initadmin);
  const [Personels, setPersonels] = useState([]);
  const [editingPersonel, setEditingPersonel] = useState(null); // State to hold personel data for editing
  const [show, setShow] = useState(false); // Modal visibility
   const [searchQuery, setSearchQuery] = useState("");

  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("123456789");
  const [newTel, setNewTel] = useState("");
  const [newRole, setNewRole] = useState("Select Role");

  useEffect(() => {
    // กรองข้อมูลตามสถานะ admin และคำค้นหา
    const filtered = PersonelsRaw.filter((personel) => {
      const matchesRole = admin ? personel.role === "admin" : true;
      const matchesSearch = personel.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()); // ตรวจสอบคำค้นหา
      return matchesRole && matchesSearch;
    });
    setPersonels(filtered);
  }, [PersonelsRaw, admin, searchQuery]);

  useEffect(() => {
    // เรียกข้อมูลเมื่อคอมโพเนนต์โหลดครั้งแรก
    const data = fetchPersonels(); // ดึงข้อมูลจาก fetchPersonels
    setPersonelsRaw(data); // ตั้งค่า state ของข้อมูลทั้งหมด
    setPersonels(data); // ตั้งค่า state ของข้อมูลแสดงในตาราง
  }, []);

  useEffect(() => {
    // กรองข้อมูลตาม role (admin หรือทั้งหมด)
    if (admin) {
      setPersonels(
        PersonelsRaw.filter((personel) => personel.role === "admin")
      );
    } else {
      setPersonels(PersonelsRaw);
    }
  }, [PersonelsRaw, admin]); // จะทำงานใหม่เมื่อ PersonelsRaw หรือ admin เปลี่ยน

  // Add new personel
  function addClick(id, name, username, password, tel, role) {
    const newItem = {
      id: PersonelsRaw.length + 1, // กำหนด ID ใหม่ให้เป็นลำดับถัดไป
      name,
      username,
      password,
      tel,
      role,
      completed: false,
      userId: "U001", // กำหนดค่า userId ถ้าต้องการ
    };

    setPersonelsRaw((prevPersonels) => [...prevPersonels, newItem]);
  }

  // Modal close handler
  const handleClose = () => {
    setShow(false);
    setEditingPersonel(null); // Clear editing data when closing the modal
  };

  // Modal show handler
  const handleShow = () => {
    setEditingPersonel(null);
    const nextId =
      PersonelsRaw.length > 0
        ? Math.max(...PersonelsRaw.map((p) => p.id)) + 1
        : 1; // ถ้ายังไม่มีผู้ใช้ ID เริ่มที่ 1
    setNewId(PersonelsRaw.length + 1); // Set new ID
    setNewName("");
    setNewUsername(`user${nextId}`);
    setNewPassword("123456789");
    setNewTel("");
    setNewRole("Select Role");
    setShow(true);
  };
  // Handle edit click
  function handleEditClick(personel) {
    setEditingPersonel(personel); // เก็บข้อมูลที่ต้องการแก้ไขใน State
    setNewId(personel.id); // ใช้ ID เดิม
    setNewName(personel.name); // ตั้งค่า Name เดิม
    setNewTel(personel.tel); // ตั้งค่า Tel เดิม
    setNewRole(personel.role); // ตั้งค่า Role เดิม

    // ไม่ตั้งค่า Username และ Password ใหม่ในโหมดแก้ไข
    setNewUsername("");
    setNewPassword("");
    setShow(true); // เปิด Modal
  }

  // Handle save edit
  function handleSaveEdit() {
    if (newName === "") {
      alert("Please enter name");
    } else if (newTel === "") {
      alert("Please enter telephone number");
    } else if (newRole === "Select Role") {
      alert("Please select role");
    } else {
      const updatedPersonels = PersonelsRaw.map((personel) => {
        // Check if the current personel ID matches the editingPersonel ID
        if (personel.id === editingPersonel.id) {
          return {
            ...personel,
            name: newName, // Update name
            tel: newTel, // Update telephone number
            role: newRole, // Update role
          };
        }
        return personel; // Return unchanged personel
      });

      setPersonelsRaw(updatedPersonels); // Update the raw personels state
      handleClose(); // Close the modal
    }
  }

  // Handle delete personel
  function deleteClick(id) {
    setPersonelsRaw(PersonelsRaw.filter((Personel) => Personel.id !== id));
  }

  return (
    <div className="table-container">
      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            {editingPersonel ? "Edit User" : "Add New User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="profile-picture mb-3">
              <img
                src="public/img/personalIMG/personalpic.png"
                alt="Profile"
                className="rounded-circle"
              />
            </div>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="newId">
                    <Form.Label>
                      <span className="badge bg-secondary">ID</span>
                    </Form.Label>
                    <Form.Control type="text" disabled value={newId} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="newName">
                    <Form.Label>
                      <span className="badge bg-secondary">Name</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Username and Password: Show only for adding new users */}
              {!editingPersonel && (
                <>
                  <Form.Group controlId="newUsername">
                    <Form.Label>
                      <span className="badge bg-secondary">Username</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      value={newUsername}
                      disabled
                      onChange={(e) => setNewUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="newPassword">
                    <Form.Label>
                      <span className="badge bg-secondary">Password</span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      disabled
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                </>
              )}

              <Form.Group controlId="newTel">
                <Form.Label>
                  <span className="badge bg-secondary">Telephone</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Telephone Number"
                  value={newTel}
                  onChange={(e) => setNewTel(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="newRole">
                <Form.Label>
                  <span className="badge bg-secondary">Role</span>
                </Form.Label>
                <Form.Select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                >
                  <option>Select Role</option>
                  <option>Admin</option>
                  <option>Super Admin</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-outline-danger" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn btn-outline-success"
            onClick={() => {
              if (newName === "") {
                alert("Please enter name");
              } else if (newTel === "") {
                alert("Please enter telephone number");
              } else if (newRole === "Select Role") {
                alert("Please select role");
              } else {
                if (editingPersonel) {
                  // แก้ไขข้อมูล
                  handleSaveEdit(); // เรียกใช้ฟังก์ชันแก้ไข
                } else {
                  // เพิ่มผู้ใช้ใหม่
                  addClick(
                    newId,
                    newName,
                    newUsername,
                    newPassword,
                    newTel,
                    newRole
                  );
                }
                handleClose();
              }
            }}
          >
            {editingPersonel ? "Save" : "Add"}
          </button>
        </Modal.Footer>
      </Modal>

      <div className="filter">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            onChange={(e) => setadmin(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            <span className="badge text-bg-secondary">Show only Admin</span>
          </label>
        </div>
        <div className="search-container">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // อัปเดตค่าการค้นหา
          />
        </div>
        <div className="add-button">
          <button className="btn btn-primary" onClick={handleShow}>
            <span className="bi bi-plus-lg"></span>
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Personels.map((Personel) => (
              <tr key={Personel.id}>
                <td>{Personel.id}</td>
                <td>{Personel.name}</td>
                <td>{Personel.role}</td>
                <td>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => handleEditClick(Personel)}
                  >
                    <span className="bi bi-pencil-fill"></span>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      deleteClick(Personel.id);
                    }}
                  >
                    <span className="bi bi-trash3-fill"></span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Personel;