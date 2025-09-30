import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Container } from '@mui/material';
import axios from 'axios';

const ProductCatalog = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
  axios.get('/inventory')
    .then(res => setInventory(res.data))
    .catch(() => setInventory([]));
  }, []);

  return (
    <>
      <NavBar />
      <Container>
          <Typography variant="h4" gutterBottom>Product Catalog</Typography>
          <Grid container spacing={2}>
            {inventory.map(item => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.product.image || 'https://via.placeholder.com/140'}
                    alt={item.product.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{item.product.name}</Typography>
                    <Typography variant="body2">{item.product.description}</Typography>
                    <Typography variant="subtitle1">${item.product.price}</Typography>
                    <Typography variant="body2">Stock: {item.quantity}</Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>Add to Cart</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
      </Container>
    </>
  );
};

export default ProductCatalog;
