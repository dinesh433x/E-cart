import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from './components/ProductDetails';
import { useDispatch } from "react-redux";
import { fetchCategories } from "./redux/productSlice";
import { useEffect } from "react";



export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Navbar /> 
        <div style={{ paddingTop: "6px" }}>
        <Routes>
          
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          
        </Routes>
        </div>        
        
        <Footer />
      
    </>
  );
}
