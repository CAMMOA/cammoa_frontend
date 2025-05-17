import { Container } from '@components/shared/UIStyles';
import { mockItems } from '@components/SearchItem/Mock/SearchItemData';
import styled from 'styled-components';
import { ButtonStyle } from '@components/shared/ButtonStyle';

const ProductDetail = () => {
  const firstItem = mockItems[0];

  return (
    <ProductDetailContainer>
      <DetailBody>
        <ProductImage src={firstItem.imageUrl} />
        <ProductInfo>
          <ProductTitle>{firstItem.title}</ProductTitle>
          <ProudctPrice>{firstItem.price}원~</ProudctPrice>
          <ProductContainer>
            <InfoTitle>카테고리</InfoTitle>
            <InfoSubTitle>식품</InfoSubTitle>
          </ProductContainer>
          <ProductContainer>
            <InfoTitle>모집기한</InfoTitle>
            <InfoSubTitle>2025.05.05 ~ 2025.07.25</InfoSubTitle>
          </ProductContainer>
          <ProductContainer>
            <InfoTitle>장소</InfoTitle>
            <InfoSubTitle>기숙사C동 앞 광장</InfoSubTitle>
          </ProductContainer>
          <ParticipateButton>공동구매 참여하기</ParticipateButton>
        </ProductInfo>
      </DetailBody>
      <ProductExplainContainer>
        <ExplainHeader>작성자의 설명</ExplainHeader>
        <ExplainText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet, ante in vehicula
          tincidunt, lorem nibh facilisis sem, ac viverra eros diam at leo. Nunc fringilla
          scelerisque faucibus. Duis porttitor diam vel metus suscipit cursus non in diam.
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
          egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec egestas
          aliquet nisl, ut tempor erat pulvinar eget. Donec laoreet urna ullamcorper elit
          sollicitudin ultrices. Fusce vehicula, dui ac euismod pellentesque, nisi mi posuere nulla,
          in pharetra nisl enim in urna. Nullam convallis dolor a dolor vestibulum, quis.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Fusce imperdiet, ante in vehicula tincidunt,
          lorem nibh facilisis sem, ac viverra eros diam at leo. Nunc fringilla scelerisque
          faucibus. Duis porttitor diam vel metus suscipit cursus non in diam. Pellentesque habitant
          morbi tristique senectus et netus et malesuada fames ac turpis egestas. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Donec egestas aliquet nisl, ut tempor
          erat pulvinar eget. Donec laoreet urna ullamcorper elit sollicitudin ultrices. Fusce
          vehicula, dui ac euismod pellentesque, nisi mi posuere nulla, in pharetra nisl enim in
          urna. Nullam convallis dolor a dolor vestibulum, quis.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Fusce imperdiet, ante in vehicula tincidunt, lorem nibh
          facilisis sem, ac viverra eros diam at leo. Nunc fringilla scelerisque faucibus. Duis
          porttitor diamtempor erat pulvinar eget. Donec laoreet urna ullamcorper elit sollicitudin
          ultrices. Fusce vehicula, dui ac euismod pellentesque, nisi mi posuere nulla, in pharetra
          nisl enim in urna. Nullam convallis dolor a dolo 1500자 크기 테스트 좀 해봤어요
        </ExplainText>
      </ProductExplainContainer>
    </ProductDetailContainer>
  );
};

export default ProductDetail;

const ProductDetailContainer = styled(Container)`
  width: fit-content;
  padding-top: 55px;
  gap: 50px;
`;
const ProductImage = styled.img`
  width: 448px;
  height: 448px;
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

const ProudctPrice = styled.p`
  height: 91px;
  padding: 15px 0;
  color: #333;
  ${({ theme }) => theme.fontStyles.Body2};
  line-height: 107%;
  letter-spacing: -0.5px;
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

const ParticipateButton = styled(ButtonStyle)`
  width: 338px;
  height: 56px;
  margin-top: 22px;
  padding: 0px 10px;
  font-size: 15px;
`;

const ProductExplainContainer = styled(Container)`
  width: 100%;
  align-items: flex-start;
  gap: 30px;
`;
const ExplainHeader = styled.p`
  width: 100%;
  padding-bottom: 21px;
  border-bottom: 1px solid #E6E6E6;

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
