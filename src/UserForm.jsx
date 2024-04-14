// UserForm.js

import React from 'react';
import { TextField } from '@mui/material';

const UserForm = ({ userData, handleChange }) => {
  return (
    <div>
      <TextField
        autoFocus
        margin="dense"
        name="name"
        label="Name"
        type="text"
        fullWidth
        value={userData.name}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        name="email"
        label="Email"
        type="email"
        fullWidth
        value={userData.email}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        name="username"
        label="Username"
        type="text"
        fullWidth
        value={userData.username}
        onChange={handleChange}
      />
    </div>
  );
};

export default UserForm;
