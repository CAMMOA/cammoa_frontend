import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';
import Camera from '@assets/icons/image-icon.svg?react';

const Post = () => {
  return (
    <PostContainer>
      <PostHeader>상품 설명</PostHeader>
      <PostBody>
        <ProductImageContainer>
          <ProductImageText>상품 이미지</ProductImageText>
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
const ProductImageText = styled.p`
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
