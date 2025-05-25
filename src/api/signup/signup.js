import api from '@api/api';

export const signup = async ({ nickname, password, confirmPassword, username, email }) => {
  const response = await api.post('/api/auth/signup', {
    nickname,
    password,
    confirmPassword,
    username,
    email,
  });

  return response.data;
};
