import api from '@api/api';

export const login = async (userData) => {
  try {
    const response = await api.post('/api/auth/login', userData);
    console.log(response);
    if (response.data.status === 'OK') {
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      return true;
    } else {
      alert('로그인 실패!');
      return false;
    }
  } catch (error) {
    const { status, data } = error.response || {};
    const errorMessage = data?.message;
    console.error('회원가입 오류:', error);
    switch (status) {
      case 404:
        alert(errorMessage || '요청이 잘못되었습니다.');
        break;
      case 400:
        alert(errorMessage || '요청이 잘못되었습니다.');
        break;
      default:
        alert('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
        break;
    }
  }
};
