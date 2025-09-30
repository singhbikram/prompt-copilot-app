import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { Container, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';

const InventoryUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('http://localhost:5000/inventory/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Inventory uploaded successfully!');
    } catch (err) {
      setMessage('Upload failed');
    }
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>Upload Inventory (Excel)</Typography>
        <form onSubmit={handleUpload}>
          <TextField type="file" inputProps={{ accept: '.xlsx' }} onChange={handleFileChange} fullWidth />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Upload</Button>
        </form>
        {message && <Typography color="primary" sx={{ mt: 2 }}>{message}</Typography>}
      </Container>
    </>
  );
};

export default InventoryUpload;
