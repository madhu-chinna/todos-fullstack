import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(''); // For success/error message
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send request to login API
    const response = await fetch('http://localhost:3008/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log('data:--', data)

    if (response.ok) {  // Check if response status is OK (2xx)
    
    // Store the JWT token in cookies (set expiration to 1 day, for example)
    Cookies.set('token', data.token, { expires: 1 }); // expires in 1 day

      // Display success message and navigate to the home page (or dashboard)
      setMessage('Login successful!');
      navigate('/');
    } else {
      // Handle failure case (e.g., invalid credentials)
      setMessage(data.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p className='error-message'>{message}</p>}
    </div>
  );
};

export default Login;
