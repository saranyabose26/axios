// UserManagement.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import UserForm from './UserForm';
import UserTable from './UserTable';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const User = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    id: null,
    name: '',
    email: '',
    username: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post(API_URL, userData);
      setUsers([...users, response.data]);
      handleClose();
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`${API_URL}/${userData.id}`, userData);
      const updatedUsers = users.map((user) =>
        user.id === userData.id ? userData : user
      );
      setUsers(updatedUsers);
      handleClose();
    } catch (error) {
      console.error('Error editing user: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const filteredUsers = users.filter((user) => user.id !== id);
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };

  const handleEditClick = (user) => {
    setUserData(user);
    handleOpen();
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      handleDelete(id);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Axios
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setUserData({ id: null, name: '', email: '', username: '' });
          handleOpen();
        }}
        style={{ marginBottom: '20px' }}
      >
        Add User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{userData.id ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <UserForm
            userData={userData}
            handleChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={userData.id ? handleEdit : handleAdd}
            color="primary"
          >
            {userData.id ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <UserTable
        users={users}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
    </Container>
  );
};

export default User;
