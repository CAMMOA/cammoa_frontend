import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';
import Camera from '@assets/icons/image-icon.svg?react';
import CategoryTabItem from '@components/Post/categoryItem';

const Post = () => {
  const categories = [
    { label: '식품' },
    { label: '상수·음료' },
    { label: '생활용품' },
    { label: '문구류' },
    { label: '화장품' },
    { label: '화장품' },
  ];

  return (
    <PostContainer>
      <PostHeader>상품 설명</PostHeader>
      <PostBody>
        <ProductImageContainer>
          <ProductText>상품 이미지</ProductText>
          <ProductImage>
            <Image>
              <Camera />
              <SubTitle>이미지 등록</SubTitle>
            </Image>
            <Title>
              이미지는 1:1 비율로 보여지며, 첫 번째로 업로드한 이미지가 대표 이미지로 사용됩니다 :
            </Title>
          </ProductImage>
        </ProductImageContainer>
        <ProductContainer>
          <ProductNameText>상품명</ProductNameText>
          <ProductNameInput placeholder="상품명을 입력해 주세요." />
        </ProductContainer>
        <ProductContainer>
          <ProductNameText>카테고리</ProductNameText>
          <CategoryItemWrapper>
            {categories.map((item, idx) => (
              <CategoryTabItem key={idx} label={item.label} active={item.label === '생활용품'} />
            ))}
          </CategoryItemWrapper>
        </ProductContainer>
      </PostBody>
    </PostContainer>
  );
};

export default Post;

const PostContainer = styled(Container)`
  margin-top: 175px;
`;
const PostHeader = styled.p`
  width: 1065px;
  padding: 37px 0;
  border-bottom: 2px solid #191919;

  color: #191919;
  ${({ theme }) => theme.fontStyles.Body3};
  font-weight: 700;
  line-height: 107%;
  letter-spacing: -0.5px;
`;
const PostBody = styled(Container)`
  width: 1065px;
  align-items: flex-start;
`;
const ProductImageContainer = styled(Container)`
  padding: 32px 0;
  flex-direction: row;
  align-items: flex-start;
  gap: 24px;
`;
const ProductText = styled.p`
  width: 155px;
  color: #191919;
  ${({ theme }) => theme.fontStyles.Body6};
  line-height: 107%;
  letter-spacing: -0.5px;
`;

const ProductImage = styled(Container)`
  align-items: flex-start;
  gap: 15px;
`;
const Image = styled(Container)`
  width: 188px;
  padding: 69px 0px 55px 0px;
  background: #fafafa;

  gap: 15px;
`;
const SubTitle = styled.p`
  color: #666;
  ${({ theme }) => theme.fontStyles.Body7};
  line-height: 107%;
`;

const Title = styled.p`
  color: #666666;
  ${({ theme }) => theme.fontStyles.Body7};
  font-size: 13px;
  line-height: 193%;
`;

const ProductContainer = styled(Container)`
  padding: 32px 0;

  flex-direction: row;
  gap: 24px;
`;
const ProductNameText = styled(ProductText)`
  padding: 12px 0;
`;
const ProductNameInput = styled.input`
  width: 782px;
  padding: 16px;

  color: #8c8c8c;
  ${({ theme }) => theme.fontStyles.Body7};
  border-radius: 2px;
  border: 1px solid #b2b2b2;
`;
const CategoryItemWrapper = styled.div``;
