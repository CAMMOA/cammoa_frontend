import { useState } from 'react';
import styled from 'styled-components';
import { PageWrapper, Container } from '@components/shared/UIStyles';
import ImageIcon from '@assets/icons/image-icon.svg';

const MyPage = () => {
  const [tab, setTab] = useState('hosted');
  const hostedList = [];
  const joinedList = [];
  const items = tab === 'hosted' ? hostedList : joinedList;

  return (
    <MyPageContainer>
      <ProfileContainer>
        <ProfileSection>
          <Avatar>
            <img src={ImageIcon} alt="avatar" />
          </Avatar>
          <Username>지나가는 감자</Username>
          <Email>asdfasdf@hufs.ac.kr</Email>
        </ProfileSection>

        <PasswordSection>
          <PasswordSectionTitle>비밀번호 변경</PasswordSectionTitle>
          <PasswordRow>
            <Label>현재 비밀번호</Label>
            <Input type="password" placeholder="현재 비밀번호를 입력해주세요" />
          </PasswordRow>
          <PasswordRow>
            <Label>새 비밀번호</Label>
            <Input type="password" placeholder="8자 이상의 새로운 비밀번호를 입력해주세요" />
          </PasswordRow>
          <PasswordRow>
            <Label>비밀번호 확인</Label>
            <Input type="password" placeholder="새로운 비밀번호를 한번 더 입력해주세요" />
          </PasswordRow>

          <ButtonRow>
            <ChangeButton type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  opacity="0.2"
                  d="M13.8538 5.64633L12 7.50008L8.5 4.00008L10.3538 2.14633C10.4475 2.05263 10.5746 2 10.7072 2C10.8397 2 10.9669 2.05263 11.0606 2.14633L13.8538 4.93758C13.9004 4.98404 13.9375 5.03926 13.9627 5.10008C13.988 5.16089 14.001 5.2261 14.001 5.29196C14.001 5.35781 13.988 5.42302 13.9627 5.48383C13.9375 5.54465 13.9004 5.59987 13.8538 5.64633Z"
                  fill="#B6B6B6"
                />
                <path
                  d="M14.2075 4.58547L11.4144 1.79297C11.3215 1.70009 11.2113 1.62641 11.0899 1.57614C10.9686 1.52587 10.8385 1.5 10.7072 1.5C10.5759 1.5 10.4458 1.52587 10.3245 1.57614C10.2031 1.62641 10.0929 1.70009 10 1.79297L2.29313 9.49985C2.19987 9.59237 2.12593 9.70251 2.0756 9.82386C2.02528 9.94521 1.99959 10.0754 2.00001 10.2067V12.9998C2.00001 13.2651 2.10536 13.5194 2.2929 13.707C2.48043 13.8945 2.73479 13.9998 3.00001 13.9998H13.5C13.6326 13.9998 13.7598 13.9472 13.8536 13.8534C13.9473 13.7596 14 13.6325 14 13.4998C14 13.3672 13.9473 13.2401 13.8536 13.1463C13.7598 13.0525 13.6326 12.9998 13.5 12.9998H7.20751L14.2075 5.99985C14.3004 5.90699 14.3741 5.79674 14.4243 5.6754C14.4746 5.55406 14.5005 5.424 14.5005 5.29266C14.5005 5.16132 14.4746 5.03127 14.4243 4.90992C14.3741 4.78858 14.3004 4.67834 14.2075 4.58547ZM3.00001 10.2067L8.50001 4.70672L11.2931 7.49985L5.79313 12.9998H3.00001V10.2067ZM12 6.79297L9.20751 3.99985L10.7075 2.49985L13.5 5.29297L12 6.79297Z"
                  fill="#B6B6B6"
                />
              </svg>
              변경하기
            </ChangeButton>
            <WithdrawButton type="button">탈퇴하기</WithdrawButton>
          </ButtonRow>
        </PasswordSection>
      </ProfileContainer>

      <PurchaseSection>
        <SectionTitle>나의 공동구매 관리</SectionTitle>
        <TabContainer>
          <Tab active={tab === 'hosted'} onClick={() => setTab('hosted')}>
            주최한 공동구매
          </Tab>
          <Tab active={tab === 'joined'} onClick={() => setTab('joined')}>
            참여한 공동구매
          </Tab>
        </TabContainer>
        <CountText>총 {items.length}개</CountText>
        {items.length === 0 && (
          <EmptyMessage>아직 기록이 없어요. 첫 공동구매에 도전해보세요!</EmptyMessage>
        )}
      </PurchaseSection>
    </MyPageContainer>
  );
};

export default MyPage;

const MyPageContainer = styled(PageWrapper)`
  margin-top: 55px;
  gap: 35px;
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 30px;
  width: 1065px;
  height: 330px;
  alig-items: flex-start;
`;

const ProfileSection = styled(Container)`
  width: 330px;
  background: rgba(255, 255, 255, 0);
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.05);
  justify-content: center;
`;

const PasswordSection = styled(Container)`
  flex: 1;
  padding: 0 30px;
  background: rgba(255, 255, 255, 0);
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.05);
  align-items: flex-start;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`;

const Username = styled.p`
  ${({ theme }) => theme.fontStyles.Body4};
  margin-bottom: 15px;
`;

const Email = styled.p`
  ${({ theme }) => theme.fontStyles.Body6};
  color: #666;
`;

const PasswordSectionTitle = styled(Container)`
  ${({ theme }) => theme.fontStyles.Body5};
  margin-top: 25px;
  margin-bottom: 25px;
  height: 25px;
`;

const PasswordRow = styled.div`
  display: flex;
  padding: 5px 0px;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;

const Label = styled.label`
  width: 108px;
  ${({ theme }) => theme.fontStyles.Body6};
  color: #333;
`;

const Input = styled.input`
  flex: 0.8;
  height: 40px;
  padding: 9px 136px 8px 12px;
  border-radius: 2px;
  border: var(--stroke-weight-1, 1px) solid #b2b2b2;
  background: #fff;
  ${({ theme }) => theme.fontStyles.Body6};
`;

const ButtonRow = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const Button = styled.button`
  ${({ theme }) => theme.fontStyles.Body7};
  line-height: 13px;
  color: #888;
`;

const ChangeButton = styled(Button)`
  display: flex;
  align-items: center;
`;

const WithdrawButton = styled(Button)``;

const PurchaseSection = styled.div`
  width: 1065px;
`;

const SectionTitle = styled.p`
  ${({ theme }) => theme.fontStyles.Body2};
  margin-bottom: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 30px;
  border-bottom: 1px solid #9ca3af;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Tab = styled(Container)`
  width: 230px;
  padding: 20px; 60px;
  ${({ theme }) => theme.fontStyles.Body6};
  color: ${({ active }) => (active ? '#3092FA' : '#9CA3AF')};
  border-bottom: ${({ active }) => (active ? '2px solid #3092FA' : '#9CA3AF')};
  cursor: pointer;
`;

const CountText = styled.p`
  ${({ theme }) => theme.fontStyles.Body6};
  color: #333;
  margin: 20px 0;
`;

const EmptyMessage = styled.p`
  ${({ theme }) => theme.fontStyles.Body6};
  color: #666;
  text-align: center;
  margin: 200px 0px 200px 0px;
`;
