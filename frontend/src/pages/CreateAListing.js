import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import PageContainer from '../components/PageContainer';

const CreateAListing = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    totalBedrooms: '',
    currentRoommates: '',
    totalBathrooms: '',
    additionalInfo: ''
  });

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleZipCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setFormData(prev => ({
      ...prev,
      zipCode: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.entries(formData).every(([key, value]) => {
      if (key === 'additionalInfo') return true; // Optional field
      return value.trim() !== '';
    });

    if (isValid) {
      console.log('Listing data:', formData);
      navigate('/my-profile');
    } else {
      alert('Please fill in all required fields before continuing.');
    }
  };

  const styles = {
    formSection: {
      width: '100%',
      marginBottom: '1.5rem'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem'
    },
    formRowThree: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr',
      gap: '1rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#666'
    },
    input: {
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      backgroundColor: 'white',
      fontFamily: 'inherit'
    },
    select: {
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontFamily: 'inherit'
    },
    textarea: {
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      backgroundColor: 'white',
      minHeight: '120px',
      resize: 'vertical',
      fontFamily: 'inherit'
    },
    helperText: {
      fontSize: '0.75rem',
      color: '#666',
      fontStyle: 'italic',
      marginTop: '0.25rem'
    },
    submitButton: {
      width: '100%',
      padding: '0.75rem 1.5rem',
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginTop: '1rem'
    }
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
        {/* Page Title */}
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold',
            color: '#333',
            mb: 3
          }}
        >
          Create A Listing
        </Typography>

        {/* Form Container */}
        <Paper 
          elevation={2}
          sx={{ 
            p: 3,
            borderRadius: 2
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#666',
              mb: 3,
              textAlign: 'center'
            }}
          >
            Share your space with potential roommates
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* Address Section */}
            <div style={styles.formSection}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="streetAddress">Street Address *</label>
                <input
                  style={styles.input}
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  placeholder="123 Main St, Apt 4B"
                  required
                />
              </div>
            </div>

            <div style={styles.formSection}>
              <div style={styles.formRowThree}>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="city">City *</label>
                  <input
                    style={styles.input}
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Cincinnati"
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="state">State *</label>
                  <select
                    style={styles.select}
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="zipCode">Zip Code *</label>
                  <input
                    style={styles.input}
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleZipCodeChange}
                    placeholder="45220"
                    maxLength="5"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bedrooms Section */}
            <div style={styles.formSection}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="totalBedrooms">Total Bedrooms *</label>
                <input
                  style={styles.input}
                  type="number"
                  id="totalBedrooms"
                  name="totalBedrooms"
                  value={formData.totalBedrooms}
                  onChange={handleInputChange}
                  placeholder="Enter number of bedrooms"
                  min="1"
                  required
                />
                <span style={styles.helperText}>Total number of bedrooms at this location</span>
              </div>
            </div>

            {/* Current Roommates Section */}
            <div style={styles.formSection}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="currentRoommates">Current Roommates *</label>
                <input
                  style={styles.input}
                  type="number"
                  id="currentRoommates"
                  name="currentRoommates"
                  value={formData.currentRoommates}
                  onChange={handleInputChange}
                  placeholder="Enter number of current roommates"
                  min="0"
                  required
                />
                <span style={styles.helperText}>How many roommates currently live here?</span>
              </div>
            </div>

            {/* Bathrooms Section */}
            <div style={styles.formSection}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="totalBathrooms">Total Bathrooms *</label>
                <input
                  style={styles.input}
                  type="number"
                  id="totalBathrooms"
                  name="totalBathrooms"
                  value={formData.totalBathrooms}
                  onChange={handleInputChange}
                  placeholder="Enter number of bathrooms"
                  min="1"
                  step="0.5"
                  required
                />
                <span style={styles.helperText}>You can use decimals (e.g., 1.5, 2.5)</span>
              </div>
            </div>

            {/* Additional Info Section */}
            <div style={styles.formSection}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="additionalInfo">Additional Information</label>
                <textarea
                  style={styles.textarea}
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  placeholder="Include amenities, utilities included in rent, parking info, pet policy, lease terms, etc."
                />
                <span style={styles.helperText}>Optional: Share any additional details about the property</span>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              style={styles.submitButton}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1565c0'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#1976d2'}
            >
              Save & Continue
            </button>
          </form>
        </Paper>
      </Box>
    </PageContainer>
  );
};

export default CreateAListing;