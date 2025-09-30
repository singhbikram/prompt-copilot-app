import NavBar from '../components/NavBar';
import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const InventoryReport = () => {
  const [report, setReport] = useState({ totalProducts: 0, lowStock: [] });

  useEffect(() => {
    axios.get('http://localhost:5000/inventory/report')
      .then(res => setReport(res.data))
      .catch(() => setReport({ totalProducts: 0, lowStock: [] }));
  }, []);

  return (
    <>
      <NavBar />
      <Container>
      <Typography variant="h4" gutterBottom>Inventory Report</Typography>
      <Typography variant="h6">Total Products: {report.totalProducts}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Low Stock Items:</Typography>
      <List>
        {report.lowStock.map(item => (
          <ListItem key={item._id}>
            <ListItemText
              primary={item.product?.name}
              secondary={`Quantity: ${item.quantity}`}
            />
          </ListItem>
        ))}
      </List>
      {/* Add chart/forecast UI here as needed */}
      </Container>
    </>
  );
};

export default InventoryReport;
