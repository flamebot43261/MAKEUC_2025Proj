import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

function Header({ variant = 'default', showProfile = false, isAuthenticated = false }) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Add logout logic here
    setDrawerOpen(false);
    navigate('/');
  };

  // Sidebar content for authenticated users
  const authenticatedMenuItems = [
    { text: 'My Profile', icon: <PersonIcon />, action: () => handleNavigation('/my-profile') },
    { text: 'Notifications', icon: <NotificationsIcon />, action: () => handleNavigation('/notifications') },
    { text: 'Settings', icon: <SettingsIcon />, action: () => handleNavigation('/settings') },
    { text: 'Report a Problem', icon: <ReportProblemIcon />, action: () => handleNavigation('/report-problem') },
  ];

  // Sidebar content for non-authenticated users (landing/login pages)
  const guestMenuItems = [
    { text: 'Login', icon: <LoginIcon />, action: () => handleNavigation('/login') },
    { text: 'Create Account', icon: <PersonAddIcon />, action: () => handleNavigation('/create-account') },
  ];

  const menuItems = isAuthenticated ? authenticatedMenuItems : guestMenuItems;

  // Landing page variant - white background with navigation links
  if (variant === 'landing') {
    return (
      <>
        <AppBar 
          position="static" 
          sx={{ 
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            py: 0.5
          }}
        >
          <Toolbar sx={{ minHeight: '60px' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#1976d2',
                fontWeight: 'bold',
                cursor: 'pointer',
                mr: 'auto'
              }}
              onClick={() => navigate('/')}
            >
              LOGO
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, mr: 4 }}>
              <Button
                sx={{
                  color: '#333',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  '&:hover': {
                    color: '#1976d2',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                Find Listing
              </Button>
              <Button
                onClick={() => navigate('/login')}
                sx={{
                  color: '#333',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  '&:hover': {
                    color: '#1976d2',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                Create Listing
              </Button>
            </Box>

            <IconButton
              edge="end"
              onClick={toggleDrawer(true)}
              sx={{ color: '#333' }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Enhanced Sidebar Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: 280,
              backgroundColor: '#f8f9fa',
            }
          }}
        >
          <Box
            sx={{ width: 280 }}
            role="presentation"
          >
            {/* Drawer Header */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                p: 2,
                backgroundColor: '#1976d2',
                color: 'white'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'white', color: '#1976d2' }}>
                  {isAuthenticated ? 'JD' : <AccountCircleIcon />}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {isAuthenticated ? 'John Doe' : 'Menu'}
                </Typography>
              </Box>
              <IconButton 
                onClick={toggleDrawer(false)}
                sx={{ color: 'white' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Divider />

            {/* Menu Items */}
            <List sx={{ pt: 2 }}>
              {menuItems.map((item, index) => (
                <ListItem 
                  button 
                  key={index}
                  onClick={item.action}
                  sx={{
                    py: 1.5,
                    px: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: '#e3f2fd',
                      transform: 'translateX(-5px)',
                      '& .MuiListItemIcon-root': {
                        color: '#1976d2',
                      },
                      '& .MuiListItemText-primary': {
                        color: '#1976d2',
                        fontWeight: 600
                      }
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 45, color: '#666', transition: 'color 0.2s ease' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '1rem',
                      fontWeight: 500
                    }}
                  />
                </ListItem>
              ))}
            </List>

            {/* Logout Button (only for authenticated users) */}
            {isAuthenticated && (
              <>
                <Divider sx={{ mt: 'auto' }} />
                <List>
                  <ListItem 
                    button 
                    onClick={handleLogout}
                    sx={{
                      py: 1.5,
                      px: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: '#ffebee',
                        transform: 'translateX(-5px)',
                        '& .MuiListItemIcon-root': {
                          color: '#d32f2f',
                        },
                        '& .MuiListItemText-primary': {
                          color: '#d32f2f',
                          fontWeight: 600
                        }
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 45, color: '#666', transition: 'color 0.2s ease' }}>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Logout"
                      primaryTypographyProps={{
                        fontSize: '1rem',
                        fontWeight: 500
                      }}
                    />
                  </ListItem>
                </List>
              </>
            )}
          </Box>
        </Drawer>
      </>
    );
  }

  // Default variant - blue background with centered logo
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography 
            variant="h6" 
            component="div"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            LOGO
          </Typography>
        </Box>
        
        {showProfile && (
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;