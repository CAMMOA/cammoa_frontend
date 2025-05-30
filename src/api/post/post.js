import api from '@api/api';

export const createPost = (postData) => api.post('/api/posts', postData);

export const uploadPostImages = (postId, formData) =>
  api.post(`/api/posts/${postId}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updatePostMainImage = (postId, imageUrl) =>
  api.patch(`/api/posts/${postId}`, { image: imageUrl });
