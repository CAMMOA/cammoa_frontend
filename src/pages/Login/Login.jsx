import { useState } from 'react';
import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ id, pw });
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <LoginTitle>로그인</LoginTitle>

        <EmailInput
          type="text"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />

        <PasswordInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
        />

        <ButtonContainer>
          <LoginButton type="submit">로그인</LoginButton>
          <SignUpButton type="button">회원가입</SignUpButton>
        </ButtonContainer>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled(Container)`
  justify-content: center;
  margin-top: 330px;
  margin-bottom: 390px;
`;

const LoginForm = styled.form`
  width: 440px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const LoginTitle = styled.p`
  margin-bottom: 20px;
  text-algin: center;
  ${({ theme }) => theme.fontStyles.Body2};
`;

const Input = styled.input`
  height: 85px;
  padding: 0px 20px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  border-radius: 4px;
  border: 1px solid #ddd;

  color: #757575;
  ${({ theme }) => theme.fontStyles.Body6};
  font-weight: 700;
  letter-spacing: -0.6px;
`;

const EmailInput = styled(Input)``;

const PasswordInput = styled(Input)`
  margin-bottom: 20px;
`;

const ButtonContainer = styled(Container)`
  gap: 10px;
`;

const LoginButton = styled.button`
  height: 85px;
  padding: 19px 10px;

  align-self: stretch;

  border-radius: 3px;
  background: #3092fa;
  color: #fff;
  ${({ theme }) => theme.fontStyles.Body4};
  font-weight: 700;
  line-height: 100%;
`;
const SignUpButton = styled.button`
  height: 85px;
  padding: 19px 11px;
  border-radius: 3px;
  border: 1px solid #3092fa;

  align-self: stretch;
  color: #3092fa;

  ${({ theme }) => theme.fontStyles.Body4};
  font-weight: 700;
  line-height: 100%;
`;
