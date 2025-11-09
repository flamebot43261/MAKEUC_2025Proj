import React, { useState } from 'react';
import { Box, TextField, Link } from '@mui/material';
import PageContainer from './PageContainer';
import FormCard from './FormCard';
import StyledButton from './StyledButton';
import { useNavigate } from 'react-router-dom';

function CreateAccountPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = (e) => {
    e.preventDefault();
    console.log('Account creation attempted with:', username, email, password);
  };

  return (
    <PageContainer headerVariant="landing" showProfile={false} maxWidth="sm">
      <FormCard title="Create Account">
        <Box component="form" onSubmit={handleCreateAccount} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Box sx={{ mt: 3, mb: 2 }}>
            <StyledButton
              type="submit"
              fullWidth
              variant="standard"
            >
              Create Account
            </StyledButton>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Link
              href="/login"
              variant="body2"
              sx={{ textDecoration: 'none', cursor: 'pointer' }}
              onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}
            >
              Already have an account? Login
            </Link>
          </Box>
        </Box>
      </FormCard>
    </PageContainer>
  );
}

export default CreateAccountPage;