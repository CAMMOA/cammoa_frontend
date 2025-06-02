import api from '@api/api';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoIcon from '@assets/chat/logo-icon.svg?react';
import ChatRoomList from '@components/Chat/ChatRoomList';
import MessageList from '@components/Chat/MessageList';
import { Container } from '@components/shared/UIStyles';

const Chat = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const navigate = useNavigate();

  // 채팅방 목록 불러오기
  const fetchChatRooms = useCallback(async () => {
    try {
      const res = await api.get('/api/auth/users/chats');
      console.log('채팅방 목록(roomId):', res.data.data && res.data.data.map((r) => r.roomId));
      if (res.data.status === 'OK') {
        setChatRooms(res.data.data || []);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        alert('로그인이 필요합니다. 다시 로그인 해주세요.');
        navigate('/login');
      }
    }
  }, [activeRoomId]);

  useEffect(() => {
    fetchChatRooms();
  }, [fetchChatRooms]);

  useEffect(() => {
    const roomId = location.state?.roomId ? String(location.state?.roomId) : null;
    if (roomId && chatRooms.some((r) => r.roomId === roomId)) {
      setActiveRoomId(roomId);
    } else if (chatRooms.length > 0 && !activeRoomId) {
      setActiveRoomId(chatRooms[0].roomId);
    }
  }, [location.state, chatRooms]);

  const activeRoom = chatRooms.find((r) => String(r.roomId) === String(activeRoomId));

  // 채팅방 나가기
  const handleQuit = async (room) => {
    if (room.isHost) {
      alert('주최자는 참여중인 공동구매 인원이 있다면 나갈 수 없습니다!');
      return;
    }
    if (window.confirm('채팅방에서 나가고 공동구매 참여를 취소하시겠습니까?')) {
      try {
        // 1. 공동구매 참여 취소 (참여 상태 확인 후)
        const statusRes = await api.get(`/api/group-buyings/${room.product?.productId}/status`);
        const isJoined = statusRes.data?.data?.isJoined;
        if (!isJoined) {
          alert('이미 참여를 취소한한 공동구매입니다.');
          //채팅방만 나가기
          await api.delete(`/api/chats/rooms/${room.roomId}/leave`);
          await fetchChatRooms();
          const remainRooms = chatRooms.filter((r) => r.roomId !== room.roomId);
          setActiveRoomId(remainRooms[0]?.roomId || null);
          return;
        }
        // 2. userId를 localStorage에서 꺼내서 사용
        const userId = localStorage.getItem('userId');
        const productId = room.product?.productId;
        console.log('나가기 요청 userId:', userId, 'productId:', productId);

        if (!userId) {
          alert('로그인 정보가 없습니다. 다시 로그인 해주세요.');
          return;
        }
        // 3. 공동구매 참여 취소
        await api.delete(`/api/group-buyings/${room.product?.productId}/participants/${userId}`);
        // 4. 채팅방 나가기
        await api.delete(`/api/chats/rooms/${room.roomId}/leave`);
        await fetchChatRooms();
        const updatedRooms = chatRooms.filter((r) => r.roomId !== room.roomId);
        setActiveRoomId(updatedRooms[0]?.roomId || null);
      } catch (e) {
        const msg = e.response?.data?.message || '';
        console.error(e.response?.data?.message || e);
        if (e.response?.status === 403) {
          alert('주최자는 게시글을 삭제해야 나갈 수 있습니다.');
        } else if (msg.includes('not joined')) {
          // 이미 나간 상태에서 또 나가기 시도
          await api.delete(`/api/chats/rooms/${room.roomId}/leave`);
          await fetchChatRooms();
          const remainRooms = chatRooms.filter((r) => r.roomId !== room.roomId);
          setActiveRoomId(remainRooms[0]?.roomId || null);
        } else {
          alert('나가기 실패');
        }
      }
    }
  };

  return (
    <ChatWrapper>
      <ChatContainer>
        <Sidebar>
          <SidebarHeader>
            <LogoIcon width={40} height={40} />
            <SidebarTitle>모아톡</SidebarTitle>
          </SidebarHeader>
          <ChatRoomList
            rooms={chatRooms}
            activeRoomId={activeRoomId}
            onRoomClick={setActiveRoomId}
          />
        </Sidebar>
        <MainPanel>
          {chatRooms.length === 0 ? (
            <EmptyMessage>아직 참여한 공동구매가 없습니다!</EmptyMessage>
          ) : (
            activeRoom && <MessageList room={activeRoom} onQuit={() => handleQuit(activeRoom)} />
          )}
        </MainPanel>
      </ChatContainer>
    </ChatWrapper>
  );
};

export default Chat;

const ChatWrapper = styled(Container)`
  width: 100%;
  background: #fff;
`;

const ChatContainer = styled(Container)`
  width: 1050px;
  height: 645px;
  margin: 55px 0 135px 0;
  flex-direction: row;
  background: #fff;
`;

const Sidebar = styled(Container)`
  width: 300px;
  height: 100%;
  overflow: hidden;
  background: #fff;
  border: 1px solid #ced4da;
  border-right: none;
  border-radius: 4px 0 0 4px;
  align-items: stretch;
`;

const SidebarHeader = styled(Container)`
  height: 73px;
  padding: 0 16px;
  border-bottom: 1px solid #e5e7eb;
  flex-direction: row;
  gap: 20px;
  flex-shrink: 0;
`;

const SidebarTitle = styled.p`
  ${({ theme }) => theme.fontStyles.Body5};
  font-weight: 700;
  color: #333;
`;

const MainPanel = styled(Container)`
  flex: 1;
  height: 100%;
  border: 1px solid #ced4da;
  border-radius: 0 4px 4px 0;
`;

const EmptyMessage = styled(Container)`
  width: 100%;
  height: 100%;
  justify-content: center;
  ${({ theme }) => theme.fontStyles.Body5};
  font-weight: 500;
  color: #b5b5b5;
`;
