import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';
import CategoryTabItem from '@components/Post/categoryItem';
import useLimitedInput from '@hooks/useMaxlength';
import { ButtonStyle } from '@components/shared/ButtonStyle';
import useFormattedDate from '@hooks/useFormattedDate';
import { useState } from 'react';
import ImageUpload from '@components/Post/ImageUpload';
import { createPost, uploadPostImages, updatePostMainImage, deletePost } from '@api/post/post';

const Post = () => {
  const categories = [
    { label: '식품' },
    { label: '생수·음료' },
    { label: '생활용품' },
    { label: '문구류' },
    { label: '화장품' },
  ];
  const MAX_TITLE = 40;
  const MAX_TEXT = 1500;
  const MAX_LOCATION = 40;

  const [title, handleTitleChange] = useLimitedInput(MAX_TITLE);
  const [explain, handlExplainChange] = useLimitedInput(MAX_TEXT);
  const [location, handlelocationChange] = useLimitedInput(MAX_LOCATION);
  const { value, handleDateChange } = useFormattedDate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState('');
  const [people, setPeople] = useState('');
  const [images, setImages] = useState([]);
  const deadline = value.replace(/\s*\/\s*/g, '-') + 'T23:59:59';

  const handleImageChange = (fileList) => {
    const newFiles = Array.from(fileList);
    setImages((prev) => {
      const combined = [...prev, ...newFiles];
      return combined.length > 3 ? newFiles : combined;
    });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    const requestBody = {
      title,
      description: explain,
      category: convertCategoryToEnum(selectedCategory),
      price: Number(price),
      maxParticipants: Number(people),
      numPeople: 1,
      image: 'temp',
      deadline,
      place: location,
      status: 'OPEN',
    };

    let productId = null;
    try {
      const postRes = await createPost(requestBody);
      productId = postRes.data.data.productId;

      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((img) => formData.append('images', img));

        const imgRes = await uploadPostImages(productId, formData);
        const uploadedUrls = imgRes.data.data;

        await updatePostMainImage(productId, uploadedUrls[0]);
      }

      alert('게시글이 성공적으로 등록되었습니다!');
    } catch (error) {
      console.error('등록 중 에러:', error);

      if (productId) {
        try {
          await deletePost(productId);
          console.log(`롤백: post ${productId} 삭제 완료`);
        } catch (delErr) {
          console.error('롤백 삭제 실패:', delErr);
        }
      }

      if (error.response?.status === 500) {
        alert('이미지는 1MB 미만의 용량을 첨부해주세요.');
      } else {
        alert('게시글 등록에 실패했습니다.');
      }
    }
  };
  const convertCategoryToEnum = (label) => {
    switch (label) {
      case '식품':
        return 'FOOD';
      case '생수·음료':
        return 'WATER_DRINK';
      case '생활용품':
        return 'LIVING';
      case '문구류':
        return 'STATIONERY';
      case '화장품':
        return 'BEAUTY';
      default:
        return 'LIVING';
    }
  };

  return (
    <PostContainer>
      <PostHeader>상품 설명</PostHeader>
      <PostBody>
        <ProductImageContainer>
          <ProductText>
            상품 이미지<RequiredStar>*</RequiredStar>
            <ImageCountText>({images.length} / 3)</ImageCountText>
          </ProductText>
          <ImageUpload
            images={images}
            onAddImage={handleImageChange}
            onRemoveImage={(idx) => setImages((prev) => prev.filter((_, i) => i !== idx))}
          />
        </ProductImageContainer>
        <ProductContainer>
          <ProductNameText>
            게시글 제목<RequiredStar>*</RequiredStar>
          </ProductNameText>
          <TitleInputWrapper>
            <ProductNameInput
              placeholder="상품명을 입력해 주세요."
              value={title}
              onChange={handleTitleChange}
            />
            <TitleCountText>
              {title.length}/{MAX_TITLE}
            </TitleCountText>
          </TitleInputWrapper>
        </ProductContainer>
        <ProductContainer>
          <ProductNameText>카테고리</ProductNameText>
          <CategoryItemWrapper>
            {categories.map((item, idx) => (
              <CategoryTabItem
                key={idx}
                label={item.label}
                active={item.label === selectedCategory}
                onClick={() => {
                  if (item.label === selectedCategory) {
                    setSelectedCategory('');
                  } else {
                    setSelectedCategory(item.label);
                  }
                }}
              />
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
            {explain.length}/{MAX_TEXT}
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
            <ProductInput
              placeholder="가격을 입력해주세요."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <InputText>원</InputText>
          </InputWrapper>
        </ProductContainer>
        <EstimatedPrice>
          공동구매 예상 가격은{' '}
          <Highlight>
            {price && people ? Math.floor(price / people).toLocaleString() : '0'}원
          </Highlight>
          이에요!
        </EstimatedPrice>
        <ProductContainer>
          <ProductText>
            인원<RequiredStar>*</RequiredStar>
          </ProductText>
          <InputWrapper>
            <ProductInput
              placeholder="인원을 입력해주세요. (최대 5명)"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            />
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

      <RegisterButton onClick={handleSubmit}>등록하기</RegisterButton>
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

const ImageCountText = styled.span`
  ${({ theme }) => theme.fontStyles.Body7};
  padding-left: 30px;
  color: #666;
`;

const RequiredStar = styled.span`
  position: relative;
  top: -2px;
  color: #ee6a7b;
  ${({ theme }) => theme.fontStyles.Body8};
  line-height: 142%;
`;

const ProductText = styled.p`
  width: 155px;
  color: #191919;
  ${({ theme }) => theme.fontStyles.Body6};
  line-height: 107%;
  letter-spacing: -0.5px;
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
  width: 100%;
  padding: 16px;

  color: #333333;
  ${({ theme }) => theme.fontStyles.Body7};
  &::placeholder {
    color: #8c8c8c;
  }
  border-radius: 2px;
  border: 1px solid #b2b2b2;
`;

const TitleInputWrapper = styled.div`
  position: relative;
  width: 75%;
`;

const TitleCountText = styled.span`
  ${({ theme }) => theme.fontStyles.Body7};
  position: absolute;
  top: 14px;
  right: 16px;
  color: #8c8c8c;
  ${({ theme }) => theme.fontStyles.Body7};
  line-height: 161%;
`;

const CategoryItemWrapper = styled.div`
  width: 75%;
  height: 46px;
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
  border: 1px solid #b2b2b2;
  border-radius: 2px;
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

const EstimatedPrice = styled.p`
  ${({ theme }) => theme.fontStyles.Body7};
  width: 100%;
  margin: -25px 0 30px 180px;
  color: #666;
  line-height: 191%;
`;

const Highlight = styled.span`
  color: #3092fa;
  font-weight: 700;
`;
