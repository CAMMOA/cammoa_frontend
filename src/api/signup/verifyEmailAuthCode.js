import api from '@api/api';

export const verifyEmailAuthCode = async ({ email, authCode }) => {
  const response = await api.post('/api/auth/signup/email/verify', {
    email,
    authCode,
  });
  return response.data;
};
