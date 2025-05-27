import api from '../api';

export const createPost = async (postData) => {
  const response = await api.post('/api/posts', postData, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data.data;
};
