import UserImage from '@assets/icons/user-image.svg';
import GroupImage from '@assets/chat/group-image.svg';

// 날짜 생성 함수 (2025-05-01 ~ 2025-05-20 중 랜덤)
function getDateByIndex(j) {
  const baseDay = 13 + Math.floor(j / 10); // 0~9: 13일, 10~19: 14일, 20~29: 15일
  return `2025년 5월 ${baseDay}일`;
}

const isReadArr = [false, true, false, true];

// 채팅방 n개 생성 : length로 조정
export const chatRooms = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  title: `채팅방 ${i + 1} - 사용자1, 사용자2, 사용자3`,
  lastMessage: `마지막 메시지 내용 ${i + 1}을 보여드리겠습니다.`,
  time: `${10 + (i % 12)}:${(30 + (i % 30)).toString().padStart(2, '0')}`,
  avatar: GroupImage,
  active: i === 0, // 첫 번째 방이 기본 active
  product: {
    name: `상품명 ${i + 1}`,
    price: `${4000 + (i + 1) * 100}원`,
    imageUrl:
      'https://ecimg.cafe24img.com/pg341b66939846097/kyungilfood21/web/product/big/20230627/0fcc8e793bccc78d0934866b8400e95e.jpg',
  },
  unreadCount: [2, 0, 1, 3][i],
  isRead: isReadArr[i],
}));

// 각 채팅방마다 30개 메시지 생성
export const messagesByRoom = {};
chatRooms.forEach((room) => {
  messagesByRoom[room.id] = Array.from({ length: 30 }, (_, j) => ({
    id: j + 1,
    sender: `사용자 ${j + 1}`,
    content: `메시지 내용 ${j + 1} in 방 ${room.id}`,
    date: getDateByIndex(j),
    time: `${10 + (j % 12)}:${(15 + (j % 45)).toString().padStart(2, '0')}`,
    mine: j % 2 === 0,
    unreadCount: room.unreadCount,
    avatar: j % 2 === 1 ? UserImage : null,
  }));
});
