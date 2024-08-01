import React from "react";
import { useSelector } from "react-redux";

const ProductCart1 = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log("cartItems", cartItems);
  return <div>ProductCart1</div>;
};

export default ProductCart1;
