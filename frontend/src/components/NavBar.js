import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/productcatalog">Catalog</Button>
        <Button color="inherit" component={Link} to="/cart">Cart</Button>
        <Button color="inherit" component={Link} to="/orders">Orders</Button>
        <Button color="inherit" component={Link} to="/inventory/upload">Upload Inventory</Button>
        <Button color="inherit" component={Link} to="/inventory/report">Inventory Report</Button>
        <Button color="inherit" component={Link} to="/admin">Admin</Button>
        <Button color="inherit" component={Link} to="/localization">Localization</Button>
        <Button color="inherit" component={Link} to="/chatbot">Chatbot</Button>
        <Button color="inherit" component={Link} to="/myaccount">My Account</Button>
        {isLoggedIn && (
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
