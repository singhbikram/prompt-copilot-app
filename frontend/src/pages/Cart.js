import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    // Replace with actual user token logic
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/cart', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCart(res.data))
      .catch(() => setCart({ items: [] }));
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
        <List>
          {cart.items.map(item => (
            <ListItem key={item.product._id}>
              <ListItemText
                primary={item.product.name}
                secondary={`Quantity: ${item.quantity}`}
              />
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="primary" href="/checkout">Proceed to Checkout</Button>
      </Container>
    </>
  );
};

export default Cart;
