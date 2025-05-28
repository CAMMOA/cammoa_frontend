import axios from 'axios';

export const uploadPostImages = async (postId, imageFiles) => {
  const formData = new FormData();
  imageFiles.forEach((file) => formData.append('images', file));

  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/posts/${postId}/images`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );
  return response.data;
};
