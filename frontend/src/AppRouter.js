import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import ProductCatalog from './pages/ProductCatalog';
import HomePage from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import InventoryUpload from './pages/InventoryUpload';
import InventoryReport from './pages/InventoryReport';
import Localization from './pages/Localization';
import Chatbot from './pages/Chatbot';


const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/productcatalog" element={<ProductCatalog />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/inventory/upload" element={<InventoryUpload />} />
      <Route path="/inventory/report" element={<InventoryReport />} />
      <Route path="/localization" element={<Localization />} />
      <Route path="/chatbot" element={<Chatbot />} />
      {/* Add more routes here */}
    </Routes>
  </Router>
);

export default AppRouter;
