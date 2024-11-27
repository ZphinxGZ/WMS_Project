import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal({ show, onHide, setToken }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      className='modal-logout'
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: '#74bdbc', color: 'white' }}>
        <Modal.Title id="contained-modal-title-vcenter">
          ออกจากระบบ
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>ยืนยันการออกจากระบบ?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          className='btn btn-primary' 
          onClick={() => {
            setToken('');  // Clear token
            onHide();      // Close the modal after logging out
          }}
        >
          Ok
        </Button>
        <Button className='btn btn-danger' onClick={onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Sidebar({ tab, setTab, isActive, setIsActive, setToken }) {
  const [modalShow, setModalShow] = React.useState(false);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/dashboard':
        setTab('dashboard');
        break;
      case '/inbound':
        setTab('inbound');
        break;
      case '/outbound':
        setTab('outbound');
        break;
      case '/datahistory':
        setTab('datahistory');
        break;
      case '/personel':
        setTab('personel');
        break;
      case '/settings':
        setTab('settings');
        break;
      default:
        setTab('');
    }
  }, [location, setTab]);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`sidebar ${isActive ? 'active' : ''}`}>
      <div className="logo_content">
        <div className="logo">
          <img src="../../public/img/m.png" alt="Metthier Logo" style={{ height: '70px' }} />
          <div className="logo_name"></div>
        </div>
        <i className="bi bi-list" id="btn" onClick={toggleSidebar}></i>
      </div>

      {/* Sidebar Menu */}
      <ul className="nav_list">
        <li className={tab === 'dashboard' ? 'active' : ''}>
          <Link to="/dashboard">
            <i className="bi bi-bar-chart-line-fill"></i>
            <span className="link_name">Dashboard</span>
          </Link>
          <span className="tooltip">Dashboard</span>
        </li>

        <li className={tab === 'inbound' ? 'active' : ''}>
          <Link to="/inbound">
            <i className="bi bi-box-seam-fill"></i>
            <span className="link_name">Inbound</span>
          </Link>
          <span className="tooltip">Inbound</span>
        </li>

        <li className={tab === 'outbound' ? 'active' : ''}>
          <Link to="/outbound">
            <i className="bi bi-box-arrow-up"></i>
            <span className="link_name">Outbound</span>
          </Link>
          <span className="tooltip">Outbound</span>
        </li>

        <li className={tab === 'datahistory' ? 'active' : ''}>
          <Link to="/datahistory">
            <i className="bi bi-file-earmark-spreadsheet-fill"></i>
            <span className="link_name">DataHistory</span>
          </Link>
          <span className="tooltip">DataHistory</span>
        </li>

        <li className={tab === 'personel' ? 'active' : ''}>
          <Link to="/personel">
            <i className="bi bi-person-fill"></i>
            <span className="link_name">Personel Information</span>
          </Link>
          <span className="tooltip">Personel Information</span>
        </li>
      </ul>

      {/* Profile */}
      <div className="profile_content">
        <div className="profile">
          <div className="profile_details">
            <img src="public/img/OIP (1).jpg" alt="Profile" />
            <div className="name_job">
              <div className="name">Nitiphon</div>
              <div className="job">Super Admin</div>
            </div>
          </div>
          <i className="bi bi-door-closed" id="log_out" onClick={() => setModalShow(true)}></i>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            setToken={setToken}  // Pass setToken to the modal
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
