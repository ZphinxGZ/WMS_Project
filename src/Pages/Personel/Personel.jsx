import { fetchPersonels } from "../../Data/Personels";
import React, { useEffect, useState } from "react";
import "./Personel.css";

const initsuperadmin = false;

function Personel() {
  
  const [PersonelsRaw, setPersonelsRaw] = useState([]);

  const [superadmin, setSuperadmin] = useState([initsuperadmin]);

  const [Personels, setPersonels] = useState([]);


  useEffect(() => {
    console.log(`superadmin: ${superadmin}`);
  }, [superadmin]);

  useEffect(() => {
    setPersonelsRaw(fetchPersonels());
  }, []);

  useEffect(() => {
    if (superadmin) {
      setPersonels(PersonelsRaw.filter((Personel) =>Personel.completed ));
    } else {

      setPersonels(PersonelsRaw);
    }
  }, [PersonelsRaw, superadmin]);

  return (
    <div className="table-container">
      <div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            
            onChange={(e) => {
              setSuperadmin(e.target.checked);
            }}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Show only Super Admin
          </label>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="table ">
          <thead className="table-head">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Password</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/*
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Admin</td>
              <td>********</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
*/}

            {Personels.map((Personel) => {
              return (
                <tr key={Personel.id}>
                  <td>{Personel.id}</td>
                  <td>{Personel.title}</td>
                  <td>{Personel.completed ? "Super Admin" : "Admin"}</td>
                  <td>
                    <button className="btn btn-outline-success">
                      <span className="bi bi-check2"></span>
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-outline-warning">
                      <span className="bi bi-pencil-fill"></span>
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-outline-danger">
                      <span className="bi bi-trash3-fill"></span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Personel;
