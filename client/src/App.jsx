import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from './components/ProductDetails';



export default function App() {
  return (
    <>
      <Navbar />
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          
        </Routes>
        
        <Footer />
      
    </>
  );
}
