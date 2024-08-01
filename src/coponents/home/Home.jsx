import React, { useState } from "react";
import AllProducts from "../products/AllProducts";
import ProductCart from "../productCart/ProductCart";

const Home = () => {
  return (
    <div>
      <div>
        {/* homenavbar starts */}
        {/* homenavbar ends */}
        {/* product section starts */}
        <AllProducts />
        {/* product section ends */}
        <ProductCart />
      </div>
    </div>
  );
};

export default Home;
