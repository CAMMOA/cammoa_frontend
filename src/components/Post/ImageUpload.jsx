import { useRef } from 'react';
import styled from 'styled-components';
import Camera from '@assets/icons/image-icon.svg?react';
import { Container } from '@components/shared/UIStyles';
import PropTypes from 'prop-types';

export default function ImageUpload({ images, onAddImage }) {
  const inputRef = useRef();

  const handleClick = () => inputRef.current.click();
  const handleChange = (e) => {
    if (!e.target.files) return;
    onAddImage(e.target.files);
    e.target.value = null;
  };

  return (
    <ImageUploadContainer>
      <ImageContainer>
        <Image onClick={handleClick}>
          <Camera />
          <span>이미지 등록</span>
          <ImageInput
            type="file"
            accept="image/*"
            multiple
            ref={inputRef}
            onChange={handleChange}
          />
        </Image>
        <PreviewContainer>
          {images.map((file, idx) => (
            <Preview key={idx}>
              <img src={URL.createObjectURL(file)} alt={`preview-${idx}`} />
              {idx === 0 && <RepresentativeImageText>대표 이미지</RepresentativeImageText>}
            </Preview>
          ))}
        </PreviewContainer>
      </ImageContainer>
      <InfoText>
        이미지는 1:1 비율로 보여지며, 첫 번째로 업로드한 이미지가 대표 이미지로 사용됩니다 :)
      </InfoText>
    </ImageUploadContainer>
  );
}

const ImageUploadContainer = styled(Container)`
  gap: 15px;
  align-items: flex-start;
`;

const ImageContainer = styled(Container)`
  gap: 15px;
  align-items: flex-start;
  flex-direction: row;
`;

const Image = styled(Container)`
  width: 188px;
  height: 188px;
  background: #fafafa;
  border: 1px solid #b2b2b2;
  padding: 69px 0 55px;
  justify-content: center;
  cursor: pointer;

  span {
    margin-top: 8px;
    ${({ theme }) => theme.fontStyles.Body7};
    color: #666;
    font-size: 13px;
  }
`;

const PreviewContainer = styled(Container)`
  flex-direction: row;
  gap: 15px;
`;

const Preview = styled(Container)`
  position: relative;
  width: 188px;
  height: 188px;
  border: 1px solid #b2b2b2;
  aspect-ratio: 1 / 1;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const RepresentativeImageText = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  background: #3092fa;
  color: #fff;
  padding: 6px 7px 5px 8px;
  border-radius: 4px;
  ${({ theme }) => theme.fontStyles.Body8};
  font-weight: 400;
`;

const InfoText = styled.p`
  margin-top: 1px;
  color: #666;
  ${({ theme }) => theme.fontStyles.Body7};
`;

const ImageInput = styled.input`
  display: none;
`;

ImageUpload.propTypes = {
  images: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
  onAddImage: PropTypes.func.isRequired,
};
