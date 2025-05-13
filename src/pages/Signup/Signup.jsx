import { useState } from 'react';
import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';

export default function Signup() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('none');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ id, pw, pwConfirm, name, email, gender, birthYear, birthMonth, birthDay, agree });
  };

  return (
    <SignupContainer>
        <SignupForm>
      <HeaderArea>
        <Title>회원가입</Title>
        <RequiredInfo>
          <RequiredStar>*</RequiredStar>
          필수입력사항
        </RequiredInfo>
      </HeaderArea>
      <Divider />

        <Form onSubmit={handleSubmit}>
          {}
          <FormRow>
            <LabelCell>아이디<RequiredStar>*</RequiredStar></LabelCell>
            <InputCell>
              <Input
                type="text"
                placeholder="아이디를 입력해주세요"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </InputCell>
          </FormRow>

          {}
          <FormRow>
            <LabelCell>비밀번호<RequiredStar>*</RequiredStar></LabelCell>
            <InputCell>
              <Input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                required
              />
            </InputCell>
          </FormRow>

          {}
          <FormRow>
            <LabelCell>비밀번호 확인<RequiredStar>*</RequiredStar></LabelCell>
            <InputCell>
              <Input
                type="password"
                placeholder="비밀번호를 한 번 더 입력해주세요"
                value={pwConfirm}
                onChange={(e) => setPwConfirm(e.target.value)}
                required
              />
            </InputCell>
          </FormRow>

          {}
          <FormRow>
            <LabelCell>이름<RequiredStar>*</RequiredStar></LabelCell>
            <InputCell>
              <Input
                type="text"
                placeholder="이름을 입력해 주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputCell>
          </FormRow>

          {}
          <FormRow>
            <LabelCell>이메일<RequiredStar>*</RequiredStar></LabelCell>
            <InputCell>
              <EmailGroup>
                <Input
                  type="email"
                  placeholder="예: cammoa@hufs.ac.kr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <AuthButton type="button">인증번호 받기</AuthButton>
              </EmailGroup>
            </InputCell>
          </FormRow>

          {}
          <FormRow>
            <LabelCell>성별</LabelCell>
            <InputCell>
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
            </InputCell>
          </FormRow>

          {}
          <FormRow>
            <LabelCell>생년월일</LabelCell>
            <InputCell>
              <DateGroup>
                <DateInput
                  type="text"
                  placeholder="YYYY"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                />
                <Slash>/</Slash>
                <DateInput
                  type="text"
                  placeholder="MM"
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                />
                <Slash>/</Slash>
                <DateInput
                  type="text"
                  placeholder="DD"
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                />
              </DateGroup>
            </InputCell>
          </FormRow>

          <Divider />

          {}
          <FormRow>
            <LabelCell>이용약관동의<RequiredStar>*</RequiredStar></LabelCell>
            <InputCell>
              <CheckboxLabel>
                <CheckboxInput
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                />
                공동 구매 모집 완료 이메일 수신 동의
              </CheckboxLabel>
            </InputCell>
          </FormRow>

          <SubmitButton type="submit">가입하기</SubmitButton>
        </Form>
        </SignupForm>
    </SignupContainer>
  );
}

const SignupContainer = styled(Container)`
  justify-content: center;
  margin-top: 250px;
  margin-bottom: 150px;
`;

const SignupForm = styled.div`
  width: 650px;
`

const HeaderArea = styled.div`
  display: column;
  align-items: center;
`;

const Title = styled.h2`
  padding-bottom: 50px;
  align-self: stretch;
  text-align: center;
  ${({ theme }) => theme.fontStyles.Body2};
`;

const RequiredInfo = styled.div`    
  text-align: right;
  ${({ theme }) => theme.fontStyles.Body6};
`;

const RequiredStar = styled.span`
color: #EE6A7B;
text-align: right;
  ${({ theme }) => theme.fontStyles.Body6};
`;

const Divider = styled.hr`
align-items: flex-end;
align-self: stretch;
border-bottom: var(--stroke-weight-2, 2px) solid #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const LabelCell = styled.div`
  width: 150px;
  padding-top: 12px;
  align-self: stretch;

  ${({ theme }) => theme.fontStyles.Body4};
  font-size: 16px;
`;

const InputCell = styled.div`
  margin-bottom:10px;
  align-self: stretch;

  ${({ theme }) => theme.fontStyles.Body4};
  font-size:16px;
`;

const Input = styled.input`
width:380px;
height: 46px;
padding: 13px 16px;
border-radius: 4px;
border: var(--stroke-weight-1, 1px) solid #DDD;

  ${({ theme }) => theme.fontStyles.Body6};
`;

const EmailGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const AuthButton = styled.button`
display: flex;
height: 46px;
padding: 15px;

border-radius: 3px;
border: var(--stroke-weight-1, 1px) solid #DDD;

color: #DDD;ss
 ${({ theme }) => theme.fontStyles.Body7};
`;

const GenderGroup = styled.div`
margin:10px;
display: flex;
gap:80px;
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
font-size:16px;
`;

const DateGroup = styled.div`
display: flex;
justify-content: space-between;
padding-right:30px;
padding-left:30px;
width:380px;
height: 46px;
align-items: center;

border-radius: 3px;
border: var(--stroke-weight-1, 1px) solid #DDD;
`;

const DateInput = styled.input`
width:100%;
height:40px;
display: flex;

text-align: center;
${({ theme }) => theme.fontStyles.Body4};
font-size:16px;
`;

const Slash = styled.span`
  ${({ theme }) => theme.fontStyles.Body6};
`;

const CheckboxLabel = styled.label`
  padding-top:10px;
  display: flex;
  align-items: center;
  gap: 12px;
  ${({ theme }) => theme.fontStyles.Body4};
  font-size:16px;
`;

const CheckboxInput = styled.input`
  width: 24px;
  height: 24px;
`;

const SubmitButton = styled.button`
  align-self: center;
  margin-top: 40px;
  width: 100%;
  max-width: 240px;
  height: 56px;
  background-color: #3092fa;
  color: #fff;
  border: none;
  border-radius: 3px;

  ${({ theme }) => theme.fontStyles.Body4};
  font-size: 16px;
`;
