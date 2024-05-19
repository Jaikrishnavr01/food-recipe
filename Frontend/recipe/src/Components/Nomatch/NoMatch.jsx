import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Errorimg from '../../assets/404error.gif'
import './NoMatch.css'
import { Link } from 'react-router-dom'

function NoMatch() {

  return (
    <div>
        <Navbar/>
        <div className='nomatch'>
            <img src={Errorimg} alt="404error" />
            <div className='nomatch-message'>

            <h1>404</h1>
            <h2>Page Not Found</h2>
            <Link to='/' className='btn btn-success'>Go back to Home</Link>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default NoMatch