const API_BASE_URL = 'http://localhost:5000/admin';

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  return await response.json();
};

export const getAssessments = async () => {
  const response = await fetch(`${API_BASE_URL}/assessments`);
  return await response.json();
};

export const getStats = async () => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  return await response.json();
};