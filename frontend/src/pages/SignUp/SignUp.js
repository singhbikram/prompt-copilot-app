import NavBar from '../../components/NavBar';
import { Button, TextField, Typography, Container } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useTheme } from '@mui/material/styles'
// import CustomPaper from '../../components/CustomPaper'

const SignUp = ({ redirectTo = '/' }) => {
  const intl = useIntl()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    try {
      const res = await axios.post('http://localhost:5000/auth/register', {
        name: username,
        email: userEmail,
        password
      })
      if (res.data && res.data.success !== false) {
        let from = new URLSearchParams(location.search).get('from');
        if (from) {
          navigate(from, { replace: true });
        } else {
          navigate(redirectTo, { replace: true });
        }
      } else {
        setError(res.data.error || 'Registration failed')
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
    }
  }


  return (
    <>
      <NavBar />
      <Container maxWidth="xs">
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
          {intl.formatMessage({ id: 'sign_up', defaultMessage: 'Sign up' })}
        </Typography>
        <form
          style={{ marginTop: theme.spacing(1) }}
          onSubmit={handleSubmit}
          noValidate
        >
          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <TextField
            value={username}
            onInput={(e) => setUsername(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label={intl.formatMessage({
              id: 'username',
              defaultMessage: 'Username',
            })}
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            value={userEmail}
            onInput={(e) => setUserEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={intl.formatMessage({
              id: 'email',
              defaultMessage: 'E-Mail',
            })}
            name="email"
            autoComplete="email"
          />
          <TextField
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={intl.formatMessage({
              id: 'password',
              defaultMessage: 'Password',
            })}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            value={confirmPassword}
            onInput={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password_confirm"
            label={intl.formatMessage({
              id: 'password_confirm',
              defaultMessage: 'Confirm Password',
            })}
            type="password"
            id="password_confirm"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: theme.spacing(3, 0, 2) }}
          >
            {intl.formatMessage({ id: 'sign_up', defaultMessage: 'Sign up' })}
          </Button>
        </form>
      </div>
      </Container>
    </>
  )
}

export default SignUp
