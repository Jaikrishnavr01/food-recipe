import React from 'react';
import './Footer.css'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
        <div className="col-md-4">
            <h5 className='f1'>About Us</h5>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit atque tempore dignissimos repellat harum! Voluptates qui voluptatum cumque laborum possimus, quos accusamus culpa error tenetur fugiat, atque vero nulla voluptatibus.</p>
          </div>
          {/* <div className="col-md-2 offset-md-3"> 
            {/* <h5 className='f1'>Menu</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/About">About Us</Link></li>
              <li><Link to='/Rooms'>Recipe</Link></li>
            </ul> 
          </div> */}
       
          <div className="col-md-2 offset-md-5">
            {/* <h5 className='f1'>Contact Us</h5>
            <p>Habibi Residency</p>
            <p>123 Blissful Avenue</p>
            <p>Saravanampatti, Coimbatore, Tamilnadu-641035, India</p>
            <p>Phone: +123 456 7890</p>
            <p>Email: info@hresidency.com</p> */}
              <h5 className='f1'>Menu</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/About">About Us</Link></li>
              <li><Link to='/Recipe'>Recipe</Link></li>
            </ul>
          </div>
        <p>@Copyrights reserverd by jaikrishna</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
