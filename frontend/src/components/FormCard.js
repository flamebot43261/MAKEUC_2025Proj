import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

function FormCard({ title, children, maxWidth = '100%' }) {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth
        }}
      >
        {title && (
          <Typography component="h1" variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
            {title}
          </Typography>
        )}
        {children}
      </Paper>
    </Box>
  );
}

export default FormCard;