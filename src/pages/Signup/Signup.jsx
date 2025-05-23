import { useState } from 'react';
import styled from 'styled-components';
import { Container, Header } from '@components/shared/UIStyles';
import { ButtonStyle } from '@components/shared/ButtonStyle';

export default function Signup() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ id, pw, pwConfirm, name, email });
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
                value={id}
                onChange={(e) => setId(e.target.value)}
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
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                required
              />
            </InputLabel>
          </FormRow>
          <FormRow>
            <InputLabel>
              <InputText>
                비밀번호 확인<RequiredStar>*</RequiredStar>
              </InputText>
              <Input
                type="password"
                placeholder="비밀번호를 한 번 더 입력해주세요"
                value={pwConfirm}
                onChange={(e) => setPwConfirm(e.target.value)}
                required
              />
            </InputLabel>
          </FormRow>
          <FormRow>
            <InputLabel>
              <InputText>
                이름<RequiredStar>*</RequiredStar>
              </InputText>
              <Input
                type="text"
                placeholder="이름을 입력해 주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputLabel>
            <AuthButton>인증번호 받기</AuthButton>
          </FormRow>
          <ButtonContainer>
            <SubmitButton type="submit">가입하기</SubmitButton>
          </ButtonContainer>
        </SignupForm>
      </SignupFormContainer>
    </SignupContainer>
  );
}

const SignupContainer = styled(Container)`
  padding-top: 200px;
`;

const SignupFormContainer = styled(Container)`
  width: 680px;
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
  ${({ theme }) => theme.fontStyles.Body6};
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

const AuthButton = styled.button`
  height: 46px;
  padding: 15px;
  margin-left: 8px;

  border-radius: 3px;
  border: 1px solid #ddd;

  color: #ddd;
  ${({ theme }) => theme.fontStyles.Body7};
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
  margin-top: 40px;
  border: none;
`;
