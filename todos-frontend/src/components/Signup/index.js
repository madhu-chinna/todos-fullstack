import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');  // To show success/error message
  const [errors, setErrors] = useState({});  // To store error messages for each field
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate the form data
  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    // Name validation
    if (!formData.name.trim()) {
      formErrors.name = "Name is required.";
      valid = false;
    }

    // Email validation (basic format check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      formErrors.email = "Email is required.";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = "Please enter a valid email.";
      valid = false;
    }

    // Password validation (minimum 6 characters)
    if (!formData.password) {
      formErrors.password = "Password is required.";
      valid = false;
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data before sending request
    if (!validateForm()) {
      return;
    }

    // Send request to signup API
    const response = await fetch('http://localhost:3008/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {  // Check if response status is OK (2xx)
      // If signup is successful, display success message
      setMessage(data.message);

      // Navigate to the Login page after success
      navigate('/login');
    } else {
      // Handle failure case (e.g., user already exists or internal server error)
      setMessage(data.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h1 className="header-title">Todo Web Application</h1>
      <h2 className='sign-up-heading'>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="err-message">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="err-message">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="err-message">{errors.password}</p>}

        <button type="submit">Sign Up</button>
      </form>
      
      {message && <p className='err-message-2'>{message}</p>}  {/* Display the response message */}
    </div>
  );
};

export default Signup;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './index.css';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
//   const [message, setMessage] = useState('');  // To show success/error message
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Send request to signup API
//     const response = await fetch('http://localhost:3008/api/auth/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();

//     if (response.ok) {  // Check if response status is OK (2xx)
//       // If signup is successful, display success message
//       setMessage(data.message);

//       // Navigate to the Add Task page after success
//       navigate('/login');
//     } else {
//       // Handle failure case (e.g., user already exists or internal server error)
//       setMessage(data.error || 'Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <div className="signup-container">
//         <h1 className="header-title">Todo Web Application</h1>
//       <h2 className='sign-up-heading'>Sign Up</h2>
//       <form onSubmit={handleSubmit} className="signup-form">
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//       {message && <p className='err-message'>{message}</p>}  
      

//     </div>
//   );
// };

// export default Signup;


