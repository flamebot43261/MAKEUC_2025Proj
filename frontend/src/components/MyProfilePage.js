import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Collapse,
  Link,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import PageContainer from './PageContainer';
import { getUser } from '../services/api';

function MyProfilePage() {
  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();

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
  
  const userListing = null; // TODO: Replace with actual listing data fetching

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCreateListing = () => {
    navigate('/create-listing');
  };

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
    <PageContainer 
      headerVariant="landing" 
      showProfile={false} 
      userId={userId}
      maxWidth="md"
      backgroundColor="#f8f9fa"
    >
      <Box sx={{ py: 4 }}>
        {/* My Profile Title */}
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold',
            color: '#333',
            mb: 3
          }}
        >
          My Profile
        </Typography>

        {/* Profile Container */}
        <Paper 
          elevation={2}
          sx={{ 
            p: 3,
            mb: 4,
            borderRadius: 2
          }}
        >
          {/* Name and Age */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
              {user.full_name}
            </Typography>
            <Typography variant="h6" sx={{ color: '#666' }}>
              {user.age}
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Basic Info List */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ mb: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                University
              </Typography>
              <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
                {user.university}
              </Typography>
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                Cohort
              </Typography>
              <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
                {user.cohort}
              </Typography>
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                Graduation Year
              </Typography>
              <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
                {user.grad_year}
              </Typography>
            </Box>
          </Box>

          {/* Expandable Section */}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                  Major
                </Typography>
                <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
                  {user.major}
                </Typography>
              </Box>

              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                  Gender
                </Typography>
                <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
                  {user.gender}
                </Typography>
              </Box>

              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                  Phone Number
                </Typography>
                <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
                  {user.phone_number}
                </Typography>
              </Box>
            </Box>
          </Collapse>

          {/* View More/Less Link */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              component="button"
              variant="body2"
              onClick={handleExpandClick}
              sx={{
                textDecoration: 'none',
                color: '#1976d2',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              {expanded ? (
                <>
                  View Less <ExpandLessIcon sx={{ ml: 0.5, fontSize: '1.2rem' }} />
                </>
              ) : (
                <>
                  View More <ExpandMoreIcon sx={{ ml: 0.5, fontSize: '1.2rem' }} />
                </>
              )}
            </Link>
          </Box>
        </Paper>

        {/* My Listing Section */}
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold',
            color: '#333',
            mb: 3
          }}
        >
          My Listing
        </Typography>

        <Paper 
          elevation={2}
          sx={{ 
            p: 3,
            borderRadius: 2,
            minHeight: '150px'
          }}
        >
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100px',
              mb: 2
            }}
          >
            {userListing ? (
              // Display listing if exists
              <Box sx={{ width: '100%' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
                  {userListing.title}
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', mb: 0.5 }}>
                  Location: {userListing.location}
                </Typography>
                <Typography variant="body1" sx={{ color: '#666' }}>
                  Rent: {userListing.rent}
                </Typography>
              </Box>
            ) : (
              // Display "No listing yet..." if no listing
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#999',
                  fontStyle: 'italic'
                }}
              >
                No listing yet...
              </Typography>
            )}
          </Box>

          {/* Create Listing Link */}
          {!userListing && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link
                component="button"
                variant="body2"
                onClick={handleCreateListing}
                sx={{
                  textDecoration: 'none',
                  color: '#1976d2',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Create Listing <AddIcon sx={{ ml: 0.5, fontSize: '1.2rem' }} />
              </Link>
            </Box>
          )}
        </Paper>
      </Box>
    </PageContainer>
  );
}

export default MyProfilePage;