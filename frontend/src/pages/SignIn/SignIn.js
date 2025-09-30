import NavBar from '../../components/NavBar';
import { Button, TextField, Typography, Container, Paper, Alert } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignIn = ({ redirectTo = '/' }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    axios.post('/auth/login', {
      email,
      password
    })
    .then(res => {
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      navigate('/productcatalog', { replace: true })
    })
    .catch(err => {
      setError('Invalid username or password')
    })
  }

  return (
    <>
      <NavBar />
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ padding: 2, marginTop: 4 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: `100%`,
          }}
        >
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
          <form
            style={{ marginTop: 16 }}
            onSubmit={handleSubmit}
            noValidate
          >
            <TextField
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ margin: '24px 0 16px' }}
            >
              Sign In
            </Button>
          </form>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Link to="/password_reset">
              Forgot Password?
            </Link>
            <Link to="/signup">
              Register
            </Link>
          </div>
        </div>
        </Paper>
      </Container>
    </>
  )
}

export default SignIn
