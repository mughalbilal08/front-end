import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import DeleteProduct from './components/DeleteProduct';
import './App.css';  // Importing CSS file for styling

function App() {
  const [role, setRole] = useState(localStorage.getItem('role') || null); // Get role from localStorage

  useEffect(() => {
    // Whenever role changes, update it in the local storage
    if (role) {
      localStorage.setItem('role', role);
    }
  }, [role]);

  return (
    <Router>
      <div className="app-container">
        <Navbar role={role} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<h1 className="welcome-text">Welcome to the Product Management App</h1>} />
            <Route path="/login" element={<Login setRole={setRole} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/product-list" element={role ? <ProductList /> : <Login setRole={setRole} />} />
            <Route path="/add-product" element={role === 'admin' ? <AddProduct /> : <h1>Access Denied</h1>} />
            <Route path="/edit-product" element={role === 'admin' ? <EditProduct /> : <h1>Access Denied</h1>} />
            <Route path="/delete-product" element={role === 'admin' ? <DeleteProduct /> : <h1>Access Denied</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
