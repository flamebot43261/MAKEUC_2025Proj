import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Checkbox,
  Button,
  Chip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

function ClassSelectionPage() {
  const navigate = useNavigate();
  
  // Placeholder classes with course codes
  const classes = [
    { id: 1, code: 'CS 101', name: 'Introduction to Computer Science', credits: 3 },
    { id: 2, code: 'CS 201', name: 'Data Structures', credits: 3 },
    { id: 3, code: 'CS 202', name: 'Algorithms', credits: 3 },
    { id: 4, code: 'CS 301', name: 'Database Systems', credits: 3 },
    { id: 5, code: 'CS 302', name: 'Software Engineering', credits: 3 },
    { id: 6, code: 'CS 401', name: 'Advanced Topics in AI', credits: 3 }
  ];

  const [selectedClasses, setSelectedClasses] = useState([]);

  const handleToggleClass = (classId) => {
    setSelectedClasses(prev => 
      prev.includes(classId)
        ? prev.filter(id => id !== classId)
        : [...prev, classId]
    );
  };

  const handleContinue = () => {
    console.log('Selected classes:', selectedClasses);
    // Navigate to next page or save selection
  };

  const totalCredits = classes
    .filter(cls => selectedClasses.includes(cls.id))
    .reduce((sum, cls) => sum + cls.credits, 0);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
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
            <Typography variant="h6" component="div">
              LOGO
            </Typography>
          </Box>
          
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md">
        <Box sx={{ marginTop: 6, marginBottom: 4 }}>
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              mb: 2, 
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#1976d2'
            }}
          >
            Select classes you have taken already:
          </Typography>
          
          {/* Summary Chip */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Chip 
              icon={<CheckCircleIcon />}
              label={`${selectedClasses.length} classes selected • ${totalCredits} credits`}
              color="primary"
              variant="outlined"
              sx={{ fontSize: '1rem', py: 2.5, px: 1 }}
            />
          </Box>

          {/* Class List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {classes.map((cls) => (
              <Paper
                key={cls.id}
                elevation={selectedClasses.includes(cls.id) ? 4 : 1}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: selectedClasses.includes(cls.id) 
                    ? '2px solid #1976d2' 
                    : '2px solid transparent',
                  backgroundColor: selectedClasses.includes(cls.id) 
                    ? '#e3f2fd' 
                    : 'white',
                  '&:hover': {
                    elevation: 3,
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  },
                  minHeight: '80px'
                }}
                onClick={() => handleToggleClass(cls.id)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    checked={selectedClasses.includes(cls.id)}
                    onChange={() => handleToggleClass(cls.id)}
                    sx={{ mr: 2 }}
                    color="primary"
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: '#333',
                        fontSize: '1.2rem',
                        mb: 0.5
                      }}
                    >
                      {cls.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#666'
                      }}
                    >
                      {cls.code}
                    </Typography>
                  </Box>
                  <Chip 
                    label={`${cls.credits} credits`}
                    size="small"
                    sx={{ 
                      backgroundColor: selectedClasses.includes(cls.id) 
                        ? '#1976d2' 
                        : '#e0e0e0',
                      color: selectedClasses.includes(cls.id) 
                        ? 'white' 
                        : '#555'
                    }}
                  />
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Continue Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleContinue}
              disabled={selectedClasses.length === 0}
              sx={{ 
                px: 6, 
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ClassSelectionPage;