import { useState } from 'react';
import styled from 'styled-components';
import { chatRooms, messagesByRoom } from './MockData/MockData';
import LogoIcon from '@assets/chat/logo-icon.svg?react';
import { ChatRoomList, QuitButton, MessageList, ChatInput } from '@components/Chat/ChatComponent';

const Chat = () => {
  const initialActiveRoom = chatRooms.find((r) => r.active) || chatRooms[0];
  const [activeRoomId, setActiveRoomId] = useState(initialActiveRoom.id);
  const [inputValue, setInputValue] = useState('');

  const activeRoom = chatRooms.find((room) => room.id === activeRoomId);
  const messages = messagesByRoom[activeRoomId] || [];

  const handleSend = () => {
    // 메시지 전송 로직 구현 필요
    setInputValue('');
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
          <MainHeader>
            <MainRow>
              <MainHeaderLeft>
                <Avatar src={activeRoom.avatar} alt={activeRoom.title} size="40px" />
                <MainTitle>{activeRoom.title}</MainTitle>
              </MainHeaderLeft>
              <QuitButton />
            </MainRow>
            <MainRow>
              <ProductInfo>
                <ProductAvatar src={activeRoom.product.imageUrl} alt="상품" />
                <ProductDetails>
                  <ProductName>{activeRoom.product.name}</ProductName>
                  <ProductPrice>{activeRoom.product.price}</ProductPrice>
                </ProductDetails>
                <ViewButton>View</ViewButton>
              </ProductInfo>
            </MainRow>
          </MainHeader>
          <MessageList messages={messages} />
          <ChatInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSend={handleSend}
          />
        </MainPanel>
      </ChatContainer>
    </ChatWrapper>
  );
};

export default Chat;

// 스타일 컴포넌트 정의
const ChatWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding-bottom: 135px;
`;

const ChatContainer = styled.div`
  width: 1050px;
  min-width: 1050px;
  min-height: 645px;
  display: flex;
  margin: 200px auto 0;
  background: #fff;
`;

const Sidebar = styled.div`
  width: 300px;
  height: 645px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fff;
  border: 1px solid #ced4da;
  border-right: none;
  border-radius: 4px 0 0 4px;
`;

const SidebarHeader = styled.div`
  height: 73px;
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 16px;
`;

const SidebarTitle = styled.div`
  ${({ theme }) => theme.fontStyles.Body5};
  font-weight: 700;
  color: #333;
`;

const MainPanel = styled.div`
  width: 750px;
  height: 645px;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #ced4da;
  border-radius: 0 4px 4px 0;
`;

const MainHeader = styled.div`
  height: 155px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid #e5e7eb;
  padding: 16px;
`;

const MainRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MainHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const MainTitle = styled.div`
  ${({ theme }) => theme.fontStyles.Body6};
  font-weight: 600;
  color: #333;
`;

const Avatar = styled.img`
  width: ${({ size }) => size || '48px'};
  height: ${({ size }) => size || '48px'};
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
`;

const ProductInfo = styled.div`
  width: 718px;
  height: 72px;
  display: flex;
  align-items: center;
  position: relative;
  background: #f9fafb;
  border-radius: 4px;
  padding: 12px;
`;

const ProductAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  margin-right: 12px;
`;

const ProductDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const ProductName = styled.div`
  ${({ theme }) => theme.fontStyles.Body7};
  font-weight: 600;
  color: #555;
`;

const ProductPrice = styled.div`
  ${({ theme }) => theme.fontStyles.Body8};
  font-weight: 500;
  color: #666;
`;

const ViewButton = styled.button`
  ${({ theme }) => theme.fontStyles.Body7};
  width: 62px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3092fa;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
