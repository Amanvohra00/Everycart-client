import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Policy from "../pages/Policy";
import Pagenotfound from "../pages/Pagenotfound";

import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";

import Dashboard from "../pages/user/Dashboard";
import Profile from "../pages/user/Profile";
import Orders from "../pages/Orders";

import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateCategory from "../pages/admin/CreateCategory";
import CreateProduct from "../pages/admin/CreateProduct";
import UpdateProduct from "../pages/admin/UpdateProduct";
import Products from "../pages/admin/Products";
import Users from "../pages/admin/Users";

import Search from "../pages/Search";
import ProductDetails from "../pages/ProductDetails";
import Categories from "../pages/Categories";
import Categoryproducts from "../pages/Categoryproducts";
import CartPage from "../pages/CartPage";
import PaymentPage from "../pages/PaymentPage";

import PrivateRoute from "../components/routes/PrivateRoute";
import AdminRoute from "../components/routes/AdminRoute";
import CreateSubCategory from "../pages/admin/CreateSubCategory";
import AdminOrders from "../pages/admin/AdminOrders";

const App = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/category/:slug" element={<Categoryproducts />} />
      <Route path="/search" element={<Search />} />
      <Route path="/cart" element={<CartPage />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />

      {/* USER PROTECTED ROUTES */}
      <Route element={<PrivateRoute />}>
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/dashboard/user" element={<Dashboard />} />
        <Route path="/dashboard/user/profile" element={<Profile />} />
        <Route path="/dashboard/user/orders" element={<Orders />} />
      </Route>

      {/* ADMIN PROTECTED ROUTES */}
      <Route element={<AdminRoute />}>
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/create-category" element={<CreateCategory />} />
        <Route path="/dashboard/admin/create-subcategory" element={<CreateSubCategory />} />
        <Route path="/dashboard/admin/create-product" element={<CreateProduct />} />
        <Route path="/dashboard/admin/product/:slug" element={<UpdateProduct />} />
        <Route path="/dashboard/admin/products" element={<Products />} />
        <Route path="/dashboard/admin/adminorders" element={<AdminOrders />} />

      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Pagenotfound />} />
    </Routes>
  );
};

export default App;
