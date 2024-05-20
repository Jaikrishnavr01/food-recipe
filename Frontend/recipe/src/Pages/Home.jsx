import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Carousel from '../Components/Carousel/Carousel'
import Footer from '../Components/Footer/Footer'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from local storage
    navigate('/user'); // Redirect to the login page
  };
  return (
    <div>
        <Navbar onLogout={handleLogout}/>
        <Carousel/>
        <Footer/>
    </div>
  )
}
