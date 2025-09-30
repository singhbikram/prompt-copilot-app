import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const Checkout = () => {
  const [card, setCard] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      // Example: Stripe payment intent
      const res = await axios.post('http://localhost:5000/payment/stripe', {
        amount: amount * 100, // Stripe expects cents
        currency: 'usd'
      });
      setMessage('Payment initiated!');
      // Integrate Stripe.js for real payment flow
    } catch (err) {
      setMessage('Payment failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>Checkout</Typography>
      <form onSubmit={handleCheckout}>
        <TextField label="Card Number" fullWidth margin="normal" value={card} onChange={e => setCard(e.target.value)} />
        <TextField label="Amount" fullWidth margin="normal" value={amount} onChange={e => setAmount(e.target.value)} />
        <Button type="submit" variant="contained" color="primary" fullWidth>Pay</Button>
      </form>
      {message && <Typography align="center" color="primary" sx={{ mt: 2 }}>{message}</Typography>}
    </Container>
  );
};

export default Checkout;
