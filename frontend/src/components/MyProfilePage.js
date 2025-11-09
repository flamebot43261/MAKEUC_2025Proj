import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Avatar } from '@mui/material';
import PageContainer from './PageContainer';
import { getUser } from '../services/api';

function MyProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await getUser(userId);
        setUser(userData);
        setError('');
      } catch (err) {
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <PageContainer><Typography>Loading profile...</Typography></PageContainer>;
  }

  if (error) {
    return <PageContainer><Typography color="error">Error: {error}</Typography></PageContainer>;
  }

  if (!user) {
    return <PageContainer><Typography>No user profile found.</Typography></PageContainer>;
  }

  return (
    <PageContainer headerVariant="landing" showProfile={false}>
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}>
                {user.full_name ? user.full_name.charAt(0) : 'U'}
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h4" component="h1" gutterBottom>
                {user.full_name || 'N/A'}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {user.university || 'N/A'} - Class of {user.grad_year || 'N/A'}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>Profile Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><Typography><strong>Email:</strong> {user.email}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography><strong>Phone:</strong> {user.phone_number || 'N/A'}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography><strong>Major:</strong> {user.major || 'N/A'}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography><strong>Gender:</strong> {user.gender || 'N/A'}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography><strong>Age:</strong> {user.age || 'N/A'}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography><strong>Cohort:</strong> {user.cohort || 'N/A'}</Typography></Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </PageContainer>
  );
}

export default MyProfilePage;