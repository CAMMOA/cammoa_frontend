import { useState } from 'react';
import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';
import CategoryTabItem from '@components/Post/categoryItem';
import useLimitedInput from '@hooks/useMaxlength';
import { ButtonStyle } from '@components/shared/ButtonStyle';
import useFormattedDate from '@hooks/useFormattedDate';
import ImageUploader from '@components/Post/ImageUploader';
import { uploadPostImages } from '@api/post/images';
import { createPost } from '@api/post/posts';

const categories = [
  { label: '식품', code: 'FOOD' },
  { label: '생수·음료', code: 'WATER_DRINK' },
  { label: '생활용품', code: 'LIVING' },
  { label: '문구류', code: 'STATIONERY' },
  { label: '화장품', code: 'BEAUTY' },
];

export default function Post() {
  const [files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[2].label);

  const MAX_TITLE = 40;
  const MAX_DESC = 1500;
  const MAX_LOC = 40;

  const [title, onTitleChange] = useLimitedInput(MAX_TITLE);
  const [description, onDescriptionChange] = useLimitedInput(MAX_DESC);
  const [place, onPlaceChange] = useLimitedInput(MAX_LOC);
  const { value: dateValue, handleDateChange } = useFormattedDate();
  const [price, setPrice] = useState('');
  const [people, setPeople] = useState('');

  const handleSubmit = async () => {
    if (!title || !description || !price || !dateValue || !people || !place) {
      alert('모든 필수 항목을 입력해 주세요.');
      return;
    }
    const maxParticipants = Number(people);
    if (isNaN(maxParticipants) || maxParticipants < 2) {
      alert('인원은 2명 이상으로 입력해 주세요.');
      return;
    }

    const formattedDeadline = dateValue.replace(/\s*\/\s*/g, '-') + 'T23:59:59';
    const categoryCode = categories.find((c) => c.label === selectedCategory).code;

    const payload = {
      title,
      description,
      image: files.length ? URL.createObjectURL(files[0]) : 'temp',
      price: Number(price),
      deadline: formattedDeadline,
      category: categoryCode,
      place,
      numPeople: 1,
      maxParticipants,
      status: 'OPEN',
    };

    console.log('▶ createPost payload:', payload);

    try {
      const result = await createPost(payload);
      const postData = result.data;
      console.log('▶ Post created:', postData);

      if (files.length > 0) {
        await uploadPostImages(postData.productId, files);
      }

      console.log('Chat Room ID:', postData.chatRoomId);
      console.log('Chat Room Name:', postData.chatRoomName);
      console.log('Current Participants:', postData.currentParticipants);
      console.log('Max Participants:', postData.maxParticipants);

      alert('게시글이 성공적으로 등록되었습니다.');
    } catch (err) {
      console.error('서버 에러 응답:', err.response?.data);
      const errCode = err.response?.data?.error;
      if (errCode === 'INVALID_DEADLINE') {
        alert('마감일은 현재보다 이후여야 합니다.');
      } else if (errCode === 'INVALID_MAX_PARTICIPANTS') {
        alert('최대 인원은 현재 인원보다 커야 합니다.');
      } else if (errCode === 'INVALID_TOKEN') {
        alert('로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.');
      } else if (errCode === 'USER_NOT_FOUND') {
        alert('사용자를 찾을 수 없습니다. 다시 로그인해주세요.');
      } else {
        alert(err.response?.data?.message || '등록에 실패했습니다.');
      }
    }
  };

  return (
    <PostContainer>
      <PostHeader>상품 설명</PostHeader>
      <PostBody>
        <ProductImageContainer>
          <ImageNameText>
            상품 이미지<RequiredStar>*</RequiredStar>
            <CountText>({files.length}/3)</CountText>
          </ImageNameText>
          <ImageManagementContainer>
            <ImageUploader previewSize={188} maxCount={3} onChange={setFiles} />
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
            onChange={onTitleChange}
            placeholder="상품명을 입력해 주세요."
          />
          <TitleCounter>
            {title.length}/{MAX_TITLE}
          </TitleCounter>
        </ProductNameContainer>

        <ProductContainer>
          <ProductNameText>
            카테고리<RequiredStar>*</RequiredStar>
          </ProductNameText>
          <CategoryItemWrapper>
            {categories.map((cat) => (
              <CategoryTabItem
                key={cat.code}
                label={cat.label}
                active={cat.label === selectedCategory}
                onClick={() => setSelectedCategory(cat.label)}
              />
            ))}
          </CategoryItemWrapper>
        </ProductContainer>

        <ProductPlainContainer>
          <ProductText>
            설명<RequiredStar>*</RequiredStar>
          </ProductText>
          <ProductTextarea
            value={description}
            onChange={onDescriptionChange}
            placeholder="내용을 입력해주세요."
          />
          <CharCount>
            {description.length}/{MAX_DESC}
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
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="가격을 입력해 주세요."
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
              type="number"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              placeholder="인원을 입력해 주세요."
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
              value={dateValue}
              onChange={handleDateChange}
              placeholder="YYYY / MM / DD"
            />
          </InputWrapper>
        </ProductContainer>

        <ProductContainer>
          <ProductText>
            위치<RequiredStar>*</RequiredStar>
          </ProductText>
          <LocationInputWrapper>
            <ProductInput
              value={place}
              onChange={onPlaceChange}
              placeholder="거래할 위치를 입력해 주세요."
            />
            <Counter>
              {place.length}/{MAX_LOC}
            </Counter>
          </LocationInputWrapper>
        </ProductContainer>
      </PostBody>

      <RegisterButton onClick={handleSubmit}>등록하기</RegisterButton>
    </PostContainer>
  );
}

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
const EstimatedPrice = styled.p`
  ${({ theme }) => theme.fontStyles.Body7};
  width: 100%;
  margin-left: 179px;
  margin-top: -20px;
  color: #666;
  line-height: 191%;
`;
const Highlight = styled.span`
  color: #3092fa;
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
