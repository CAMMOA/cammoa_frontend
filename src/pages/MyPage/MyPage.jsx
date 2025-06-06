import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';
import UserProfile from '@assets/icons/user-image.svg?react';
import EditIcon from '@assets/icons/edit-icon.svg?react';
import ProductItemList from '@components/MyPage/ProductItemList';
import {
  getCurrentUser,
  getHostedGroupBuyings,
  getParticipatedGroupBuyings,
  changePassword,
  deletePost,
  cancelParticipation,
} from '@api/mypage/mypage';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const [tab, setTab] = useState('hosted');
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [hostedItems, setHostedItems] = useState([]);
  const [joinedItems, setJoinedItems] = useState([]);
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.log('⛔ accessToken 없음');
      return;
    }

    getCurrentUser()
      .then((res) => {
        console.log('👤 사용자 정보 응답:', res.data);
        if (res.data.status === 'OK') {
          setUserId(res.data.data.userId);
          setEmail(res.data.data.email);
          setNickname(res.data.data.nickname);
        }
      })
      .catch((err) => console.error('❌ 사용자 정보 조회 실패:', err));
  }, []);

  useEffect(() => {
    console.log('📢 userId 바뀜:', userId);
    if (!userId) return;

    getHostedGroupBuyings(userId)
      .then((res) => {
        console.log('✅ 주최한 공구 응답:', res.data);
        const data = res.data.data || [];

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const sortedHosted = data.slice().sort((a, b) => {
          const dateA = new Date(a.deadline);
          const dateB = new Date(b.deadline);

          const isAExpired = dateA < today;
          const isBExpired = dateB < today;

          if (isAExpired && !isBExpired) return 1;
          if (!isAExpired && isBExpired) return -1;
          if (isAExpired && isBExpired) return 0;
          return dateA - dateB;
        });

        console.log('✅ 정렬된 주최한 개수:', sortedHosted.length);
        setHostedItems(sortedHosted);
      })
      .catch((err) => {
        console.error(
          '❌ 주최한 공구 에러:',
          err.response?.status ?? '(status 없음)',
          err.response?.data ?? err.message
        );
      });

    getParticipatedGroupBuyings(userId)
      .then((res) => {
        console.log('✅ 참여한 공구 응답:', res.data);
        const data = res.data.data || [];
        const now2 = new Date();
        const today2 = new Date(now2.getFullYear(), now2.getMonth(), now2.getDate());

        const sortedJoined = data.slice().sort((a, b) => {
          const dateA = new Date(a.deadline);
          const dateB = new Date(b.deadline);

          const isAExpired = dateA < today2;
          const isBExpired = dateB < today2;

          if (isAExpired && !isBExpired) return 1;
          if (!isAExpired && isBExpired) return -1;
          if (isAExpired && isBExpired) return 0;
          return dateA - dateB;
        });

        setJoinedItems(sortedJoined);
      })
      .catch((err) => {
        console.error(
          '❌ 참여한 공구 에러:',
          err.response?.status ?? '(status 없음)',
          err.response?.data ?? err.message
        );
      });
  }, [userId]);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordMessage('❌ 새 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await changePassword({ email, currentPassword, newPassword });
      if (response.data.status === 'OK') {
        setPasswordMessage('✅ 비밀번호가 성공적으로 변경되었습니다.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordMessage('❌ 비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      const msg = error.response?.data?.message || '서버 오류 발생';
      setPasswordMessage(`❌ ${msg}`);
    }
  };

  const handleWithdraw = () => {
    const confirmMsg = '정말로 회원탈퇴를 진행하시겠습니까?';
    if (window.confirm(confirmMsg)) {
      alert('회원탈퇴가 완료되었습니다.');
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) return;

    try {
      await deletePost(postId);
      alert('게시글이 삭제되었습니다.');
      setHostedItems((prev) => prev.filter((item) => item.productId !== postId));
    } catch (error) {
      const message = error.response?.data?.message;
      const messageMap = {
        'Cannot delete the post because other users have already joined':
          '다른 참여자가 있어 게시글을 삭제할 수 없습니다.',
        'Post not found': '게시글이 존재하지 않거나 이미 삭제되었습니다.',
        'You do not have permission to access this post': '해당 게시글을 삭제할 권한이 없습니다.',
      };
      alert(messageMap[message] || message || '삭제 중 오류가 발생했습니다.');
    }
  };

  const handleCancel = async (postId) => {
    if (!window.confirm('정말로 이 공구 참여를 취소하시겠습니까?')) return;
    if (!userId) {
      alert('사용자 정보가 없습니다.');
      return;
    }

    try {
      await cancelParticipation(postId, userId);
      alert('참여가 취소되었습니다.');
      setJoinedItems((prev) => prev.filter((item) => item.productId !== postId));
    } catch (error) {
      console.error('❌ 참여 취소 실패:', error.response?.data);
      alert(error.response?.data?.message || '참여 취소 중 오류가 발생했습니다.');
    }
  };

  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`);
  };

  const handleChat = (productId) => {
    console.log('chat', productId);
    navigate('/chat', { state: { roomId: productId } });
  };

  return (
    <MyPageContainer>
      <ProfileContainer>
        <ProfileSection>
          <AvatarContainer>
            <UserProfile />
          </AvatarContainer>
          <Username>{nickname}</Username>
          <Email>{email}</Email>
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
              <EditIcon /> 변경하기
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
          items={tab === 'hosted' ? hostedItems : joinedItems}
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
