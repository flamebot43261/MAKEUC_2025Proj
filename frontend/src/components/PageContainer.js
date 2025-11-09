import React from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';

function PageContainer({ 
  children, 
  headerVariant = 'default', 
  showProfile = false,
  maxWidth = 'md',
  backgroundColor = '#f5f5f5',
  isAuthenticated = false,
  userId
}) {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor }}>
      <Header variant={headerVariant} showProfile={showProfile} isAuthenticated={isAuthenticated} userId={userId} />
      <Container maxWidth={maxWidth}>
        {children}
      </Container>
    </Box>
  );
}

export default PageContainer;