import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import DynamicLayout from './layout/DynamicLayout';
import AdminDynamicLayout from './layout/AdminDynamicLayout';
import Dashboard from './pages/sidebar/Dashboard';
import Orders from './pages/sidebar/Orders';
import Products from './pages/sidebar/Products';
import Promotions from './pages/sidebar/Promotions';
import PlaceOrders from './pages/sidebar/PlaceOrders';
import ViewProducts from './pages/sidebar/ViewProducts';
import ViewPromotions from './pages/sidebar/ViewPromotions';
import AdminDashboard from './pages/sidebar/AdminDashboard';
import Deliveries from './pages/sidebar/Deliveries';
import RequireRole from './components/RequireRole';
import DriverDashboard from './pages/DriveDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/pages/signin" element={<SignIn />} />
        <Route path="/pages/signup" element={<SignUp />} />
        <Route path="/pages/resetpassword" element={<ResetPassword />} />
        
        {/* UserDashboard Layout Wrapper */}
        <Route path="/sidebar" element={<RequireRole role={["user","driver"]}><DynamicLayout /></RequireRole>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="placeorders" element={<PlaceOrders />} />
          <Route path="viewproducts" element={<ViewProducts />} />
          <Route path="viewpromotions" element={<ViewPromotions />} />
          <Route
            path="driver/*"
            element={
              <RequireRole role="driver">
                <DriverDashboard />
              </RequireRole>
            }
          />
        </Route>
        
        {/* AdminDashboard Layout Wrapper */}
        <Route path="/admin" element={
          <RequireRole role="admin">
            <AdminDynamicLayout />
          </RequireRole>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="admindashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="promotions" element={<Promotions />} />
          <Route path="deliveries" element={<Deliveries />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;



