import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

export default function About() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from local storage
    navigate('/user'); // Redirect to the login page
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <div>About</div>
      <Footer />
    </>
  );
}
