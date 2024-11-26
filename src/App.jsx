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
  const [token, setToken] = useState("");

  const [tab, setTab] = useState("");
  const [products, setProducts] = useState(ProductData);

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

   if (token === '' )  {
  return (
    <Login /> 
  ) }else{

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
            {/* ส่ง products และ updateProduct ไปที่ Outbound */}
            <Route
              path="/outbound"
              element={
                <Outbound products={products} updateProduct={updateProduct} />
              }
            />
            <Route
              path="/datahistory"
              element={<DataHistory data_product={products} />}
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
