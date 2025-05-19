import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SendIcon from '@assets/chat/send-icon.svg?react';
import { Avatar } from './shared/Avatar';
import { Container } from '@components/shared/UIStyles';

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

const MessageListBox = styled(Container)`
  width: 100%;
  padding: 16px;
  background: #f9fafb;
  overflow-y: auto;

  align-items: stretch;
  gap: 10px;
`;

const OtherMessageRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const OtherMsgContent = styled(Container)`
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

const MsgMetaCol = styled(Container)`
  min-width: 24px;
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

const InputArea = styled(Container)`
  width: 100%;
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  background: #fff;
  box-sizing: border-box;
  border-radius: 0 0 4px 0;

  flex-direction: row;
  gap: 12px;
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
  cursor: pointer;
`;

const DateSeparatorLine = styled.div`
  ${({ theme }) => theme.fontStyles.Body7};
  font-weight: 500;
  text-align: center;
  padding: 20px 0 8px 0;
  color: #999;
`;
