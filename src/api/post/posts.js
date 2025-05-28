import api from '@api/api';

export const createPost = async (postData) => {
  try {
    const response = await api.post('/api/posts', postData);
    return response.data;
  } catch (error) {
    console.error('▶ 서버 에러 응답 status, data:', error.response?.status, error.response?.data);
    throw error;
  }
};
