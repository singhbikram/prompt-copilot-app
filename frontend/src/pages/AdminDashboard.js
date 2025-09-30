import NavBar from '../components/NavBar';
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ sales: 0, users: 0, inventory: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/analytics/stats')
      .then(res => setStats(res.data))
      .catch(() => setStats({ sales: 0, users: 0, inventory: 0 }));
  }, []);

  return (
    <>
      <NavBar />
      <Container>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Sales</Typography>
            <Typography variant="h5">${stats.sales}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h5">{stats.users}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Inventory Items</Typography>
            <Typography variant="h5">{stats.inventory}</Typography>
          </Paper>
        </Grid>
      </Grid>
      </Container>
    </>
  );
};

export default AdminDashboard;
