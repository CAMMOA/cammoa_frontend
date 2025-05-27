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

const Post = () => {
  const [files, setFiles] = useState([]);
  const categories = ['식품', '상수·음료', '생활용품', '문구류', '화장품'];
  const [selectedCategory, setSelectedCategory] = useState('생활용품');

  const MAX_TITLE = 40;
  const MAX_DESC = 1500;
  const MAX_LOC = 40;

  const [title, onTitleChange] = useLimitedInput(MAX_TITLE);
  const [explain, onExplainChange] = useLimitedInput(MAX_DESC);
  const [location, onLocationChange] = useLimitedInput(MAX_LOC);
  const { value: deadline, handleDateChange } = useFormattedDate();
  const [price, setPrice] = useState('');
  const [numPeople, setNumPeople] = useState('');
  /*
  const [chatRoomInfo, setChatRoomInfo] = useState({
    chatRoomId: null,
    chatRoomName: '',
    currentParticipants: 0,
    maxParticipants: 0,
  });
  */
  const handleSubmit = async () => {
    try {
      const post = await createPost({
        title,
        description: explain,
        price: Number(price),
        deadline: new Date(deadline).toISOString(),
        category: selectedCategory,
        place: location,
        numPeople: Number(numPeople),
        maxParticipants: 5,
        status: 'OPEN',
      });

      if (files.length > 0) {
        await uploadPostImages(post.productId, files);
      }

      console.log('Chat Room ID:', post.chatRoomId);
      console.log('Chat Room Name:', post.chatRoomName);
      console.log('Current Participants:', post.currentParticipants);
      console.log('Max Participants:', post.maxParticipants);
      /*
      setChatRoomInfo({
        chatRoomId: post.chatRoomId,
        chatRoomName: post.chatRoomName,
        currentParticipants: post.currentParticipants,
        maxParticipants: post.maxParticipants,
      });
      */
      alert('게시글이 성공적으로 등록되었습니다.');
    } catch (err) {
      console.error('게시글 생성 오류:', err);
      alert('등록에 실패했습니다.');
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
                key={cat}
                label={cat}
                active={cat === selectedCategory}
                onClick={() => setSelectedCategory(cat)}
              />
            ))}
          </CategoryItemWrapper>
        </ProductContainer>
        <ProductPlainContainer>
          <ProductText>
            설명<RequiredStar>*</RequiredStar>
          </ProductText>
          <ProductTextarea
            value={explain}
            onChange={onExplainChange}
            placeholder="내용을 입력해주세요."
          />
          <CharCount>
            {explain.length}/{MAX_DESC}
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
              공동구매 예상 가격은 <Highlight>{price && numPeople ? Math.floor(price / numPeople).toLocaleString() : '0'}원</Highlight>이에요!
            </EstimatedPrice>
        <ProductContainer>
          <ProductText>
            인원<RequiredStar>*</RequiredStar>
          </ProductText>
          <InputWrapper>
            <ProductInput
              type="number"
              value={numPeople}
              onChange={(e) => setNumPeople(e.target.value)}
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
              value={deadline}
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
              value={location}
              onChange={onLocationChange}
              placeholder="거래할 위치를 입력해 주세요."
            />
            <Counter>
              {location.length}/{MAX_LOC}
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
  width:100%;
  margin-left:179px;
  margin-top:-20px;
  color: #666;
  line-height:191%;
`;
const Highlight = styled.span`
  color: #3092FA
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
