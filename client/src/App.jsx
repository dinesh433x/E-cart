import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoriesPage";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import ProductDetails from "./components/ProductDetails";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./redux/productSlice";
import { useEffect } from "react";
import { fetchCart } from "./redux/cartSlice";
import SearchResultsPage from "./pages/SearchResultsPage";
import { clearCart } from "./redux/cartSlice";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess.jsx";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo?.token) {
      dispatch(fetchCart());
    } else {
      dispatch(clearCart());
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "6px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route
            path="/category/:categoryName"
            element={<CategoryProductsPage />}
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}
