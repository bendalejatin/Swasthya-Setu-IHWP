const API_BASE_URL = 'http://localhost:5000/api';

export const saveAssessment = async (assessmentData) => {
  try {
    console.log('Sending assessment data:', assessmentData);
    const response = await fetch(`${API_BASE_URL}/assessment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assessmentData),
    });
    
    const result = await response.json();
    console.log('Assessment response:', result);
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to save assessment');
    }
    
    return result;
  } catch (error) {
    console.error('Error saving assessment:', error);
    throw error;
  }
};

export const getUserAssessments = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/assessment/${userId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching assessments:', error);
    throw error;
  }
};