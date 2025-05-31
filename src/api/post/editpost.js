import api from '@api/api';

export const getPostDetail = (postId) => {
  return api.get(`/api/posts/${postId}`);
};

export const updatePost = (postId, postData) => {
  return api.patch(`/api/posts/${postId}`, postData);
};

export const uploadPostImages = (postId, formData) => {
  return api.post(`/api/posts/${postId}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deletePostImage = (postId, imageUrl) => {
  return api.delete(`/api/posts/${postId}/images`, {
    data: { imageUrl },
  });
};
