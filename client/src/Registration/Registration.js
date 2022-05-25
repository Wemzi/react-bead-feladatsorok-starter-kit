
import React, { useState } from 'react';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useRegisterMutation } from '../state/tasksApiSlice';
import { useDispatch } from 'react-redux';

export const Registration = () => {
  // create state variables for each input
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [register] = useRegisterMutation()
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await register({
        email,
        password,
        fullname:fullName
      }).unwrap();

      console.log(result);
      
    } catch (err) {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Full Name"
        variant="filled"
        required
        value={fullName}
        onChange={e => setFullName(e.target.value)}
      />
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
    </form>
  );
};