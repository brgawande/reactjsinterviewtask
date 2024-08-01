import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./coponents/header/Header";
import Home from "./coponents/home/Home";
import ProductCart from "./coponents/productCart/ProductCart";
import Login from "./coponents/login/Login";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<ProductCart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
