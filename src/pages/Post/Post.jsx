import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';
import Camera from '@assets/icons/image-icon.svg?react';
import CategoryTabItem from '@components/Post/categoryItem';
import { useState } from 'react';

const Post = () => {
  const categories = [
    { label: '식품' },
    { label: '상수·음료' },
    { label: '생활용품' },
    { label: '문구류' },
    { label: '화장품' },
    { label: '화장품' },
  ];
  const MAX_LENGTH = 1500;
  const [text, setText] = useState('');
  const handleChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= MAX_LENGTH) {
      setText(newText);
    }
  };

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
          <ProductNameText>게시글 제목</ProductNameText>
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
        <ProductPlainContainer>
          <ProductText>설명</ProductText>
          <ProductTextarea
            value={text}
            onChange={handleChange}
            placeholder="내용을 입력해주세요."
          />
          <CharCount>
            {text.length}/{MAX_LENGTH}
          </CharCount>
        </ProductPlainContainer>
      </PostBody>
      <PostHeader>공동구매 정보</PostHeader>
      <PostBody>
        <ProductContainer>
          <ProductText>가격</ProductText>
          <InputWrapper>
            <ProductPriceInput placeholder="가격을 입력해주세요." />
            <PriceText>원</PriceText>
          </InputWrapper>
        </ProductContainer>
        <ProductContainer>
          <ProductText>인원</ProductText>
          <InputWrapper>
            <ProductPriceInput placeholder="인원을 엽력해주세요. (최대 5명)" />
            <PriceText>명</PriceText>
          </InputWrapper>
        </ProductContainer>
        <ProductContainer>
          <ProductText>인원</ProductText>
          <InputWrapper>
            <ProductPriceInput placeholder="인원을 엽력해주세요. (최대 5명)" />
            <PriceText>명</PriceText>
          </InputWrapper>
        </ProductContainer>
        <ProductContainer>
          <ProductText>인원</ProductText>
          <InputWrapper>
            <ProductPriceInput placeholder="인원을 엽력해주세요. (최대 5명)" />
            <PriceText>명</PriceText>
          </InputWrapper>
        </ProductContainer>
      </PostBody>
      <RegisterButton>등록하기</RegisterButton>
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
  width: 100%;
  padding: 32px 0;

  flex-direction: row;
  gap: 24px;
`;
const ProductNameText = styled(ProductText)`
  padding: 12px 0;
`;
const ProductNameInput = styled.input`
  width: 75%;
  padding: 16px;

  color: #8c8c8c;
  ${({ theme }) => theme.fontStyles.Body7};
  border-radius: 2px;
  border: 1px solid #b2b2b2;
`;
const CategoryItemWrapper = styled.div`
  width: 75%;
  display: flex;
`;
const ProductPlainContainer = styled(ProductContainer)`
  margin-bottom: 20px;
  align-items: flex-start;
  position: relative;
`;
const ProductTextarea = styled.textarea`
  width: 75%;
  height: 165px;
  padding: 20px;

  resize: none;
  border: 2px solid #b2b2b2;
  color: #8c8c8c;
  ${({ theme }) => theme.fontStyles.Body7};
  line-height: 161%;
`;

const CharCount = styled.span`
  position: absolute;
  bottom: 50px;
  right: 100px;
  color: #8c8c8c;
  ${({ theme }) => theme.fontStyles.Body7};
  line-height: 161%;
`;
const InputWrapper = styled.div`
  width: 30%;
  position: relative;
`;
const ProductPriceInput = styled(ProductNameInput)`
  width: 100%;
`;
const PriceText = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  color: #8c8c8c;
  ${({ theme }) => theme.fontStyles.Body7};
`;
const RegisterButton = styled.button`
  margin: 70px 0 50px 0;
  width: 240px;
  height: 56px;
  border-radius: 3px;
  background: #3092fa;
  color: #ffffff;
`;
