import { useState, useEffect } from 'react';
import styled from 'styled-components';
import LeftIcon from '@assets/icons/image_left.svg?react';
import RightIcon from '@assets/icons/image_right.svg?react';
import PropTypes from 'prop-types';
import FallbackImage from '@components/shared/FallbackImage';

const ProductImageCarousel = ({ images = [], title }) => {
  const initialImages = images && images.length > 0 ? images : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSrc = initialImages[currentIndex] || '';

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((idx) => idx - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < initialImages.length - 1) {
      setCurrentIndex((idx) => idx + 1);
    }
  };

  return (
    <ImageWrapper>
      <NavButton
        $left
        disabled={currentIndex === 0}
        onClick={handlePrev}
        style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
      >
        <LeftIcon width={26} height={28} />
      </NavButton>
      <FallbackImage
        src={currentSrc}
        alt={title}
        style={{
          width: '448px',
          height: '448px',
          borderRadius: '4px',
          objectFit: 'cover',
        }}
      />
      <NavButton
        $right
        disabled={currentIndex === initialImages.length - 1}
        onClick={handleNext}
        style={{ opacity: currentIndex === initialImages.length - 1 ? 0.5 : 1 }}
      >
        <RightIcon width={26} height={28} />
      </NavButton>
    </ImageWrapper>
  );
};

ProductImageCarousel.propTypes = {
  images: PropTypes.array,
  title: PropTypes.string,
};

export default ProductImageCarousel;

const ImageWrapper = styled.div`
  position: relative;
  width: 448px;
  height: 448px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NavButton = styled.button`
  width: 48px;
  height: 48px;
  padding: 10px 11px;
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  ${(props) =>
    props.$left &&
    `
    left: 15px;
  `}
  ${(props) =>
    props.$right &&
    `
    right: 15px;
  `}
`;
