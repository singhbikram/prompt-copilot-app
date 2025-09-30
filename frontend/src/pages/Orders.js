import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Replace with actual user token logic
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(() => setOrders([]));
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <Typography variant="h4" gutterBottom>Order History</Typography>
        <List>
          {orders.map(order => (
            <ListItem key={order._id}>
              <ListItemText
                primary={`Order #${order._id}`}
                secondary={`Status: ${order.status} | Total: $${order.total}`}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default Orders;
