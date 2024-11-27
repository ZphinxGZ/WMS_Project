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

const initialTab = "home";

function App() {
  const [tab, setTab] = useState(initialTab);
  const [products, setProducts] = useState(ProductData); // ข้อมูลสินค้าเดิม
  const [outboundProducts, setOutboundProducts] = useState([]); // ข้อมูลที่ได้รับจาก Outbound

  // ใช้ useEffect หากต้องการทำบางอย่างเมื่อแอปเริ่มต้น
  useEffect(() => {
    setTab(initialTab);
  }, []);

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

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route element={<Layouts tab={tab} setTab={setTab} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
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
                  data_product={[...products, ...outboundProducts,...outboundProducts]} // ส่งข้อมูลจาก outboundProducts ไปที่ DataHistory
                />
              }
            />
            <Route path="/personel" element={<Personel />} />
            <Route path="/settings" element={<Setting />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
