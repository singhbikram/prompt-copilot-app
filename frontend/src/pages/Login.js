import NavBar from '../components/NavBar';
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
      </form>
      <Button href="/register" color="secondary" fullWidth sx={{ mt: 2 }}>Register</Button>
      <Button href="http://localhost:5000/auth/google" fullWidth sx={{ mt: 2 }}>Login with Google</Button>
      <Button href="http://localhost:5000/auth/facebook" fullWidth sx={{ mt: 2 }}>Login with Facebook</Button>
      </Container>
    </>
  );
};

export default Login;
