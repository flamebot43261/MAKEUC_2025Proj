const API_URL = 'http://127.0.0.1:5000';

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Login failed');
  }

  return response.json();
};

export const createAccount = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Account creation failed');
  }

  return response.json();
};

export const getUser = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch user');
  }

  return response.json();
};

export const getAppointmentsByOwner = async (ownerId) => {
  const response = await fetch(`${API_URL}/coop-appointments/owner/${ownerId}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch appointments');
  }
  return response.json();
};

export const getAppointmentsByRequestor = async (requestorId) => {
  const response = await fetch(`${API_URL}/coop-appointments/requestor/${requestorId}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch appointments');
  }
  return response.json();
};