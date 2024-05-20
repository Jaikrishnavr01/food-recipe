import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import '../Pages/home.css';

function User() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = isSignup ? 'http://localhost:3001/auth/signup' : 'http://localhost:3001/auth/signin';
    const data = isSignup ? { username, email, password } : { email, password };

    try {
      const response = await axios.post(url, data);
      console.log('Response:', response.data);
      // Handle success (e.g., navigate to another page, display a success message, etc.)
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., display an error message)
    }
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div>
      <Navbar />
      <div className='form-div'>
        <form onSubmit={handleSubmit}>
          <h1>{isSignup ? 'Signup' : 'Login'}</h1>
          {!isSignup && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
          {!isSignup && (
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
          {isSignup && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
           {isSignup && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
          {isSignup && (
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
          <div className="form-group">
            <button type='submit'>{isSignup ? 'Signup' : 'Login'}</button>
          </div>
          <div className="form-group">
            <button type='button' onClick={toggleForm}>
              {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default User;
