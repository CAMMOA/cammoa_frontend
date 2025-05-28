import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Camera from '@assets/icons/image-icon.svg?react';
import { Container } from '@components/shared/UIStyles';

export default function ImageUploader({ previewSize = 188, maxCount = 3, onChange }) {
  const [previews, setPreviews] = useState([]);
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    let updated = [];

    if (previews.length < maxCount) {
      const slots = maxCount - previews.length;
      const toAdd = files.slice(0, slots).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      updated = [...previews, ...toAdd];
    } else {
      const toAdd = files.slice(0, maxCount).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      updated = toAdd;
    }

    setPreviews(updated);
    onChange?.(updated.map((p) => p.file));
    e.target.value = '';
  };

  useEffect(
    () => () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    },
    [previews]
  );

  return (
    <ProductImageContainer>
      <ImageInput
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesChange}
      />

      <UploadImage size={previewSize} onClick={handleClick}>
        <Camera />
        <ImageText>이미지 등록</ImageText>
      </UploadImage>

      {previews.map((p, idx) => (
        <PreviewContainer key={p.url} size={previewSize}>
          <img src={p.url} alt={`preview-${idx}`} />
          {idx === 0 && <RepresentativeImageText>대표 이미지</RepresentativeImageText>}
        </PreviewContainer>
      ))}
    </ProductImageContainer>
  );
}

const ProductImageContainer = styled(Container)`
  gap: 15px;
  flex-direction: row;
  align-items: flex-start;
`;

const ImageInput = styled.input`
  display: none;
`;

const UploadImage = styled(Container)`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: #fafafa;
  border: 1px solid #b2b2b2;
  padding: 69px 0 55px;
  justify-content: center;
  cursor: pointer;
  gap: 15px;
`;

const ImageText = styled.p`
  color: #666;
  ${({ theme }) => theme.fontStyles.Body7};
  line-height: 107%;
`;

const PreviewContainer = styled(Container)`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: 1px solid #b2b2b2;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
`;

const RepresentativeImageText = styled.p`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #3092fa;
  color: #fff;
  padding: 6px 7px 5px 8px;
  border-radius: 4px;
  ${({ theme }) => theme.fontStyles.Body8};
  font-weight: 400;
`;

ImageUploader.propTypes = {
  previewSize: PropTypes.number,
  maxCount: PropTypes.number,
  onChange: PropTypes.func,
};
