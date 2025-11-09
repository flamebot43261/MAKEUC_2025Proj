import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

function MyProfilePage() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  
  // Mock user data
  const userData = {
    name: 'John Doe',
    age: 21,
    university: 'University of Cincinnati',
    cohort: 'A',
    graduationYear: 2026,
    major: 'Computer Science',
    gender: 'Male',
    phoneNumber: '(555) 123-4567'
  };

  const userListing = null;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCreateListing = () => {
    console.log('Navigate to create listing page');
  };

  return (
    <PageContainer 
      headerVariant="landing" 
      showProfile={false} 
      maxWidth="md"
      backgroundColor="#f8f9fa"
      isAuthenticated={true}
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
              {userData.name}
            </Typography>
            <Typography variant="h6" sx={{ color: '#666' }}>
              {userData.age}
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
                {userData.university}
              </Typography>
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                Cohort
              </Typography>
              <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
                {userData.cohort}
              </Typography>
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                Graduation Year
              </Typography>
              <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
                {userData.graduationYear}
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
                  {userData.major}
                </Typography>
              </Box>

              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                  Gender
                </Typography>
                <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
                  {userData.gender}
                </Typography>
              </Box>

              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                  Phone Number
                </Typography>
                <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
                  {userData.phoneNumber}
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