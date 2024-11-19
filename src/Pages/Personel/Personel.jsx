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

  const newIdRef = useRef();
  const newNameRef = useRef();
  const newUsernameRef = useRef();
  const newPasswordRef = useRef();
  const newTelRef = useRef();
  const newRoleRef = useRef();

  useEffect(() => {
    setPersonelsRaw(fetchPersonels());
  }, []);

  useEffect(() => {
    if (admin) {
      setPersonels(
        PersonelsRaw.filter((Personel) => Personel.role === "admin")
      );
    } else {
      setPersonels(PersonelsRaw);
    }
  }, [PersonelsRaw, admin]);

  // Add new personel
  function addClick(id, name, username, password, tel, role) {
    const newItem = {
      id,
      name,
      username,
      password,
      tel,
      role,
      completed: false,
      userId: "U001",
    };
    setPersonelsRaw((prevPersonels) => [...prevPersonels, newItem]);
  }

  // Modal close handler
  const handleClose = () => {
    setShow(false);
    setEditingPersonel(null); // Clear editing data when closing the modal
  };

  // Modal show handler
  const handleShow = () => setShow(true);

  // Handle edit click
  function handleEditClick(personel) {
    setEditingPersonel(personel); // Set the personel to edit
    setShow(true); // Show the modal
  }

  // Handle save edit
  function handleSaveEdit() {
    const id = newIdRef.current.value;
    const name = newNameRef.current.value.trim();
    const username = newUsernameRef.current.value.trim();
    const password = newPasswordRef.current.value.trim();
    const tel = newTelRef.current.value.trim();
    const role = newRoleRef.current.value;

    if (name === "") {
      alert("Please enter name");
      newNameRef.current.focus();
    } else if (username === "") {
      alert("Please enter username");
      newUsernameRef.current.focus();
    } else if (tel === "") {
      alert("Please enter telephone number");
      newTelRef.current.focus();
    } else if (role === "Select Role") {
      alert("Please select role");
      newRoleRef.current.focus();
    } else {
      // Update the personel data
      const updatedPersonels = PersonelsRaw.map((personel) => {
        if (personel.id === editingPersonel.id) {
          return { ...personel, name, username, password, tel, role };
        }
        return personel;
      });
      setPersonelsRaw(updatedPersonels);
      handleClose();
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
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="rounded-circle"
              />
              <p className="mt-2 text-muted">
                <button className="btn btn-primary">Add Picture</button>
              </p>
            </div>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="newId">
                    <Form.Label>
                      <span className="badge bg-secondary">ID</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      value={
                        editingPersonel
                          ? editingPersonel.id
                          : PersonelsRaw.length + 1
                      }
                      ref={newIdRef}
                    />
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
                      ref={newNameRef}
                      defaultValue={editingPersonel ? editingPersonel.name : ""}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="newUsername">
                <Form.Label>
                  <span className="badge bg-secondary">Username</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  ref={newUsernameRef}
                  defaultValue={editingPersonel ? editingPersonel.username : ""}
                />
              </Form.Group>
              <Form.Group controlId="newPassword">
                <Form.Label>
                  <span className="badge bg-secondary">Password</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={newPasswordRef}
                  value={
                    editingPersonel ? editingPersonel.password : "123456789"
                  }
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="newTel">
                <Form.Label>
                  <span className="badge bg-secondary">Telephone</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Telephone Number"
                  ref={newTelRef}
                  defaultValue={editingPersonel ? editingPersonel.tel : ""}
                />
              </Form.Group>
              <Form.Group controlId="newRole">
                <Form.Label>
                  <span className="badge bg-secondary">Role</span>
                </Form.Label>
                <Form.Select
                  ref={newRoleRef}
                  defaultValue={
                    editingPersonel ? editingPersonel.role : "Select Role"
                  }
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
              const id = newIdRef.current.value;
              const name = newNameRef.current.value.trim();
              const username = newUsernameRef.current.value.trim();
              const password = newPasswordRef.current.value.trim();
              const tel = newTelRef.current.value.trim();
              const role = newRoleRef.current.value;

              if (name === "") {
                alert("Please enter name");
                newNameRef.current.focus();
                newNameRef.current.value = "";
              }
              if (username === "") {
                alert("Please enter username");
                newUsernameRef.current.focus();
              }
              if (tel === "") {
                alert("Please enter telephone number");
                newTelRef.current.focus();
                newTelRef.current.value = "";
              }
              if (role === "Select Role") {
                alert("Please select role");
                newRoleRef.current.focus();
              } else {
                addClick(id, name, username, password, tel, role);
                handleClose();
              }
            }}
          >
            
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