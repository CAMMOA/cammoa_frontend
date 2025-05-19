import PropTypes from 'prop-types';
import styled from 'styled-components';
import QuitButtonIcon from '@assets/chat/quit-button.svg?react';
import { Container } from '@components/shared/UIStyles';
import { Avatar } from './shared/Avatar';

// 채팅방 목록 아이템
export function ChatRoomItem({ room, active, onClick }) {
  return (
    <ChatRoomItemBox $active={active} onClick={onClick}>
      <AvatarWrapper>
        <Avatar src={room.avatar} alt={room.title} />
        {room.unreadCount > 0 && !room.isRead && <UnreadDot />}
      </AvatarWrapper>
      <RoomInfo>
        <RoomTitleRow>
          <RoomTitle>{room.title}</RoomTitle>
          <RoomTime>{room.time}</RoomTime>
        </RoomTitleRow>
        <RoomLastMsg>{room.lastMessage}</RoomLastMsg>
      </RoomInfo>
    </ChatRoomItemBox>
  );
}

ChatRoomItem.propTypes = {
  room: PropTypes.shape({
    avatar: PropTypes.string,
    title: PropTypes.string,
    unreadCount: PropTypes.number,
    isRead: PropTypes.bool,
    time: PropTypes.string,
    lastMessage: PropTypes.string,
  }).isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export function ChatRoomList({ rooms, activeRoomId, onRoomClick }) {
  return (
    <ChatRoomListBox>
      {rooms.map((room) => (
        <ChatRoomItem
          key={room.id}
          room={room}
          active={room.id === activeRoomId}
          onClick={() => onRoomClick(room.id)}
        />
      ))}
    </ChatRoomListBox>
  );
}

ChatRoomList.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      avatar: PropTypes.string,
      title: PropTypes.string,
      unreadCount: PropTypes.number,
      isRead: PropTypes.bool,
      time: PropTypes.string,
      lastMessage: PropTypes.string,
    })
  ).isRequired,
  activeRoomId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onRoomClick: PropTypes.func,
};

export function QuitButton({ onQuit }) {
  const handleClick = () => {
    if (window.confirm('채팅방을 나가고 공동구매 참여를 취소하시겠습니까?')) {
      if (onQuit) onQuit();
    }
  };
  return (
    <QuitButtonWrapper onClick={handleClick}>
      <QuitButtonIcon width={32} height={32} />
    </QuitButtonWrapper>
  );
}

QuitButton.propTypes = {
  onQuit: PropTypes.func,
};

const ChatRoomItemBox = styled(Container)`
  flex-direction: row;
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
  background: ${({ $active }) => ($active ? '#eff6ff' : '#fff')};
  cursor: pointer;
`;

const AvatarWrapper = styled.div`
  position: relative;
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
`;

const ChatRoomListBox = styled.div`
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const QuitButtonWrapper = styled.button`
  width: 32px;
  height: 32px;

  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;
