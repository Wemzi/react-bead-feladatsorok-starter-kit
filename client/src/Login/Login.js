
import React, { useState } from 'react';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { login } from '../state/authSlice';
import { useLoginMutation } from '../state/tasksApiSlice';
import { useDispatch } from 'react-redux';

export const Login = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [authLogin] = useLoginMutation()
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await authLogin({
        strategy: "local",
        email,
        password
      }).unwrap();

      console.log(result);

      dispatch(
        login({
          user: result.user,
          token: result.accessToken,
        })
      );
    } catch (err) {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          Login
        </Button>
      </div>
    </form>
  );
};