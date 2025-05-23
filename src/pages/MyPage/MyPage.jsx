import { useState } from 'react';
import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';
import UserProfile from '@assets/icons/user-image.svg?react';
import EditIcon from '@assets/icons/edit-icon.svg?react';
import ProductItemList from '@components/MyPage/ProductItemList';

const MyPage = () => {
  const [tab, setTab] = useState('hosted');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordMessage('❌ 새 비밀번호가 일치하지 않습니다.');
      return;
    }

    setPasswordMessage('✅ 비밀번호가 성공적으로 변경되었습니다.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleWithdraw = async () => {
    if (!window.confirm('정말로 탈퇴하시겠습니까?')) return;
  };

  const handleEdit = (id) => console.log('edit', id);
  const handleChat = (id) => console.log('chat', id);
  const handleDelete = (id) => console.log('delete', id);
  const handleCancel = (id) => console.log('cancel', id);

  return (
    <MyPageContainer>
      <ProfileContainer>
        <ProfileSection>
          <AvatarContainer>
            <UserProfile />
          </AvatarContainer>
          <Username>지나가는 감자</Username>
          <Email>asdfasdf@hufs.ac.kr</Email>
        </ProfileSection>

        <PasswordSection>
          <PasswordSectionTitle>비밀번호 변경</PasswordSectionTitle>
          <InputLabel>
            <Inputext>현재 비밀번호</Inputext>
            <Input
              type="password"
              placeholder="현재 비밀번호를 입력해주세요"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </InputLabel>
          <InputLabel>
            <Inputext>새 비밀번호</Inputext>
            <Input
              type="password"
              placeholder="8자 이상의 새로운 비밀번호를 입력해주세요"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </InputLabel>
          <InputLabel>
            <Inputext>비밀번호 확인</Inputext>
            <Input
              type="password"
              placeholder="새로운 비밀번호를 한번 더 입력해주세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </InputLabel>
          {passwordMessage && <Message>{passwordMessage}</Message>}

          <ButtonRow>
            <ChangeButton type="button" onClick={handleChangePassword}>
              <EditIcon />
              변경하기
            </ChangeButton>
            <WithdrawButton type="button" onClick={handleWithdraw}>
              탈퇴하기
            </WithdrawButton>
          </ButtonRow>
        </PasswordSection>
      </ProfileContainer>

      <MyPurchaseManagementContainer>
        <SectionTitle>나의 공동구매 관리</SectionTitle>
        <TabContainer>
          <Tab $active={tab === 'hosted'} onClick={() => setTab('hosted')}>
            주최한 공동구매
          </Tab>
          <Tab $active={tab === 'joined'} onClick={() => setTab('joined')}>
            참여한 공동구매
          </Tab>
        </TabContainer>

        <ProductItemList
          mode={tab}
          onEdit={handleEdit}
          onChat={handleChat}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
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
  width: 100%;
  height: 330px;

  flex-direction: row;
  align-items: stretch;
  gap: 30px;
`;

const ProfileSection = styled(Container)`
  width: 330px;
  height: 100%;
  background: transparent;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
  justify-content: center;
`;

const PasswordSection = styled(Container)`
  flex: 1;
  padding: 0 30px;
  background: transparent;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
  align-items: flex-start;
`;

const AvatarContainer = styled(Container)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
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
  padding: 25px 0;
`;

const InputLabel = styled.label`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 24px;
  padding: 10px 0;
`;

const Inputext = styled.p`
  width: 108px;
  ${({ theme }) => theme.fontStyles.Body6};
  color: #333;
`;

const Input = styled.input`
  flex: 0.8;
  height: 40px;
  padding: 9px 12px;
  border-radius: 2px;
  border: 1px solid #b2b2b2;
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
  gap: 20px;
`;

const SectionTitle = styled.p`
  ${({ theme }) => theme.fontStyles.Body2};
`;

const TabContainer = styled(Container)`
  width: 100%;
  margin: 30px 0;
  flex-direction: row;
  border-bottom: 1px solid #dadee5;
`;

const Tab = styled(Container)`
  width: fit-content;
  padding: 17px 60px;

  ${({ theme }) => theme.fontStyles.Body6};
  color: ${({ $active }) => ($active ? '#3092FA' : '#9CA3AF')};
  border-bottom: ${({ $active }) => ($active ? '2px solid #3092FA' : 'none')};
  cursor: pointer;
`;

const Message = styled.p`
  ${({ theme }) => theme.fontStyles.Body6};
`;
