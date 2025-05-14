const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const requestResumeDownload = async (email: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/request-resume`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to request resume download');
  }

  return data;
};

export const downloadResume = async (token: string): Promise<Blob> => {
  const response = await fetch(`${API_URL}/download-resume/${token}`, {
    method: 'GET',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to download resume');
  }

  return response.blob();
};
