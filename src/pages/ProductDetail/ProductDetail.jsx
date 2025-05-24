import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';
import { ButtonStyle } from '@components/shared/ButtonStyle';
import LeftIcon from '@assets/icons/image_left.svg?react';
import RightIcon from '@assets/icons/image_right.svg?react';

const FALLBACK_IMAGES = [
  'https://shop-phinf.pstatic.net/20220428_195/1651135623901Ht4we_JPEG/52271451701293203_931912436.jpg?type=m510',
  'https://shop-phinf.pstatic.net/20220422_214/1650588789863JwK9d_JPEG/51724573370488899_275771259.jpg?type=m510',
  'https://shop-phinf.pstatic.net/20220428_121/16511356475725D8ES_JPEG/52271475307941281_252680570.jpg?type=m510',
];

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://15.165.99.110:8080';

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

const ProductDetail = () => {
  const { post_id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgList, setImgList] = useState([]);

  useEffect(() => {
    if (!post_id) return;
    setIsLoading(true);
    setHasError(false);

    axios
      .get(`${API_URL}/api/posts/${post_id}`)
      .then((res) => {
        if (res.data.status === 'OK' && res.data.data) {
          setDetail(res.data.data);
          const images =
            res.data.data.imageUrls && res.data.data.imageUrls.length > 0
              ? res.data.data.imageUrls
              : FALLBACK_IMAGES;
          setImgList(images.slice(0, 3));
          setCurrentIndex(0);
          setIsLoading(false);
        } else {
          setHasError(true);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, [post_id]);

  const handleImgError = (e) => {
    e.target.src = FALLBACK_IMAGES[0];
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (hasError || !detail) return <div>게시글을 불러올 수 없습니다.</div>;

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

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  const handleNext = () => {
    if (currentIndex < imgList.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <ProductDetailContainer>
      <DetailBody>
        <ImageWrapper>
          <NavButton
            $left
            disabled={currentIndex === 0}
            onClick={handlePrev}
            style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
          >
            <LeftIcon width={26} height={28} />
          </NavButton>
          <ProductImage
            src={imgList[currentIndex] || FALLBACK_IMAGES}
            alt={detail.title}
            onError={handleImgError}
          />
          <NavButton
            $right
            disabled={currentIndex === imgList.length - 1}
            onClick={handleNext}
            style={{ opacity: currentIndex === imgList.length - 1 ? 0.5 : 1 }}
          >
            <RightIcon width={26} height={28} />
          </NavButton>
        </ImageWrapper>
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
      </DetailBody>
      <ProductExplainContainer>
        <ExplainHeader>작성자의 설명</ExplainHeader>
        <ExplainText>{detail.description}</ExplainText>
      </ProductExplainContainer>
    </ProductDetailContainer>
  );
};

export default ProductDetail;

const ProductDetailContainer = styled(Container)`
  width: fit-content;
  padding: 55px 0 120px 0;
  gap: 75px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 448px;
  height: 448px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProductImage = styled.img`
  width: 448px;
  height: 448px;
  border-radius: 4px;
`;
const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  padding: 10px 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  z-index: 2;

  ${(props) =>
    props.$left &&
    `
    left: 15px;
  `}
  ${(props) =>
    props.$right &&
    `
    right: 15px;
  `}
`;

const DetailBody = styled(Container)`
  flex-direction: row;
  gap: 65px;
`;

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

const ProductExplainContainer = styled(Container)`
  width: 100%;
  align-items: flex-start;
  gap: 30px;
`;
const ExplainHeader = styled.p`
  width: 100%;
  padding-bottom: 21px;
  border-bottom: 1px solid #e6e6e6;

  color: #141313;
  ${({ theme }) => theme.fontStyles.Body4};
  font-weight: 500;
  line-height: 134%:
`;
const ExplainText = styled.p`
  width: 1050px;

  color: #333;
  ${({ theme }) => theme.fontStyles.Body7};
  font-size: 15px;
  line-height: 161%;
`;
