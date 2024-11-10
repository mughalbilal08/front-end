// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };

    axios.post('http://localhost:5000/auth/login', user)
      .then(response => {
        console.log('Login response:', response.data); // Log the response to check the role
        const { role } = response.data;
        
        if (!role) {
          console.error('Role not found in response');
        } else {
          localStorage.setItem('role', role);  // Store role in localStorage
          setRole(role);  // Update the role in App.js state
          
          // Redirect based on role
          if (role === 'admin') {
            navigate('/add-product');  // Redirect to admin dashboard or product actions
          } else {
            navigate('/product-list');  // Redirect to user product list
          }
          alert('Login successful');
        }
      })
      .catch(error => {
        setError('Invalid credentials');
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default Login;
