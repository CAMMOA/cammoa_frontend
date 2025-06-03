import Stomp from 'stompjs';
import api from '@api/api';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SendIcon from '@assets/chat/send-icon.svg?react';
import QuitButtonIcon from '@assets/chat/quit-button.svg?react';
import UserImage from '@assets/icons/user-image.svg';
import { Container } from '@components/shared/UIStyles';
import { Avatar } from '@components/Chat/shared/Avatar';
import { ButtonStyle } from '@components/shared/ButtonStyle';

// 날짜 구분선
function DateSeparator({ date }) {
  return <DateSeparatorLine>{date}</DateSeparatorLine>;
}

DateSeparator.propTypes = {
  date: PropTypes.string.isRequired,
};

// 메시지 아이템
function MessageItem({ msg }) {
  if (msg.mine) {
    return (
      <MyMessage>
        <MsgMetaCol $align="right">
          {msg.unreadCount === 0 ? (
            <CheckMark>✔</CheckMark>
          ) : (
            <UnreadText>{msg.unreadCount}</UnreadText>
          )}
          <MsgTime>{msg.time}</MsgTime>
        </MsgMetaCol>
        <MyMsgBubble>{msg.content}</MyMsgBubble>
      </MyMessage>
    );
  }
  return (
    <OtherMessageRow>
      <Avatar src={UserImage} alt={msg.senderNickname} />
      <OtherMsgContent>
        <SenderName>{msg.senderNickname}</SenderName>
        <MsgBubbleRow>
          <OtherMsgBubble>{msg.content}</OtherMsgBubble>
          <MsgMetaCol $align="left">
            {msg.unreadCount === 0 ? (
              <CheckMark>✔</CheckMark>
            ) : (
              <UnreadText>{msg.unreadCount}</UnreadText>
            )}
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
    senderNickname: PropTypes.string,
  }),
};

