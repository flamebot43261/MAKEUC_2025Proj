import React, { useState } from 'react';
import { Box, TextField, Link } from '@mui/material';
import PageContainer from './PageContainer';
import FormCard from './FormCard';
import StyledButton from './StyledButton';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../services/api';

function CreateAccountPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [cohort, setCohort] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const userData = {
      full_name: fullName,
      email,
      university,
      major,
      grad_year: gradYear,
      cohort,
      age,
      gender,
      phone_number: phoneNumber,
      password,
    };

    try {
      const newUser = await createAccount(userData);
      console.log('Account created successfully:', newUser);
      navigate(`/users/${newUser.id}`);
    } catch (error) {
      console.error('Account creation failed:', error);
      alert(error.message);
    }
  };

  return (
    <PageContainer headerVariant="landing" showProfile={false} maxWidth="sm">
      <FormCard title="Create Account">
        <Box component="form" onSubmit={handleCreateAccount} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="name"
            autoFocus
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="university"
            label="University"
            name="university"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="major"
            label="Major"
            name="major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="gradYear"
            label="Graduation Year"
            name="gradYear"
            type="number"
            value={gradYear}
            onChange={(e) => setGradYear(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="cohort"
            label="Cohort"
            name="cohort"
            value={cohort}
            onChange={(e) => setCohort(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="age"
            label="Age"
            name="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="gender"
            label="Gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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