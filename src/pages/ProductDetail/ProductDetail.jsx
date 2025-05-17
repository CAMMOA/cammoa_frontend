import { Container } from '@components/shared/UIStyles';
import { mockItems } from '@components/SearchItem/Mock/SearchItemData';
import styled from 'styled-components';

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
            <Title>카테고리</Title>
            <SubTitle>식품</SubTitle>
          </ProductContainer>
          <ProductContainer>
            <Title>모집기한</Title>
            <SubTitle>2025.05.05 ~ 2025.07.25</SubTitle>
          </ProductContainer>
          <ProductContainer>
            <Title>장소</Title>
            <SubTitle>기숙사C동 앞 광장</SubTitle>
          </ProductContainer>
        </ProductInfo>
      </DetailBody>
    </ProductDetailContainer>
  );
};

export default ProductDetail;

const ProductDetailContainer = styled(Container)`
  padding-top: 50px;
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

  align-items: flex-start;
  gap: 22px;
`;

const ProductTitle = styled.p`
  color: #333;
  ${({ theme }) => theme.fontStyles.Body4};
  font-weight: 500;
  line-height: 148%;
  letter-spacig: -0.5px;
`;

const ProudctPrice = styled.p`
  padding: 15px 0;
  color: #333;
  ${({ theme }) => theme.fontStyles.Body2};
  line-height: 107%;
  letter-spacing: -0.5px;
`;
const ProductContainer = styled.div`
  width: 100%;
  padding: 18px 0;
  border-top: 1px solid #f4f4f4;

  display: flex;
`;
const Title = styled.p`
  width: 114px;
  color: #666;
  ${({ theme }) => theme.fontStyles.Body7};
  font-size: 13px;
  line-height: 146%;
`;
const SubTitle = styled.p`
  color: #333;
  ${({ theme }) => theme.fontStyles.Body7};
  font-size: 13px;
  line-height: 147%;
`;
