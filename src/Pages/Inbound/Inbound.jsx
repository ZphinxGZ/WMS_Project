import React, { useState, useEffect } from "react";

import "./Inbound.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HaveSN from "./Have S.N/HaveSN";
import DonthaveSN from "./Dont have S.N/DonthaveSN";

function Inbound({ products, addProduct }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsWithoutSN, setProductsWithoutSN] = useState([]);

  useEffect(() => {
    // Filter products that have SN (haveSN = true)
    const productsWithSN = products.filter((product) => product.haveSN);
    setFilteredProducts(productsWithSN);

    // Filter products that don't have SN (haveSN = false)
    const withoutSN = products.filter((product) => !product.haveSN);
    setProductsWithoutSN(withoutSN);
  }, [products]);

  return (
    <div className="Inbound-container">
      <HaveSN products={filteredProducts} addProduct={addProduct} />
      <DonthaveSN products={productsWithoutSN} addProduct={addProduct} />
    </div>
  );
}

export default Inbound;
