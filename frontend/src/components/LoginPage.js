import React, { useState } from 'react';
import { Box, TextField, Link } from '@mui/material';
import PageContainer from './PageContainer';
import FormCard from './FormCard';
import StyledButton from './StyledButton';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      console.log('Login successful:', data);
      // TODO: Store user data/token in context or local storage
      navigate('/my-profile');
    } catch (error) {
      console.error('Login failed:', error);
      alert(error.message);
    }
  };

  return (
    <PageContainer headerVariant="landing" showProfile={false} maxWidth="sm">
      <FormCard title="Welcome">
        <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Box sx={{ mt: 3, mb: 2 }}>
            <StyledButton
              type="submit"
              fullWidth
              variant="standard"
            >
              Login
            </StyledButton>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Link
              href="/create-account"
              variant="body2"
              sx={{ textDecoration: 'none', cursor: 'pointer' }}
              onClick={(e) => {
                e.preventDefault();
                navigate('/create-account');
              }}
            >
              Create Account
            </Link>
            <Link
              href="#"
              variant="body2"
              sx={{ textDecoration: 'none', cursor: 'pointer' }}
              onClick={(e) => e.preventDefault()}
            >
              Forgot Password?
            </Link>
          </Box>
        </Box>
      </FormCard>
    </PageContainer>
  );
}

export default LoginPage;