import React, { useState, useEffect } from "react";
import "./Inbound.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HaveSN from "./Have S.N/HaveSN";
import DonthaveSN from "./Dont have S.N/DonthaveSN";

function Inbound({ products, addProduct }) {
  // State สำหรับจัดการสินค้าที่มี S/N และไม่มี S/N
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsWithoutSN, setProductsWithoutSN] = useState([]);

  useEffect(() => {
    // Filter products ที่มี S/N (haveSN = true)
    const productsWithSN = products.filter((product) => product.haveSN);
    setFilteredProducts(productsWithSN);

    // Filter products ที่ไม่มี S/N (haveSN = false)
    const withoutSN = products.filter((product) => !product.haveSN);
    setProductsWithoutSN(withoutSN);
  }, [products]); // รีเฟรชเมื่อข้อมูล products เปลี่ยนแปลง

  return (
    <div className="Inbound-container">
      {/* ส่งข้อมูลสินค้าที่มี S/N และฟังก์ชันเพิ่มสินค้าไปยัง HaveSN component */}
      <HaveSN products={filteredProducts} addProduct={addProduct} />

      {/* ส่งข้อมูลสินค้าที่ไม่มี S/N และฟังก์ชันเพิ่มสินค้าไปยัง DonthaveSN component */}
      <DonthaveSN products={productsWithoutSN} addProduct={addProduct} />
    </div>
  );
}

export default Inbound;
