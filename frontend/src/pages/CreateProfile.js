import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CreateProfile = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    major: '',
    gender: '',
    gradYear: '',
    gradSemester: '',
    university: '',
    phoneNumber: '',
    cohort: ''
  });

  const majors = [
    'Computer Science',
    'Mechanical Engineering',
    'Business'
  ];

  const genders = [
    'Male',
    'Female',
    'Non-Binary',
    'Prefer Not to Say'
  ];

  const semesters = ['Spring', 'Summer', 'Fall'];
  const years = Array.from({ length: 7 }, (_, i) => 2024 + i);

  const universities = [
    'None',
    'Ohio State University',
    'University of Cincinnati'
  ];

  const cohorts = [
    { value: 'A', label: 'Cohort A (Started first co-op in Fall of second year)' },
    { value: 'B', label: 'Cohort B (Started first co-op in Spring of second year)' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = value.slice(0, 10).replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    setFormData(prev => ({
      ...prev,
      phoneNumber: formatted
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.entries(formData).every(([key, value]) => {
      if (key === 'gradYear' || key === 'gradSemester') {
        return formData.gradYear && formData.gradSemester;
      }
      return value.trim() !== '';
    });

    if (isValid) {
      console.log('Profile data:', formData);
      navigate('/my-profile');
    } else {
      alert('Please fill in all fields before continuing.');
    }
  };

  const handleSidebarNavigation = (section) => {
    setIsSidebarOpen(false);
    switch(section) {
      case 'profile':
        navigate('/my-profile');
        break;
      case 'notifications':
        navigate('/notifications');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'report':
        navigate('/report-problem');
        break;
      default:
        break;
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    },
    main: {
      padding: '2rem 1rem',
      maxWidth: '800px',
      margin: '0 auto',
      marginTop: '80px'
    },
    content: {
      background: 'white',
      borderRadius: '12px',
      padding: '2.5rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#333',
      marginBottom: '0.5rem',
      textAlign: 'center'
    },
    subtitle: {
      fontSize: '1rem',
      color: '#666',
      textAlign: 'center',
      marginBottom: '2rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    formSection: {
      width: '100%'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.95rem',
      fontWeight: '600',
      color: '#333'
    },
    input: {
      padding: '0.75rem',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      backgroundColor: 'white'
    },
    select: {
      padding: '0.75rem',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      backgroundColor: 'white',
      cursor: 'pointer'
    },
    cohortInfo: {
      fontSize: '0.85rem',
      color: '#666',
      fontStyle: 'italic',
      marginTop: '0.5rem'
    },
    submitButton: {
      width: '100%',
      padding: '1rem',
      backgroundColor: '#4a90e2',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      marginTop: '1rem'
    },
    sidebar: {
      position: 'fixed',
      top: 0,
      right: isSidebarOpen ? 0 : '-25%',
      width: '25%',
      height: '100%',
      backgroundColor: 'white',
      boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.15)',
      transition: 'right 0.3s ease',
      zIndex: 1000
    },
    sidebarContent: {
      padding: '2rem 1.5rem',
      height: '100%'
    },
    sidebarClose: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'none',
      border: 'none',
      fontSize: '2rem',
      color: '#333',
      cursor: 'pointer',
      lineHeight: 1
    },
    sidebarNav: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginTop: '3rem'
    },
    sidebarButton: {
      padding: '1rem',
      background: 'none',
      border: 'none',
      textAlign: 'left',
      fontSize: '1.1rem',
      color: '#333',
      cursor: 'pointer',
      borderRadius: '8px',
      transition: 'background-color 0.2s ease'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
      display: isSidebarOpen ? 'block' : 'none'
    }
  };

  return (
    <div style={styles.container}>
      <Header onMenuClick={toggleSidebar} />
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarContent}>
          <button style={styles.sidebarClose} onClick={toggleSidebar}>×</button>
          <nav style={styles.sidebarNav}>
            <button 
              style={styles.sidebarButton} 
              onClick={() => handleSidebarNavigation('profile')}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              My Profile
            </button>
            <button 
              style={styles.sidebarButton} 
              onClick={() => handleSidebarNavigation('notifications')}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Notifications
            </button>
            <button 
              style={styles.sidebarButton} 
              onClick={() => handleSidebarNavigation('settings')}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Settings
            </button>
            <button 
              style={styles.sidebarButton} 
              onClick={() => handleSidebarNavigation('report')}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Report a Problem
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      <div style={styles.overlay} onClick={toggleSidebar}></div>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.content}>
          <h1 style={styles.title}>Create Your Profile</h1>
          <p style={styles.subtitle}>Let's get to know you better</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Name Section */}
            <div style={styles.formSection}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="firstName">First Name *</label>
                  <input
                    style={styles.input}
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="lastName">Last Name *</label>
                  <input
                    style={styles.input}
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Major Section */}
            <div style={styles.formSection}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="major">Major *</label>
                <select
                  style={styles.select}
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select your major</option>
                  {majors.map(major => (
                    <option key={major} value={major}>{major}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Gender Section */}
            <div style={styles.formSection}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="gender">Gender *</label>
                <select
                  style={styles.select}
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select your gender</option>
                  {genders.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Graduation Year Section */}
            <div style={styles.formSection}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="gradSemester">Graduation Semester *</label>
                  <select
                    style={styles.select}
                    id="gradSemester"
                    name="gradSemester"
                    value={formData.gradSemester}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select semester</option>
                    {semesters.map(semester => (
                      <option key={semester} value={semester}>{semester}</option>
                    ))}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="gradYear">Graduation Year *</label>
                  <select
                    style={styles.select}
                    id="gradYear"
                    name="gradYear"
                    value={formData.gradYear}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* University Section */}
            <div style={styles.formSection}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="university">Current University *</label>
                <select
                  style={styles.select}
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select your university</option>
                  {universities.map(uni => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone Number Section */}
            <div style={styles.formSection}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="phoneNumber">Phone Number *</label>
                <input
                  style={styles.input}
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="(123) 456-7890"
                  required
                />
              </div>
            </div>

            {/* Cohort Section */}
            <div style={styles.formSection}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="cohort">Cohort of Co-op *</label>
                <select
                  style={styles.select}
                  id="cohort"
                  name="cohort"
                  value={formData.cohort}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select your cohort</option>
                  {cohorts.map(cohort => (
                    <option key={cohort.value} value={cohort.value}>
                      {cohort.label}
                    </option>
                  ))}
                </select>
                <p style={styles.cohortInfo}>
                  Not sure? Cohort A started first co-op in Fall of second year, 
                  Cohort B started in Spring of second year.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div style={styles.formSection}>
              <button 
                type="submit" 
                style={styles.submitButton}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#357abd';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#4a90e2';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Save Changes & Continue
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateProfile;