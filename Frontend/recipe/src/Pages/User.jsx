import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import '../Pages/home.css';
import Admin from './Admin';
import Recipe from './Recipe';

function User() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('isLoggedIn'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignup ? 'http://localhost:3001/auth/signup' : 'http://localhost:3001/auth/signin';
    const data = isSignup ? { username, email, password } : { email, password };

    try {
      const response = await axios.post(url, data);
      console.log('Response:', response.data);
      setUser(response.data.user);
      localStorage.setItem('isLoggedIn', 'true'); 
      setSuccess(isSignup ? 'Signup successful.' : 'Login successful.');
      setError('');
    } catch (error) {
      console.error('Error:', error.response.data.message);
      setError(error.response.data.message);
      setSuccess('');
    }
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setError('');
    setSuccess('');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('isLoggedIn'); 
    setSuccess('');
  };
  if (user) {
    return (
      <div>
        <Navbar onLogout={handleLogout} user={user} />
        <div className={user.userType === 'Admin' ? "admin-page" : "user-page"}>
          <h1>Welcome {user.userType === 'Admin' ? 'Admin, ' : ''}{user.username}</h1>
          {user.userType === 'Admin' ? <Admin /> : <Recipe/>}
        </div>
        <Footer />
      </div>
    );
  }
  

  return (
    <div>
      <Navbar />
      <div className='form-div'>
        <form onSubmit={handleSubmit}>
          <h1>{isSignup ? 'Signup' : 'Login'}</h1>
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
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
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
