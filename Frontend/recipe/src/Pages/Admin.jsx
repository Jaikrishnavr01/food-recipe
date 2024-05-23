import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import Recipe from './Recipe';

function Admin() {
  const [users, setUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/auth/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleShowUser = (user) => {
    setCurrentUser(user);
    setUserFormData({ username: user.username, email: user.email, password: '' });
    setShowUserModal(true);
  };

  const handleCloseUser = () => {
    setShowUserModal(false);
    setCurrentUser(null);
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSaveUser = async () => {
    const updatedData = { ...userFormData };
    if (!updatedData.password) {
      delete updatedData.password; 
    }
    try {
      await axios.put(`http://localhost:3001/auth/users/${currentUser._id}`, updatedData);
      fetchUsers();
      handleCloseUser();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (_id) => {
    try {
      await axios.delete(`http://localhost:3001/auth/users/${_id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>User Management</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                <button className="btn btn-primary mr-2" onClick={() => handleShowUser(user)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal show={showUserModal} onHide={handleCloseUser}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={userFormData.username}
                  onChange={handleUserChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userFormData.email}
                  onChange={handleUserChange}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={userFormData.password}
                  onChange={handleUserChange}
                  placeholder="Leave blank to keep current password"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUser}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveUser}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <Recipe />
    </>
  );
}

export default Admin;

