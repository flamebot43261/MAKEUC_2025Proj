import React from 'react';
import { Button } from '@mui/material';

function StyledButton({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  onClick,
  disabled = false,
  type = 'button',
  size = 'large'
}) {
  const styles = {
    primary: {
      backgroundColor: '#1976d2',
      color: 'white',
      px: 6,
      py: 2,
      fontSize: size === 'large' ? '1.2rem' : '1rem',
      fontWeight: 'bold',
      borderRadius: '50px',
      textTransform: 'none',
      boxShadow: '0 4px 14px rgba(25, 118, 210, 0.4)',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#1565c0',
        transform: 'translateY(-3px)',
        boxShadow: '0 6px 20px rgba(25, 118, 210, 0.6)',
      },
      '&:active': {
        transform: 'translateY(-1px)',
      },
      '&:disabled': {
        backgroundColor: '#ccc',
        transform: 'none',
      }
    },
    secondary: {
      backgroundColor: 'transparent',
      color: '#1976d2',
      border: '2px solid #1976d2',
      px: 4,
      py: 1.5,
      fontWeight: 'bold',
      borderRadius: '50px',
      textTransform: 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#1976d2',
        color: 'white',
        transform: 'translateY(-2px)',
      }
    },
    standard: {
      py: 1.5,
      textTransform: 'none'
    }
  };

  return (
    <Button
      variant={variant === 'standard' ? 'contained' : 'contained'}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      type={type}
      size={size}
      sx={styles[variant]}
    >
      {children}
    </Button>
  );
}

export default StyledButton;