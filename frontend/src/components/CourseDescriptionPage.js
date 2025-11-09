import React from 'react';
import {
  Box,
  Typography,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function CourseDescriptionPage() {
  const placeholderPeople = [
    'Sarah Johnson',
    'Michael Chen',
    'Emily Rodriguez',
    'David Kim',
    'Jessica Martinez',
    'Ryan Thompson'
  ];

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
          {/* Course Title and Number */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              component="h1" 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold',
                color: '#1976d2',
                mb: 0.5
              }}
            >
              Introduction to Computer Science
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#666',
                mt: 0.5
              }}
            >
              CS 101
            </Typography>
          </Box>

          {/* Course Description Section */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#333',
                mb: 2
              }}
            >
              Course Description:
            </Typography>
            <Paper sx={{ p: 3 }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#555',
                  lineHeight: 1.8
                }}
              >
                This course provides a comprehensive introduction to the fundamental concepts 
                of computer science and programming. Students will learn problem-solving 
                techniques, algorithm design, and basic programming principles using modern 
                programming languages. Topics include data structures, control flow, functions, 
                and object-oriented programming concepts. No prior programming experience is 
                required. By the end of this course, students will be able to design, implement, 
                and debug programs to solve real-world problems.
              </Typography>
            </Paper>
          </Box>

          {/* People Section */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold',
                color: '#333',
                mb: 2
              }}
            >
              People you may know taking this class with you:
            </Typography>
            <Paper sx={{ overflow: 'hidden' }}>
              <List sx={{ p: 0 }}>
                {placeholderPeople.map((person, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ py: 2 }}>
                      <ListItemText 
                        primary={person}
                        primaryTypographyProps={{
                          fontSize: '1.1rem',
                          color: '#333'
                        }}
                      />
                    </ListItem>
                    {index < placeholderPeople.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default CourseDescriptionPage;