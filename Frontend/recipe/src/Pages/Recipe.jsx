import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { useNavigate } from 'react-router-dom';

export default function Recipe() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from local storage
    navigate('/user'); // Redirect to the login page
  };
  return (<>
  <Navbar onLogout={handleLogout}/>
    <div>Recipe</div>
    <Footer/>
    </>
  )
}
