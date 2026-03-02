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
import Driver from './pages/sidebar/Driver';
import CompanyProfile from './pages/sidebar/CompanyProfile';
import ViewProducts from './pages/sidebar/ViewProducts';
import ViewPromotions from './pages/sidebar/ViewPromotions';
import AdminDashboard from './pages/sidebar/AdminDashboard';
import Inventory from './pages/sidebar/Inventory';
import Clients from './pages/sidebar/Clients';
import Settings from './pages/sidebar/Settings';
import ActivityLog from './pages/sidebar/ActivityLog';
import Onboarding from './pages/sidebar/Onboarding';
import Companies from './pages/sidebar/Companies';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/pages/signin" element={<SignIn />} />
        <Route path="/pages/signup" element={<SignUp />} />
        <Route path="/pages/resetpassword" element={<ResetPassword />} />
        
        {/* UserDashboard Layout Wrapper */}
        <Route path="/sidebar" element={<DynamicLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="companyprofile" element={<CompanyProfile />} />
          <Route path="viewproducts" element={<ViewProducts />} />
          <Route path="viewpromotions" element={<ViewPromotions />} />
        </Route>
        
        {/* AdminDashboard Layout Wrapper */}
        <Route path="/admin" element={<AdminDynamicLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="admindashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="promotions" element={<Promotions />} />
          <Route path="driver" element={<Driver />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="clients" element={<Clients />} />
          <Route path="settings" element={<Settings />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="companies" element={<Companies />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;



