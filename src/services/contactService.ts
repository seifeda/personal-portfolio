interface ContactFormData {
  name: string;
  email: string;
  message: string;
  recaptchaToken: string;
}

export const sendContactMessage = async (data: ContactFormData): Promise<{ message: string }> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.message || 'Failed to send message');
  }

  return result;
};
