import NavBar from '../components/NavBar';
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/register', { name, email, password });
      setSuccess('Registration successful! You can now login.');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      setSuccess('');
    }
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>Register</Typography>
      <form onSubmit={handleRegister}>
        <TextField label="Name" fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} />
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
      </form>
      <Button href="/login" color="secondary" fullWidth sx={{ mt: 2 }}>Login</Button>
      </Container>
    </>
  );
};

export default Register;
