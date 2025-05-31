import api from '@api/api';

export const getCurrentUser = () => {
  return api.get('/api/auth/users');
};

export const getHostedGroupBuyings = (userId) => {
  return api.get(`/api/auth/users/${userId}/group-buyings`);
};

export const getParticipatedGroupBuyings = (userId) => {
  return api.get(`/api/auth/users/${userId}/participated-group-buyings`);
};

export const changePassword = ({ email, currentPassword, newPassword }) => {
  return api.post('/api/auth/users/change-password', {
    email,
    currentPassword,
    newPassword,
  });
};

export const deletePost = (postId) => {
  return api.delete(`/api/posts/${postId}`);
};

export const cancelParticipation = (postId, userId) => {
  return api.delete(`/api/group-buyings/${postId}/participants/${userId}`);
};
