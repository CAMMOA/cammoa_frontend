import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QuitButtonIcon from '@assets/chat/quit-button.svg?react';
import SendIcon from '@assets/chat/send-icon.svg?react';

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

export function MessageItem({ msg }) {
  if (msg.mine) {
    return (
      <MyMessage>
        <MsgMetaCol align="right">
          {msg.unreadCount > 0 && <UnreadText>{msg.unreadCount}</UnreadText>}
          <MsgTime>{msg.time}</MsgTime>
        </MsgMetaCol>
        <MyMsgBubble>{msg.content}</MyMsgBubble>
      </MyMessage>
    );
  }
  return (
    <OtherMessageRow>
      <Avatar src={msg.avatar} alt={msg.sender} size="40px" />
      <OtherMsgContent>
        <SenderName>{msg.sender}</SenderName>
        <MsgBubbleRow>
          <OtherMsgBubble>{msg.content}</OtherMsgBubble>
          <MsgMetaCol align="left">
            {msg.unreadCount > 0 && <UnreadText>{msg.unreadCount}</UnreadText>}
            <MsgTime>{msg.time}</MsgTime>
          </MsgMetaCol>
        </MsgBubbleRow>
      </OtherMsgContent>
    </OtherMessageRow>
  );
}

MessageItem.propTypes = {
  msg: PropTypes.shape({
    mine: PropTypes.bool,
    unreadCount: PropTypes.number,
    time: PropTypes.string,
    content: PropTypes.string,
    avatar: PropTypes.string,
    sender: PropTypes.string,
  }).isRequired,
};

export function DateSeparator({ date }) {
  return <DateSeparatorLine>{date}</DateSeparatorLine>;
}

DateSeparator.propTypes = {
  date: PropTypes.string.isRequired,
};

export function MessageList({ messages }) {
  let lastDate = null;
  return (
    <MessageListBox>
      {messages.map((msg) => {
        const showDate = msg.date !== lastDate;
        lastDate = msg.date;
        return (
          <React.Fragment key={msg.id}>
            {showDate && <DateSeparator date={msg.date} />}
            <MessageItem msg={msg} />
          </React.Fragment>
        );
      })}
    </MessageListBox>
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      date: PropTypes.string,
      mine: PropTypes.bool,
      unreadCount: PropTypes.number,
      time: PropTypes.string,
      content: PropTypes.string,
      avatar: PropTypes.string,
      sender: PropTypes.string,
    })
  ).isRequired,
};

export function ChatInput({ value, onChange, onSend }) {
  return (
    <InputArea>
      <InputBox
        placeholder="메세지를 입력하세요"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSend();
        }}
      />
      <SendButton onClick={onSend}>
        <SendIcon />
      </SendButton>
    </InputArea>
  );
}

ChatInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
};

// 스타일 컴포넌트 정의
const ChatRoomItemBox = styled.div`
  display: flex;
  align-items: center;
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

const Avatar = styled.img`
  width: ${({ size }) => size || '48px'};
  height: ${({ size }) => size || '48px'};
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
`;

const RoomInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const RoomTitleRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
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
  max-width: 207px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const MessageListBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background: #f9fafb;
  overflow-y: auto;
`;

const OtherMessageRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const OtherMsgContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  min-width: 0;
`;

const SenderName = styled.div`
  ${({ theme }) => theme.fontStyles.Body8};
  font-weight: 500;
  color: #333;
  margin-bottom: 2px;
  text-align: left;
`;

const MsgBubbleRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const OtherMsgBubble = styled.div`
  ${({ theme }) => theme.fontStyles.Body7};
  max-width: 275px;
  background: #f3f4f6;
  border-radius: 4px;
  padding: 14px 12px;
  color: #000;
  text-align: left;
  word-break: break-word;
`;

const MsgMetaCol = styled.div`
  min-width: 24px;
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => (align === 'right' ? 'flex-end' : 'flex-start')};
  gap: 2px;
`;

const UnreadText = styled.span`
  ${({ theme }) => theme.fontStyles.Body8};
  font-weight: 500;
  color: #3092fa;
  line-height: 1.2;
`;

const MsgTime = styled.div`
  ${({ theme }) => theme.fontStyles.Body8};
  font-weight: 500;
  color: #9ca3af;
  line-height: 1.2;
`;

const MyMessage = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 10px;
  align-self: flex-end;
`;

const MyMsgBubble = styled.div`
  ${({ theme }) => theme.fontStyles.Body7};
  max-width: 275px;
  background: #3092fa;
  border-radius: 4px;
  padding: 14px 12px;
  color: #fff;
  word-break: break-word;
`;

const InputArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 1px solid #e5e7eb;
  padding: 16px;
  background: #fff;
  box-sizing: border-box;
  border-radius: 0 0 4px 0;
`;

const InputBox = styled.input`
  ${({ theme }) => theme.fontStyles.Body6};
  flex: 1;
  height: 42px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 0 15px;
  color: #333;
  outline: none;
  box-sizing: border-box;
`;

const SendButton = styled.button`
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  margin-left: 12px;
  cursor: pointer;
`;

const DateSeparatorLine = styled.div`
  ${({ theme }) => theme.fontStyles.Body7};
  font-weight: 500;
  text-align: center;
  margin: 20px 0 8px 0;
  color: #999;
`;
