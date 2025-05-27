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

  const originPrice = detail.price;
  const unitPrice = detail.maxParticipants
    ? Math.round(detail.price / detail.maxParticipants).toLocaleString()
    : detail.price.toLocaleString();

  const created = formatDate(detail.createdAt || detail.updatedAt);
  const deadline = formatDate(detail.deadline);

  const isLoggedIn = !!localStorage.getItem('user');
  const handleParticipate = () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요.');
      navigate('/Login');
    } else {
      if (window.confirm('공동구매에 참여하시겠습니까?')) {
        navigate('/chat');
      }
    }
  };
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
        <ParticipateButton onClick={handleParticipate}>공동구매 참여하기</ParticipateButton>
        <InquiryButton onClick={handleInquiry}>1 : 1 문의하기</InquiryButton>
      </ButtonRow>
    </ProductInfo>
  );
};

ProductInfoAndButtons.propTypes = {
  detail: PropTypes.shape({
    price: PropTypes.number,
    maxParticipants: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    deadline: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    place: PropTypes.string,
  }),
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
