// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ role }) {
  const handleLogout = () => {
    localStorage.removeItem('role');  // Clear role from localStorage
    window.location.reload();  // Reload the page to reflect the changes
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!role ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/product-list">Product List</Link>
            </li>
            {role === 'admin' && (
              <>
                <li>
                  <Link to="/add-product">Add Product</Link>
                </li>
                <li>
                  <Link to="/edit-product">Edit Product</Link>
                </li>
                <li>
                  <Link to="/delete-product">Delete Product</Link>
                </li>
              </>
            )}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