export function MessageList({ room, onQuit }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const listRef = useRef();
  const navigate = useNavigate();

  const stompRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectError, setConnectError] = useState(null);

  const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8080/connect';
  const token = localStorage.getItem('accessToken');
  const myEmail = localStorage.getItem('userEmail');

  // 상품 정보
  const product = room.product || {};
  const productImage = Array.isArray(product.imageUrl)
    ? product.imageUrl[0]
    : product.imageUrl || '';
  const productTitle = product.title || '';
  const productPrice = Number(product.price) || 0;
  const maxParticipants = Number(product.maxParticipants) || 1;

  const unitPrice = maxParticipants > 0 ? Math.round(productPrice / maxParticipants) : productPrice;

  // 날짜/시간 분리 함수
  function parseDateTime(isoString) {
    if (!isoString) return { date: '', time: '' };
    const dateObj = new Date(isoString);
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const hh = String(dateObj.getHours()).padStart(2, '0');
    const min = String(dateObj.getMinutes()).padStart(2, '0');
    return {
      date: `${yyyy}-${mm}-${dd}`,
      time: `${hh}:${min}`,
    };
  }

  // 1. 최초 진입 시 REST로 메시지 이력 한 번 불러오기
  useEffect(() => {
    if (!room?.roomId) return;
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/api/chats/history/${room.roomId}`);
        if (res.data.status === 'OK') {
          const msgs = (res.data.data || []).map((msg) => {
            const { date, time } = parseDateTime(msg.createdTime);
            return {
              id: msg.id || `${msg.roomId}-${msg.createdTime}`,
              content: msg.message,
              senderNickname: msg.senderNickname,
              unreadCount: typeof msg.readMessageCount === 'number' ? msg.readMessageCount : 0,
              time,
              date,
              mine: msg.senderEmail === myEmail,
            };
          });
          setMessages(msgs);
        }
      } catch {
        setMessages([]);
      }
    };
    fetchMessages();
  }, [room?.roomId, myEmail]);

  // 2. WebSocket 연결 및 구독
  useEffect(() => {
    if (!room?.roomId || !token) return;
    setIsConnected(false);
    setConnectError(null);

    // Bearer prefix 제거
    const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
    const socketUrl = `${WS_URL}?token=${encodeURIComponent(cleanToken)}`;

    const socket = new WebSocket(socketUrl);
    const stompClient = Stomp.over(socket);
    stompRef.current = stompClient;

    stompClient.connect(
      {},
      () => {
        setIsConnected(true);
        console.log('WebSocket 연결 성공');
        setConnectError(null);
        stompClient.subscribe(`/topic/${room.roomId}`, (message) => {
          const data = JSON.parse(message.body);
          setMessages((prev) => [...prev, data]);
        });
      },
      (error) => {
        setIsConnected(false);
        setConnectError('연결 실패. 로그인 상태를 확인하거나 다시 시도하세요.');
        console.error('WebSocket 연결 실패:', error);
      }
    );
    stompClient.onStompError = () => {
      setIsConnected(false);
      setConnectError('STOMP 오류 발생');
      console.error('STOMP 에러');
    };
    stompClient.onWebSocketError = () => {
      setIsConnected(false);
      setConnectError('WebSocket 에러 발생');
      console.error('WebSocket 에러');
    };

    return () => {
      if (stompRef.current && stompRef.current.connected) {
        stompRef.current.disconnect(() => {
          setIsConnected(false);
        });
      }
    };
  }, [room?.roomId, token, WS_URL]);

  // 스크롤 하단 이동
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  // 메시지 전송
  const handleSend = () => {
    if (!inputValue.trim() || !room?.roomId) return;
    if (stompRef.current && isConnected) {
      stompRef.current.send(
        `/publish/${room.roomId}`,
        {},
        JSON.stringify({
          roomId: Number(room.roomId),
          message: inputValue,
          //senderEmail: myEmail
        })
      );
      setInputValue('');
    } else {
      alert(connectError || '채팅 서버에 연결 중입니다. 잠시 후 다시 시도해주세요.');
    }
  };

  // 게시글 상세페이지 이동
  const handleView = () => {
    const productId = room.product?.productId;
    if (productId) {
      navigate(`/detail/${productId}`);
    }
  };

  let lastDate = null;

  return (
    <>
      <MainHeader>
        <MainRow>
          <MainHeaderLeft>
            <MainTitle>
              {room.product?.title
                ? `${room.product.title} 단톡방`
                : room.title
                  ? `${room.title} 단톡방`
                  : '단톡방'}
            </MainTitle>
          </MainHeaderLeft>
          {!room.isHost && (
            <QuitButtonWrapper onClick={onQuit}>
              <QuitButtonIcon width={32} height={32} />
            </QuitButtonWrapper>
          )}
        </MainRow>
        <MainRow>
          <ProductInfo>
            <ProductAvatar src={productImage} alt="" />
            <ProductDetails>
              <ProductName>{productTitle}</ProductName>
              <ProductPrice>{unitPrice.toLocaleString()}원 ~</ProductPrice>
            </ProductDetails>
            <ViewButton onClick={handleView}>View</ViewButton>
          </ProductInfo>
        </MainRow>
      </MainHeader>
      <MessageListBox ref={listRef}>
        {messages.map((msg, idx) => {
          const showDate = msg.date !== lastDate;
          lastDate = msg.date;
          return (
            <React.Fragment key={msg.id || idx}>
              {showDate && <DateSeparator date={msg.date} />}
              <MessageItem msg={msg} />
            </React.Fragment>
          );
        })}
      </MessageListBox>
      <InputArea>
        <InputBox
          placeholder="메시지를 입력하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <SendButton onClick={handleSend}>
          <SendIcon />
        </SendButton>
      </InputArea>
    </>
  );
}

MessageList.propTypes = {
  room: PropTypes.object.isRequired,
  onQuit: PropTypes.func.isRequired,
};

export default MessageList;

const MainHeader = styled(Container)`
  width: 100%;
  height: 155px;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;

  justify-content: space-between;
  gap: 12px;
`;

const MainRow = styled(Container)`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
`;

const MainHeaderLeft = styled(Container)`
  flex-direction: row;
  margin-left: 12px;
`;

const MainTitle = styled.div`
  ${({ theme }) => theme.fontStyles.Body6};
  font-weight: 600;
  color: #333;
`;

const QuitButtonWrapper = styled.button`
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const ProductInfo = styled(Container)`
  width: 100%;
  height: 72px;
  padding: 12px;

  flex-direction: row;
  background: #f9fbff;
  border-radius: 4px;
`;

const ProductAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  margin-right: 12px;
`;

const ProductDetails = styled(Container)`
  flex: 1;
  align-items: flex-start;
  gap: 5px;
`;

const ProductName = styled.p`
  ${({ theme }) => theme.fontStyles.Body7};
  font-weight: 600;
  color: #555;
`;

const ProductPrice = styled.p`
  ${({ theme }) => theme.fontStyles.Body8};
  font-weight: 500;
  color: #666;
`;

const ViewButton = styled(ButtonStyle)`
  width: 62px;
  height: 36px;
  ${({ theme }) => theme.fontStyles.Body7};

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const MessageListBox = styled(Container)`
  width: 100%;
  padding: 16px;
  background: #f9fafb;
  overflow-y: auto;
  align-items: stretch;
  gap: 10px;
  flex: 1;
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
  align-items: ${({ $align }) => ($align === 'right' ? 'flex-end' : 'flex-start')};
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

const CheckMark = styled.span`
  color: #3092fa;
  ${({ theme }) => theme.fontStyles.Body7};
  margin-right: 2px;
  vertical-align: middle;
`;
