const API_BASE_URL = 'http://localhost:5000/admin';

const fetchWithCors = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const getUsers = async () => {
  return await fetchWithCors(`${API_BASE_URL}/users`);
};

export const getAssessments = async () => {
  return await fetchWithCors(`${API_BASE_URL}/assessments`);
};

export const getStats = async () => {
  return await fetchWithCors(`${API_BASE_URL}/stats`);
};

export const getChartData = async () => {
  return await fetchWithCors(`${API_BASE_URL}/charts`);
};

export const getTodos = async () => {
  return await fetchWithCors(`${API_BASE_URL}/todos`);
};

export const getReports = async () => {
  return await fetchWithCors(`${API_BASE_URL}/reports`);
};