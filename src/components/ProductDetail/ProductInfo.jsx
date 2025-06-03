import api from '@api/api';
import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';
import { ButtonStyle } from '@components/shared/ButtonStyle';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CATEGORY_LABELS = {
  FOOD: '식품',
  WATER_DRINK: '생수 · 음료',
  LIVING: '생활용품',
  STATIONERY: '문구류',
  BEAUTY: '화장품',
};
function getCategoryLabel(code) {
  return CATEGORY_LABELS[code] || code;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const ProductInfoAndButtons = ({ detail }) => {
  const navigate = useNavigate();

  const postId = detail.productId || detail.id;

  const originPrice = detail.price;
  const maxParticipants = detail.maxParticipants || 1;
  const currentParticipants = detail.currentParticipants || 0;
  const unitPrice = Math.round(originPrice / maxParticipants).toLocaleString();

  const created = formatDate(detail.createdAt || detail.updatedAt);
  const deadline = formatDate(detail.deadline);

  const isLoggedIn = !!localStorage.getItem('accessToken');
  const isClosed = currentParticipants >= maxParticipants;

  // 공동구매 참여 버튼 클릭 시
  const handleParticipate = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    if (!detail.productId) {
      alert('잘못된 상품 정보입니다.');
      return;
    }

    try {
      // 1. 공동구매 상태 확인
      const statusRes = await api.get(`/api/group-buyings/${postId}/status`);
      const isJoined = statusRes.data?.data?.isJoined;

      if (isJoined) {
        if (window.confirm('이미 참여한 공동구매입니다! 채팅화면으로 이동하시겠습니까?')) {
          navigate('/chat');
        }
        return;
      }

      if (window.confirm('공동구매에 참여하시겠습니까?')) {
        const joinRes = await api.post('/api/group-buyings/join', { postId });
        console.log('공동구매 참여 성공, joinRes:', joinRes.data);
        const chatRes = await api.post(`/api/posts/${postId}/chat/join`);
        console.log('채팅방 입장 성공, chatRes:', chatRes.data);
        if (chatRes.data.status === 'OK' && chatRes.data.data?.roomId) {
          const roomId = chatRes.data.data.roomId;
          navigate('/chat', { state: { roomId } });
        } else {
          alert('채팅방 입장에 실패했습니다.');
        }
      }
    } catch (e) {
      console.error('공동구매 참여 실패:', e.response?.data || e);
      const msg = e.response?.data?.message || '';
      if (e.response?.status === 409 && msg.includes('already joined')) {
        if (window.confirm('이미 참여한 공동구매입니다! 채팅화면으로 이동하시겠습니까?')) {
          navigate('/chat');
        }
      } else if (msg.includes('closed')) {
        alert('마감된 공동구매입니다.');
      } else if (msg.includes('forbidden')) {
        alert('작성자는 본인 게시글에 참여할 수 없습니다.');
      } else if (e.response?.status === 401) {
        alert('로그인 정보가 유효하지 않습니다. 다시 로그인 해주세요.');
        navigate('/login');
      } else if (e.response?.status === 404) {
        alert('존재하지 않는 게시글입니다.');
      } else {
        alert('채팅방 참여에 실패했습니다.');
      }
    }
  };

  // 1:1 문의하기 버튼 클릭 시
  const handleInquiry = () => {
    alert('아직 구현 못했습니다! :(');
  };

  return (
    <ProductInfo>
      <ProductTitle>{detail.title}</ProductTitle>
      <PriceBlock>
        <ProductPrice>{unitPrice}원 ~</ProductPrice>
        <OriginPrice>{originPrice.toLocaleString()}원</OriginPrice>
      </PriceBlock>
      <ProductContainer>
        <InfoTitle>카테고리</InfoTitle>
        <InfoSubTitle>{getCategoryLabel(detail.category)}</InfoSubTitle>
      </ProductContainer>
      <ProductContainer>
        <InfoTitle>모집기한</InfoTitle>
        <InfoSubTitle>
          {created} ~ {deadline}
        </InfoSubTitle>
      </ProductContainer>
      <ProductContainer>
        <InfoTitle>장소</InfoTitle>
        <InfoSubTitle>{detail.place}</InfoSubTitle>
      </ProductContainer>
      <ButtonRow>
        <ParticipateButton onClick={handleParticipate} $closed={isClosed} disabled={isClosed}>
          {isClosed ? '모집 마감' : '공동구매 참여하기'}
        </ParticipateButton>
        <InquiryButton onClick={handleInquiry}>1 : 1 문의하기</InquiryButton>
      </ButtonRow>
    </ProductInfo>
  );
};

ProductInfoAndButtons.propTypes = {
  detail: PropTypes.shape({
    id: PropTypes.number,
    productId: PropTypes.number,
    price: PropTypes.number,
    maxParticipants: PropTypes.number,
    currentParticipants: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    deadline: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    place: PropTypes.string,
  }).isRequired,
};

export default ProductInfoAndButtons;

const ProductInfo = styled(Container)`
  width: 537px;
  height: 448px;
  align-items: flex-start;
  gap: 22px;
`;
const ProductTitle = styled.p`
  height: 68px;
  color: #333;
  ${({ theme }) => theme.fontStyles.Body4};
  font-weight: 500;
  line-height: 148%;
  letter-spacig: -0.5px;
`;
const PriceBlock = styled(Container)`
  height: 60px;
  align-items: flex-start;
  gap: 8px;
`;
const ProductPrice = styled.p`
  color: #333;
  ${({ theme }) => theme.fontStyles.Body2};
  line-height: 107%;
  letter-spacing: -0.5px;
`;
const OriginPrice = styled.p`
  color: #b5b5b5;
  ${({ theme }) => theme.fontStyles.Body6};
  line-height: 100%;
  letter-spacing: -0.5px;
  text-decoration-line: line-through;
`;
const ProductContainer = styled.div`
  width: 100%;
  margin-bottom: -22px;
  padding: 18px 0;
  border-top: 1px solid #f4f4f4;
  display: flex;
`;
const InfoTitle = styled.p`
  width: 114px;
  color: #666;
  ${({ theme }) => theme.fontStyles.Body7};
  font-size: 13px;
  line-height: 146%;
`;
const InfoSubTitle = styled.p`
  color: #333;
  ${({ theme }) => theme.fontStyles.Body7};
  font-size: 13px;
  line-height: 147%;
`;
const ButtonRow = styled(Container)`
  margin-top: 52px;
  flex-direction: row;
  gap: 24px;
`;
const ParticipateButton = styled(ButtonStyle)`
  width: 358px;
  height: 56px;
  padding: 0px 10px;
  font-size: 15px;

  background: ${({ $closed }) => ($closed ? '#eee' : undefined)};
  color: ${({ $closed }) => ($closed ? '#aaa' : undefined)};
  cursor: ${({ $closed }) => ($closed ? 'not-allowed' : 'pointer')};
`;

const InquiryButton = styled(ButtonStyle)`
  width: 155px;
  height: 56px;
  padding: 1px 11px;
  font-size: 15px;
  border: 2px solid #ddd;
  background: #fff;
  color: #b5b5b5;
  font-weight: 500;
`;
