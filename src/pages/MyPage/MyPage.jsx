import { useState } from 'react';
import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';
import ImageIcon from '@assets/icons/image-icon.svg';
import EditIcon from '@assets/icons/edit-icon.svg?react';

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
          <InputLabel>
            <Inputext>현재 비밀번호</Inputext>
            <Input type="password" placeholder="현재 비밀번호를 입력해주세요" />
          </InputLabel>
          <InputLabel>
            <Inputext>새 비밀번호</Inputext>
            <Input type="password" placeholder="8자 이상의 새로운 비밀번호를 입력해주세요" />
          </InputLabel>
          <InputLabel>
            <Inputext>비밀번호 확인</Inputext>
            <Input type="password" placeholder="새로운 비밀번호를 한번 더 입력해주세요" />
          </InputLabel>

          <ButtonRow>
            <ChangeButton type="button">
              <EditIcon />
              변경하기
            </ChangeButton>
            <WithdrawButton type="button">탈퇴하기</WithdrawButton>
          </ButtonRow>
        </PasswordSection>
      </ProfileContainer>

      <MyPurchaseManagementContainer>
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

        {items.length > 0 ? (
          <PurchaseListContainer>
            {items.map((item) => (
              <div key={item.id}>{item.title}</div>
            ))}
          </PurchaseListContainer>
        ) : (
          <EmptyMessage>아직 기록이 없어요. 첫 공동구매에 도전해보세요!</EmptyMessage>
        )}
      </MyPurchaseManagementContainer>
    </MyPageContainer>
  );
};

export default MyPage;

const MyPageContainer = styled(Container)`
  width: 1065px;
  padding-top: 55px;
  gap: 35px;
`;

const ProfileContainer = styled(Container)`
  gap: 30px;
  width: 100%;
  flex-direction: row;
  align-items: stretch;
  height: 330px;
`;

const ProfileSection = styled(Container)`
  width: 330px;
  height: 100%;
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

const InputLabel = styled.label`
  display: flex;
  padding: 5px 0px;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;

const Inputext = styled.p`
  width: 108px;
  ${({ theme }) => theme.fontStyles.Body6};
  color: #333;
`;

const Input = styled.input`
  flex: 0.8;
  height: 40px;
  padding: 9px 136px 8px 12px;
  border-radius: 2px;
  border: 1px solid #b2b2b2;
  background: #fff;
  ${({ theme }) => theme.fontStyles.Body6};
`;

const ButtonRow = styled(Container)`
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
`;

const Button = styled.button`
  ${({ theme }) => theme.fontStyles.Body7};
  line-height: 96%;
  color: #888;
`;

const ChangeButton = styled(Button)`
  display: flex;
  align-items: center;
`;

const WithdrawButton = styled(Button)``;

const MyPurchaseManagementContainer = styled(Container)`
  width: 100%;
  align-items: flex-start;
`;

const SectionTitle = styled.p`
  ${({ theme }) => theme.fontStyles.Body2};
  margin-bottom: 20px;
`;

const TabContainer = styled(Container)`
  width: 100%;
  flex-direction: row;
  gap: 20px;
  border-bottom: 1px solid #dadee5;
  margin: 30px 0px;
`;

const PurchaseListContainer = styled(Container)`
  width: 100%;
  gap: 20px;
  padding-bottom: 50px;
  align-items: center;
`;

const Tab = styled(Container)`
  width: 230px;
  padding: 20px 60px;
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
  width: 100%;
  text-align: center;
  margin: 200px 0px;
`;
