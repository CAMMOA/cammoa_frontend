import api from '../api';

export const uploadPostImages = async (postId, files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));
  await api.post(`/api/posts/${postId}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
