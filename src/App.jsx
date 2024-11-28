import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import Layouts from "./Layout/Layouts/Layouts";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Inbound from "./Pages/Inbound/Inbound";
import Outbound from "./Pages/Outbound/Outbound";
import DataHistory from "./Pages/DataHistory/DataHistory";
import Personel from "./Pages/Personel/Personel";
import Setting from "./Pages/Setting/Setting";

// style
import "./App.css";

// data
import ProductData from "./Data/ProductData";
import Login from "./Pages/Login/Login";

const initialTab = "home";

function App() {
  const [token, setToken] = useState(''); 
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("");
  const [tab, setTab] = useState(initialTab);
  const [products, setProducts] = useState(ProductData); // ข้อมูลสินค้าเดิม
  const [outboundProducts, setOutboundProducts] = useState([]); // ข้อมูลที่ได้รับจาก Outbound

  // ใช้ useEffect หากต้องการทำบางอย่างเมื่อแอปเริ่มต้น
  useEffect(() => {
    setTab(initialTab);
  }, []);

  const handleLogin = (name, pass) => {
    // นี่คือที่ที่คุณจะรับค่าชื่อผู้ใช้ (name) จาก Login
    setUsername(name);
  };

  // Function to add new product data
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  // Function to update product data
  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productCode === updatedProduct.productCode
          ? updatedProduct
          : product
      )
    );
  };

  // Function to add or update outbound product data
  const handleOutboundUpdate = (newData) => {
    // ตรวจสอบว่า newData มีข้อมูลหรือไม่
    if (newData.length === 0) {
      alert("ไม่มีข้อมูลใหม่ที่จะบันทึก");
      return;
    }

    setOutboundProducts((prevOutboundProducts) => [
      ...prevOutboundProducts,
      ...newData,
    ]);
  };

  if (token === '' )  {
    return (
      <Login setToken={setToken} setRole={setRole} setUsername={setUsername} />    
    ) }else{
  
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route element={<Layouts tab={tab} setTab={setTab} setToken={setToken} role={role} username={username}/>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/" element={<Dashboard products={products} />} />
            <Route
              path="/dashboard"
              element={<Dashboard products={products} />}
            />

            <Route
              path="/inbound"
              element={<Inbound products={products} addProduct={addProduct} />}
            />
            <Route
              path="/outbound"
              element={
                <Outbound
                  products={products}
                  updateProduct={updateProduct}
                  handleOutboundUpdate={handleOutboundUpdate} // ส่งฟังก์ชันให้ Outbound
                />
              }
            />
            <Route
              path="/datahistory"
              element={
                <DataHistory
                  data_product={[...products, ...outboundProducts]}
                />
              } // ส่งข้อมูลรวมกันไปที่ DataHistory
            />
            <Route path="/personel" element={<Personel />} />
            <Route path="/settings" element={<Setting />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}
}
export default App;
