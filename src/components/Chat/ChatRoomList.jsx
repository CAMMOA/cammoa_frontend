import api from '@api/api';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GroupImage from '@assets/chat/group-image.svg';
import { Container } from '@components/shared/UIStyles';
import { Avatar } from '@components/Chat/shared/Avatar';

export function ChatRoomList({ activeRoomId, onRoomClick }) {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);

  // 채팅방 목록 조회
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get('/api/auth/users/chats');
        console.log('채팅방 목록:', res.data.data);
        if (res.data.status === 'OK' && Array.isArray(res.data.data)) {
          setRooms(res.data.data);
          setError(null);
        } else {
          setRooms([]);
          setError('채팅방 목록을 불러오지 못했습니다.');
        }
      } catch (e) {
        if (e.response?.status === 404) {
          setError('해당 유저가 존재하지 않습니다.');
        } else {
          setError('채팅방 목록을 불러오는 중 오류가 발생했습니다.');
        }
        setRooms([]);
      }
    };
    fetchRooms();
  }, []);

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <ChatRoomListBox>
      {rooms.map((room) => (
        <ChatRoomItem
          key={room.roomId}
          room={room}
          active={room.roomId === activeRoomId}
          onClick={() => onRoomClick(room.roomId)}
        />
      ))}
    </ChatRoomListBox>
  );
}

ChatRoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeRoomId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onRoomClick: PropTypes.func.isRequired,
};

export default ChatRoomList;

function ChatRoomItem({ room, active, onClick }) {
  const getTime = (timeStr) => {
    if (!timeStr || typeof timeStr !== 'string') return '';
    // ISO 8601 형태에서 HH:MM만 추출
    if (timeStr.length >= 16 && timeStr[10] === 'T') {
      return timeStr.slice(11, 16);
    }
    // 혹시 "14:28:55" 형태면 앞 5글자만
    if (timeStr.length >= 5) {
      return timeStr.slice(0, 5);
    }
    return '';
  };

  // unreadMessageCount가 0이면 토글 비활성, 1 이상이면 활성
  return (
    <ChatRoomItemBox $active={active} onClick={onClick}>
      <AvatarWrapper>
        <Avatar src={GroupImage} alt={room.roomName} />
        {room.unreadMessageCount > 0 && <UnreadDot />}
      </AvatarWrapper>
      <RoomInfo>
        <RoomTitleRow>
          <RoomTitle>{room.roomName}</RoomTitle>
          <RoomTime>{getTime(room.lastMessage?.time)}</RoomTime>
        </RoomTitleRow>
        <RoomLastMsg>{room.lastMessage?.content || ''}</RoomLastMsg>
      </RoomInfo>
    </ChatRoomItemBox>
  );
}

ChatRoomItem.propTypes = {
  room: PropTypes.shape({
    roomId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    roomName: PropTypes.string.isRequired,
    unreadMessageCount: PropTypes.number,
    lastMessage: PropTypes.shape({
      content: PropTypes.string,
      time: PropTypes.string,
    }),
  }).isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

const ChatRoomListBox = styled.div`
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ChatRoomItemBox = styled(Container)`
  flex-direction: row;
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
  background: ${({ $active }) => ($active ? '#eff6ff' : '#fff')};
  cursor: pointer;
`;

const AvatarWrapper = styled.div`
  display: inline-block;
`;

const UnreadDot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  background: #3092fa;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  z-index: 2;
`;

const RoomInfo = styled(Container)`
  flex: 1;
`;

const RoomTitleRow = styled(Container)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const RoomTitle = styled.div`
  ${({ theme }) => theme.fontStyles.Body7};
  font-weight: 500;
  max-width: 150px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RoomTime = styled.div`
  ${({ theme }) => theme.fontStyles.Body8};
  font-weight: 500;
  color: #9ca3af;
  align-self: flex-end;
`;

const RoomLastMsg = styled.div`
  ${({ theme }) => theme.fontStyles.Body7};
  max-width: 205px;
  color: #6b7280;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-self: flex-start;
  text-align: left;
`;

const ErrorMessage = styled(Container)`
  ${({ theme }) => theme.fontStyles.Body7};
  font-weight: 500;
  color: #6b7280;
  width: 100%;
  height: 100%;
  justify-content: center;
  text-align: center;
`;
