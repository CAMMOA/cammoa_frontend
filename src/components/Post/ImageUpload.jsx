import { useRef } from 'react';
import styled from 'styled-components';
import Camera from '@assets/icons/image-icon.svg?react';
import { Container } from '@components/shared/UIStyles';
import PropTypes from 'prop-types';
import FallbackImage from '@components/shared/FallbackImage';

export default function ImageUpload({ images, onAddImage, onRemoveImage }) {
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
          {images.map((file, idx) => {
            let src;
            if (typeof file === 'string') {
              src = file;
            } else if (file instanceof File) {
              if (file.type && file.type.startsWith('image/')) {
                src = URL.createObjectURL(file);
              } else {
                src = '';
              }
            } else {
              src = '';
            }

            return (
              <Preview key={idx}>
                <FallbackImage
                  src={src}
                  alt={`preview-${idx}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectposition: 'center',
                  }}
                />
                <DeleteButton onClick={() => onRemoveImage(idx)}>×</DeleteButton>
                {idx === 0 && <RepresentativeImageText>대표 이미지</RepresentativeImageText>}
              </Preview>
            );
          })}
        </PreviewContainer>
      </ImageContainer>
      <InfoText>
        이미지는 1:1 비율로 보여지며, 첫 번째로 업로드한 이미지가 대표 이미지로 사용됩니다 :)
      </InfoText>
    </ImageUploadContainer>
  );
}

ImageUpload.propTypes = {
  images: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(File), PropTypes.string]))
    .isRequired,
  onAddImage: PropTypes.func.isRequired,
  onRemoveImage: PropTypes.func.isRequired,
};

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
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 16px;
  line-height: 1;
  border-radius: 50%;
  cursor: pointer;
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
