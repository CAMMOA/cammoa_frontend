import { useState } from 'react';
import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';
import CategoryTabItem from '@components/Post/categoryItem';
import useLimitedInput from '@hooks/useMaxlength';
import { ButtonStyle } from '@components/shared/ButtonStyle';
import useFormattedDate from '@hooks/useFormattedDate';
import ImageUploader from '@components/Post/ImageUploader';

const Post = () => {
  const [files, setImages] = useState([]);

  const categories = [
    { label: '식품' },
    { label: '상수·음료' },
    { label: '생활용품' },
    { label: '문구류' },
    { label: '화장품' },
  ];

  const MAX_TEXT_TITLE = 40;
  const MAX_TEXT_DESCRIPTION = 1500;
  const MAX_LOCATION = 40;

  const [title, handlTITLEChange] = useLimitedInput(MAX_TEXT_TITLE);
  const [explain, handlExplainChange] = useLimitedInput(MAX_TEXT_DESCRIPTION);
  const [location, handlelocationChange] = useLimitedInput(MAX_LOCATION);
  const { value, handleDateChange } = useFormattedDate();

  return (
    <PostContainer>
      <PostHeader>상품 설명</PostHeader>
      <PostBody>
        <ProductImageContainer>
          <ImageNameText>
            상품 이미지<RequiredStar>*</RequiredStar>
            <CountText>({files.length} / 3)</CountText>
          </ImageNameText>
          <ImageManagementContainer>
            <ImageUploader previewSize={188} maxCount={3} onChange={setImages} />
            <ImageText>
              이미지는 1:1 비율로 보여지며, 첫 번째 업로드한 이미지가 대표로 사용됩니다.
            </ImageText>
          </ImageManagementContainer>
        </ProductImageContainer>
        <ProductNameContainer>
          <ProductNameText>
            상품명<RequiredStar>*</RequiredStar>
          </ProductNameText>
          <ProductNameInput
            value={title}
            onChange={handlTITLEChange}
            placeholder="상품명을 입력해 주세요."
          />
          <TitleCounter>
            {title.length}/{MAX_TEXT_TITLE}
          </TitleCounter>
        </ProductNameContainer>
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
            value={explain}
            onChange={handlExplainChange}
            placeholder="내용을 입력해주세요."
          />
          <CharCount>
            {explain.length}/{MAX_TEXT_DESCRIPTION}
          </CharCount>
        </ProductPlainContainer>
      </PostBody>
      <PostHeader>공동구매 정보</PostHeader>
      <PostBody>
        <ProductContainer>
          <ProductText>
            가격<RequiredStar>*</RequiredStar>
          </ProductText>
          <InputWrapper>
            <ProductInput placeholder="가격을 입력해주세요." />
            <InputText>원</InputText>
          </InputWrapper>
        </ProductContainer>
        <ProductContainer>
          <ProductText>
            인원<RequiredStar>*</RequiredStar>
          </ProductText>
          <InputWrapper>
            <ProductInput placeholder="인원을 엽력해주세요. (최대 5명)" />
            <InputText>명</InputText>
          </InputWrapper>
        </ProductContainer>
        <ProductContainer>
          <ProductText>
            기한<RequiredStar>*</RequiredStar>
          </ProductText>
          <InputWrapper>
            <ProductInput
              type="text"
              placeholder="YYYY / MM / DD"
              value={value}
              onChange={handleDateChange}
            />
          </InputWrapper>
        </ProductContainer>
        <ProductContainer>
          <ProductText>
            위치<RequiredStar>*</RequiredStar>
          </ProductText>
          <LocationInputWrapper>
            <ProductInput
              value={location}
              onChange={handlelocationChange}
              placeholder="거래할 위치를 입력해 주세요."
            />
            <Counter>
              {location.length}/{MAX_LOCATION}
            </Counter>
          </LocationInputWrapper>
        </ProductContainer>
      </PostBody>
      <RegisterButton>등록하기</RegisterButton>
    </PostContainer>
  );
};
export default Post;

const PostContainer = styled(Container)`
  margin-top: 20px;
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

const ImageManagementContainer = styled(Container)`
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;

const RequiredStar = styled.span`
  position: relative;
  top: -2px;
  color: #ee6a7b;
  ${({ theme }) => theme.fontStyles.Body8};
  line-height: 142%;
`;

const ImageNameText = styled.p`
  width: 155px;
  color: #191919;
  ${({ theme }) => theme.fontStyles.Body6};
  line-height: 107%;
  letter-spacing: -0.5px;
`;

const CountText = styled.span`
  color: #999;
  ${({ theme }) => theme.fontStyles.Body7};
  padding-left: 25px;
`;

const ProductText = styled.p`
  width: 155px;
  color: #191919;
  ${({ theme }) => theme.fontStyles.Body6};
  line-height: 107%;
  letter-spacing: -0.5px;
`;

const ImageText = styled.p`
  color: #666;
  ${({ theme }) => theme.fontStyles.Body7};
  line-height: 107%;
`;

const ProductContainer = styled(Container)`
  width: 100%;
  padding: 32px 0;

  flex-direction: row;
  gap: 24px;
`;

const ProductNameContainer = styled(ProductContainer)`
  position: relative;
`;

const TitleCounter = styled.span`
  position: absolute;
  right: 100px;
  color: #8c8c8c;
  ${({ theme }) => theme.fontStyles.Body7};
  line-height: 161%;
`;

const ProductNameText = styled(ProductText)`
  padding: 12px 0;
`;
const ProductNameInput = styled.input`
  width: 75%;
  padding: 16px;

  color: #333333;
  ${({ theme }) => theme.fontStyles.Body7};
  &::placeholder {
    color: #8c8c8c;
  }
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
  color: #333333;
  &::placeholder {
    color: #8c8c8c;
  }
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
const ProductInput = styled(ProductNameInput)`
  width: 100%;
`;
const InputText = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  color: #8c8c8c;
  ${({ theme }) => theme.fontStyles.Body7};
`;
const LocationInputWrapper = styled(InputWrapper)`
  width: 75%;
`;
const Counter = styled(CharCount)`
  top: 14px;
  right: 16px;
`;
const RegisterButton = styled(ButtonStyle)`
  margin: 70px 0 50px 0;
  width: 240px;
  height: 56px;
`;
