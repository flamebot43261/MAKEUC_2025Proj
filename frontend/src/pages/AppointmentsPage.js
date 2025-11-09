import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styling for the calendar
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import PageContainer from '../components/PageContainer';
import { getAppointmentsByOwner, getAppointmentsByRequestor } from '../services/api';

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) return;

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const ownedPromise = getAppointmentsByOwner(userId);
        const requestedPromise = getAppointmentsByRequestor(userId);
        
        const [owned, requested] = await Promise.all([ownedPromise, requestedPromise]);
        
        setAppointments([...owned, ...requested]);
        setError('');
      } catch (err) {
        setError(err.message);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  const getAppointmentsForDate = (date) => {
    return appointments.filter(app => {
      const appDate = new Date(app.appointment_date);
      return appDate.getFullYear() === date.getFullYear() &&
             appDate.getMonth() === date.getMonth() &&
             appDate.getDate() === date.getDate();
    });
  };

  const selectedDateAppointments = getAppointmentsForDate(selectedDate);

  return (
    <PageContainer headerVariant="main" showProfile={true} userId={userId}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Appointments
        </Typography>
        {loading && <Typography>Loading appointments...</Typography>}
        {error && <Typography color="error">Error: {error}</Typography>}
        <Paper elevation={3} sx={{ p: 2, display: 'flex', gap: 2 }}>
          <Box>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={({ date, view }) => {
                if (view === 'month' && getAppointmentsForDate(date).length > 0) {
                  return <Box sx={{ height: '8px', width: '8px', bgcolor: 'primary.main', borderRadius: '50%', margin: 'auto', mt: '2px' }} />;
                }
              }}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">Appointments for {selectedDate.toDateString()}</Typography>
            {selectedDateAppointments.length > 0 ? (
              <List>
                {selectedDateAppointments.map(app => (
                  <ListItem key={app.id}>
                    <ListItemText 
                      primary={`Appointment with ${app.owner_id === parseInt(userId) ? 'Requestor' : 'Owner'} ID: ${app.owner_id === parseInt(userId) ? app.requestor_id : app.owner_id}`}
                      secondary={`Status: ${app.status}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No appointments for this day.</Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </PageContainer>
  );
}

export default AppointmentsPage;