import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
// import Header from './components/Header';
import AddTask from './components/AddTask';
import Cookies from 'js-cookie'; 

import './App.css'

// // Utility function to check if the user is authenticated
// const isAuthenticated = () => {
//   // return localStorage.getItem('token') !== null;
//   return Cookies.get('token') !== undefined;
// };

function App() {
  
const isAuthenticated = () => {
  return Cookies.get('token') !== undefined;
};
  return (
    <Router>
      <div className='main-conatiner'>
      {/* <Header />  */}
        <Routes>
          <Route
            path="/"
            element={isAuthenticated() ? <AddTask /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
