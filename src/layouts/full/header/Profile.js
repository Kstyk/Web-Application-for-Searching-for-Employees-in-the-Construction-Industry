import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import { IconListCheck, IconMail, IconUser } from '@tabler/icons';

import ProfileImg from 'src/assets/images/profile/user-1.jpg';

import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5072/api',
});

const Profile = () => {
  const { isLoggedIn, logout, userRole } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();

    logout();
  };

  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  if (!isLoggedIn) {
    return (
      <Link to="/auth/login">Zaloguj się</Link>
    )
  }

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <MenuItem component={Link} to={`/my-profile`}>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>Mój profil</ListItemText>
        </MenuItem>
        {userRole == 1 &&
          <MenuItem component={Link} to="/saved-profiles">
            <ListItemIcon>
              <IconMail width={20} />
            </ListItemIcon>
            <ListItemText>Zapisane profile</ListItemText>
          </MenuItem>
        }
        <MenuItem component={Link} to="/mail-history">
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>Historia zaproszeń</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button onClick={handleLogout} to="/auth/login" variant="outlined" color="primary" component={Link} fullWidth>
            Wyloguj
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
