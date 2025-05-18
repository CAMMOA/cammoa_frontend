import { useState } from 'react';
import styled from 'styled-components';
import { Container, Header } from '@components/shared/UIStyles';
import useFormattedDate from '@hooks/useFormattedDate';
import { ButtonStyle } from '@components/shared/ButtonStyle';

export default function Signup() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('none');
  const [agree, setAgree] = useState(false);
  const { value, handleDateChange } = useFormattedDate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ id, pw, pwConfirm, name, email, gender, agree });
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
          <FormRow>
            <InputLabel>
              <InputText>성별</InputText>
              <GenderGroup>
                {['male', 'female', 'none'].map((val) => (
                  <GenderLabel key={val} selected={gender === val}>
                    <input
                      type="radio"
                      name="gender"
                      value={val}
                      checked={gender === val}
                      onChange={() => setGender(val)}
                    />
                    {val === 'male' ? '남자' : val === 'female' ? '여자' : '선택안함'}
                  </GenderLabel>
                ))}
              </GenderGroup>
            </InputLabel>
          </FormRow>
          <FormRow>
            <InputLabel>
              <InputText> 생년월일</InputText>
              <DateGroup>
                <DateInput
                  type="text"
                  placeholder="YYYY     /    MM    /    DD"
                  value={value}
                  onChange={handleDateChange}
                />
              </DateGroup>
            </InputLabel>
          </FormRow>
          <CheckFormrow>
            <InputLabel>
              <InputText>
                이용약관동의<RequiredStar>*</RequiredStar>
              </InputText>
              <CheckboxLabel>
                <CheckboxInput type="checkbox" checked={agree} onChange={() => setAgree(!agree)} />
                공동 구매 모집 완료 이메일 수신 동의
              </CheckboxLabel>
            </InputLabel>
          </CheckFormrow>
          <SubmitButton type="submit">가입하기</SubmitButton>
        </SignupForm>
      </SignupFormContainer>
    </SignupContainer>
  );
}

const SignupContainer = styled(Container)`
  padding-top: 150px;
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
  padding: 10px 20px;
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

const GenderGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const GenderLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  input {
    width: 25px;
    height: 25px;
  }
  ${({ theme }) => theme.fontStyles.Body4};
  font-size: 16px;
`;

const DateGroup = styled(Container)`
  flex-direction: row;
  flex: 1;

  height: 46px;
  border-radius: 3px;
  border: 1px solid #ddd;
`;

const DateInput = styled.input`
  width: 100%;
  text-align: center;
  ${({ theme }) => theme.fontStyles.Body4};
  font-size: 16px;
`;

const CheckFormrow = styled(FormRow)`
  margin-top: 20px;
  border-top: 2px solid #333;
`;
const CheckboxLabel = styled.label`
  padding-top: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  ${({ theme }) => theme.fontStyles.Body4};
  font-size: 16px;
`;

const CheckboxInput = styled.input`
  width: 24px;
  height: 24px;
`;

const SubmitButton = styled(ButtonStyle)`
  align-self: center;

  width: 240px;
  height: 56px;
  margin-top: 40px;
  border: none;
`;
