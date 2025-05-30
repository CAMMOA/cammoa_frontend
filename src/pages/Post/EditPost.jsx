import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';
import Camera from '@assets/icons/image-icon.svg?react';
import CategoryTabItem from '@components/Post/categoryItem';
import useLimitedInput from '@hooks/useMaxlength';
import { ButtonStyle } from '@components/shared/ButtonStyle';
import useFormattedDate from '@hooks/useFormattedDate';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://15.165.99.110:8080';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const categories = [
    { label: '식품' },
    { label: '생수·음료' },
    { label: '생활용품' },
    { label: '문구류' },
    { label: '화장품' },
  ];
  const MAX_TEXT = 1500;
  const MAX_LOCATION = 50;

  const fileInputRef = useRef(null);
  const handleImageBoxClick = () => fileInputRef.current?.click();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [people, setPeople] = useState('');
  const [existingUrls, setExistingUrls] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('생활용품');
  const [location, handleLocationChange] = useLimitedInput(MAX_LOCATION);
  const [explain, handleExplainChange] = useLimitedInput(MAX_TEXT);
  const { value, setValue } = useFormattedDate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles((prev) => [...prev, ...files]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get(`${API_URL}/api/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data;
        setTitle(data.title);
        setPrice(data.price);
        setPeople(data.maxParticipants);
        setSelectedCategory(convertCategoryToLabel(data.category));
        setValue(data.deadline.slice(0, 10).replace(/-/g, ' / '));
        handleLocationChange({ target: { value: data.place } });
        handleExplainChange({ target: { value: data.description } });
        setExistingUrls(data.imageUrl ? [data.imageUrl] : []);
      } catch (err) {
        console.error('❌ 게시글 상세 불러오기 실패:', err);
      }
    };
    fetchData();
  }, [postId]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const deadline = value.replace(/\s*\/\s*/g, '-') + 'T23:59:59';

      const requestBody = {
        title,
        description: explain,
        category: convertCategoryToEnum(selectedCategory),
        price: Number(price),
        maxParticipants: Number(people),
        deadline,
        place: location,
        status: 'OPEN',
      };

      await axios.patch(`${API_URL}/api/posts/${postId}`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((file) => formData.append('images', file));
        const imageUploadRes = await axios.post(`${API_URL}/api/posts/${postId}/images`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        const uploadedUrls = imageUploadRes.data.data;
        await axios.patch(
          `${API_URL}/api/posts/${postId}`,
          { image: uploadedUrls[0] },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      }

      alert('게시글이 수정되었습니다.');
      navigate('/mypage');
    } catch (error) {
      console.error('수정 실패:', error);
      alert('게시글 수정에 실패했습니다.');
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

  const convertCategoryToLabel = (enumVal) => {
    switch (enumVal) {
      case 'FOOD':
        return '식품';
      case 'WATER_DRINK':
        return '생수·음료';
      case 'LIVING':
        return '생활용품';
      case 'STATIONERY':
        return '문구류';
      case 'BEAUTY':
        return '화장품';
      default:
        return '생활용품';
    }
  };

  return (
    <PostContainer>
      <PostHeader>상품 설명</PostHeader>
      <PostBody>
        <ProductImageContainer>
          <ProductText>상품 이미지</ProductText>
          <ProductImage>
            <Image onClick={handleImageBoxClick}>
              <Camera />
              <HiddenFileInput
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                ref={fileInputRef}
              />
              <ImageSubText>이미지 등록</ImageSubText>
            </Image>
            <ImageText>이미지는 1:1 비율로 보여집니다.</ImageText>
            <PreviewContainer>
              {existingUrls.map((url, idx) => (
                <PreviewImage key={`url-${idx}`} src={url} alt={`preview-${idx}`} />
              ))}
              {newFiles.map((file, idx) => (
                <PreviewImage
                  key={`file-${idx}`}
                  src={URL.createObjectURL(file)}
                  alt={`preview-${idx}`}
                />
              ))}
            </PreviewContainer>
          </ProductImage>
        </ProductImageContainer>

        <ProductContainer>
          <ProductNameText>게시글 제목</ProductNameText>
          <ProductNameInput
            placeholder="상품명을 입력해 주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </ProductContainer>

        <ProductContainer>
          <ProductNameText>카테고리</ProductNameText>
          <CategoryItemWrapper>
            {categories.map((item, idx) => (
              <CategoryTabItem
                key={idx}
                label={item.label}
                active={item.label === selectedCategory}
                onClick={() => setSelectedCategory(item.label)}
              />
            ))}
          </CategoryItemWrapper>
        </ProductContainer>

        <ProductPlainContainer>
          <ProductText>설명</ProductText>
          <ProductTextarea
            value={explain}
            onChange={handleExplainChange}
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
          <ProductText>가격</ProductText>
          <InputWrapper>
            <ProductInput
              placeholder="가격을 입력해주세요."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <InputText>원</InputText>
          </InputWrapper>
        </ProductContainer>

        <ProductContainer>
          <ProductText>인원</ProductText>
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
          <ProductText>기한</ProductText>
          <InputWrapper>
            <ProductInput
              type="text"
              placeholder="YYYY / MM / DD"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </InputWrapper>
        </ProductContainer>

        <ProductContainer>
          <ProductText>위치</ProductText>
          <LocationInputWrapper>
            <ProductInput
              value={location}
              onChange={handleLocationChange}
              placeholder="거래할 위치를 입력해 주세요."
            />
            <Counter>
              {location.length}/{MAX_LOCATION}
            </Counter>
          </LocationInputWrapper>
        </ProductContainer>
      </PostBody>

      <RegisterButton onClick={handleSubmit}>수정하기</RegisterButton>
    </PostContainer>
  );
};

export default EditPost;

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
const ImageText = styled.p`
  color: #666;
  ${({ theme }) => theme.fontStyles.Body7};
  line-height: 107%;
`;

const ImageSubText = styled.p`
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

const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;
