import NavBar from '../../components/NavBar';
import { Typography, Button, Container } from '@mui/material'
import React from 'react'
import { useIntl } from 'react-intl'

const HomePage = () => {
  const intl = useIntl()
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  return (
    <>
      <NavBar />
      <Container>
      <Typography variant="h4" gutterBottom>{intl.formatMessage({ id: 'home' })}</Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to the e-commerce app! Browse products, sign in, or create a new account to get started.
      </Typography>
      {!isLoggedIn && (
        <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
          <Button variant="contained" color="primary" href="/signin">Sign In</Button>
          <Button variant="outlined" color="primary" href="/signup">Sign Up</Button>
        </div>
      )}
      </Container>
    </>
  )
}
export default HomePage
