import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Header from './Header';
import StyledButton from './StyledButton';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header variant="landing" />

      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 80px)',
            textAlign: 'center',
            py: 4
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '3rem', md: '4.5rem' },
              color: '#1976d2',
              mb: 3
            }}
          >
            LOGO
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: '#555',
              maxWidth: '600px',
              mb: 5,
              lineHeight: 1.6,
              fontSize: { xs: '1.1rem', md: '1.4rem' }
            }}
          >
            Connect with your perfect roommate. Find listings, create your own, 
            and discover compatible living situations tailored to your lifestyle 
            and preferences.
          </Typography>

          <StyledButton 
            variant="primary"
            onClick={() => navigate('/login')}
          >
            Get Started
          </StyledButton>
        </Box>
      </Container>
    </Box>
  );
}

export default LandingPage;