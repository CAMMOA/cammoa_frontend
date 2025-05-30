import { useState } from 'react';
import styled from 'styled-components';
import { Container, Header } from '@components/shared/UIStyles';
import { ButtonStyle } from '@components/shared/ButtonStyle';
import { signup } from '@api/signup/signup';
import api from '@api/api';
import { verifyEmailAuthCode } from '@api/signup/verifyEmailAuthCode';
import { useNavigate } from 'react-router';

export default function Signup() {
  const [userFormData, setUserFormData] = useState({
    nickname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [emailSent, setEmailSent] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //인증번호 api
  const handleSendCode = async () => {
    try {
      const response = await api.get(`/api/auth/signup/email/${userFormData.email}`);
      console.log(response);
      const { status } = response.data;

      if (status === 'OK') {
        alert('인증번호가 이메일로 전송되었습니다.');
        setEmailSent(true);
      }
    } catch (error) {
      const { status, data } = error.response || {};
      const errorMessage = data?.message;
      console.error('회원가입 오류:', error);
      switch (status) {
        case 500:
          alert(errorMessage || '요청이 잘못되었습니다.');
          break;
        case 400:
          alert(errorMessage || '요청이 잘못되었습니다.');
          break;
        default:
          alert('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요');
          break;
      }
    }
  };
  //인증 api
  const handleVerifyCode = async () => {
    try {
      const res = await verifyEmailAuthCode({
        email: userFormData.email,
        authCode,
      });
      console.log(res);
      if (res.status === 'OK') {
        alert('이메일 인증이 완료되었습니다.');
      } else {
        alert('인증번호가 올바르지 않습니다.');
      }
    } catch (error) {
      const { status, data } = error.response || {};
      const errorMessage = data?.message;
      console.error('회원가입 오류:', error);
      switch (status) {
        case 500:
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

  // 회원가입 api
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signup(userFormData);

      if (response.status === 'CREATED') {
        alert('회원가입이 완료되었습니다.');
        console.log(response);
        navigate('/login');
      } else {
        alert('회원가입에 실패했습니다.');
        console.log(response);
      }
    } catch (error) {
      const { status, data } = error.response || {};
      const errorMessage = data?.message;
      console.error('회원가입 오류:', error);
      switch (status) {
        case 400:
          alert(errorMessage || '비밀번호를 8자 이상 입력하세요');
          break;
        case 409:
          alert(errorMessage || '요청이 잘못되었습니다.');
          break;
        default:
          alert('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
          break;
      }
    }
  };

  return (
    <SignupContainer>
      <SignupFormContainer>
        <HeaderArea>
          <Title>회원가입</Title>
          <RequiredInfo>
            <RequiredStar>* </RequiredStar>
            필수입력사항
          </RequiredInfo>
        </HeaderArea>
        <SignupForm onSubmit={handleSubmit}>
          <FormRow>
            <InputLabel>
              <InputText>
                아이디<RequiredStar>*</RequiredStar>
              </InputText>
              <Input
                type="text"
                placeholder="아이디를 입력해주세요"
                name="nickname"
                value={userFormData.nickname}
                onChange={handleChange}
                required
              />
            </InputLabel>
          </FormRow>
          <FormRow>
            <InputLabel>
              <InputText>
                비밀번호<RequiredStar>*</RequiredStar>
              </InputText>
              <Input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                name="password"
                value={userFormData.password}
                onChange={handleChange}
                required
              />
            </InputLabel>
          </FormRow>
          {userFormData.password.length > 0 && userFormData.password.length < 8 && (
            <ErrorMessage>최소 8자 이상 입력</ErrorMessage>
          )}
          <FormRow>
            <InputLabel>
              <InputText>
                비밀번호 확인<RequiredStar>*</RequiredStar>
              </InputText>
              <Input
                type="password"
                placeholder="비밀번호를 한 번 더 입력해주세요"
                name="confirmPassword"
                value={userFormData.confirmPassword}
                onChange={handleChange}
                required
              />
            </InputLabel>
          </FormRow>
          {userFormData.confirmPassword.length > 0 &&
            userFormData.confirmPassword !== userFormData.password && (
              <ErrorMessage>동일한 비밀번호를 입력</ErrorMessage>
            )}
          <FormRow>
            <InputLabel>
              <InputText>
                이름<RequiredStar>*</RequiredStar>
              </InputText>
              <Input
                type="text"
                placeholder="이름을 입력해 주세요"
                name="username"
                value={userFormData.username}
                onChange={handleChange}
                required
              />
            </InputLabel>
          </FormRow>
          <FormRow>
            <InputLabel>
              <InputText>
                이메일<RequiredStar>*</RequiredStar>
              </InputText>
              <Input
                type="email"
                placeholder="예: cammoa@hufs.ac.kr"
                name="email"
                value={userFormData.email}
                onChange={handleChange}
                required
              />
            </InputLabel>
            <AuthButton
              type="button"
              $isDisabled={!userFormData.email.includes('@hufs.ac.kr')}
              disabled={!userFormData.email.includes('@hufs.ac.kr')}
              onClick={handleSendCode}
            >
              인증번호 받기
            </AuthButton>
          </FormRow>
          {emailSent && (
            <FormRow>
              <InputLabel>
                <InputText />
                <Input
                  type="text"
                  placeholder="인증번호 입력"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  required
                />
              </InputLabel>
              <AuthConfirm type="button" onClick={handleVerifyCode}>
                인증번호 확인
              </AuthConfirm>
            </FormRow>
          )}
          <ButtonContainer>
            <SubmitButton type="submit">가입하기</SubmitButton>
          </ButtonContainer>
        </SignupForm>
      </SignupFormContainer>
    </SignupContainer>
  );
}

const SignupContainer = styled(Container)`
  padding: 153px 0 136px 0;
`;

const SignupFormContainer = styled(Container)`
  width: 640px;
  gap: 12px;
`;
const HeaderArea = styled(Header)`
  width: 100%;
  gap: 50px;
`;
const Title = styled.p`
  text-align: center;
  ${({ theme }) => theme.fontStyles.Body2};
  line-height: 126%;
`;
const RequiredInfo = styled.p`
  width: 100%;
  text-align: right;
  ${({ theme }) => theme.fontStyles.Body8};
  line-height: 142%;
`;
const RequiredStar = styled.span`
  color: #ee6a7b;
  ${({ theme }) => theme.fontStyles.Body8};
  line-height: 142%;
`;
const SignupForm = styled.form`
  width: 100%;
  padding-top: 20px;
  border-top: 2px solid #333;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormRow = styled(Container)`
  width: 100%;
  padding: 20px 20px;
  flex-direction: row;
`;
const InputLabel = styled.label`
  width: 75%;

  display: flex;
  align-items: center;
`;
const InputText = styled.p`
  width: 139px;
  padding: 12px 0;
  color: #333;
  ${({ theme }) => theme.fontStyles.Body7};
  font-weight: 700;
  line-height: 144%;
`;
const Input = styled.input`
  flex: 1;
  height: 46px;
  padding: 13px 16px;
  border-radius: 4px;
  border: 1px solid #ddd;

  color: #757575;
  ${({ theme }) => theme.fontStyles.Body6};
  font-weight: 700;
`;

const ErrorMessage = styled.p`
  width: 311px;
  margin-top: -10px;

  color: red;
  font-size: 13px;
  font-weight: 700;
`;

const AuthButton = styled.button`
  height: 46px;
  padding: 15px;
  margin-left: 8px;

  display: flex;
  align-items: center;

  border-radius: 3px;
  border: 1px solid ${({ $isDisabled }) => ($isDisabled ? '#ddd' : '#3092FA')};

  color: ${({ $isDisabled }) => ($isDisabled ? '#ddd' : '#3092FA')};
  ${({ theme }) => theme.fontStyles.Body7};
  transition: all 0.3s ease;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
`;

const AuthConfirm = styled(AuthButton)`
  color: #fff;
  background: #3092fa;
`;
const ButtonContainer = styled(Container)`
  width: 100%;
  margin-top: 20px;
  border-top: 2px solid #333;
`;
const SubmitButton = styled(ButtonStyle)`
  align-self: center;

  width: 240px;
  height: 56px;
  margin: 40px;
  border: none;
`;
