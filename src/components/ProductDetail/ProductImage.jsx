import { useState, useEffect } from 'react';
import styled from 'styled-components';
import LeftIcon from '@assets/icons/image_left.svg?react';
import RightIcon from '@assets/icons/image_right.svg?react';
import PropTypes from 'prop-types';

const FALLBACK_IMAGE =
  'https://shop-phinf.pstatic.net/20220428_195/1651135623901Ht4we_JPEG/52271451701293203_931912436.jpg?type=m510';

const ProductImageCarousel = ({ images = [], title }) => {
  const initialImages = images && images.length > 0 ? images : [FALLBACK_IMAGE];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(initialImages[0]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const validImages = images && images.length > 0 ? images : [FALLBACK_IMAGE];
    setCurrentIndex(0);
    setImgSrc(validImages[0]);
    setError(false);
  }, [images]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setImgSrc(initialImages[currentIndex - 1]);
      setError(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < initialImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setImgSrc(initialImages[currentIndex + 1]);
      setError(false);
    }
  };

  const handleImgError = (e) => {
    if (!error && e.currentTarget.src !== FALLBACK_IMAGE) {
      setImgSrc(FALLBACK_IMAGE);
      setError(true);
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
      <ProductImage src={imgSrc} alt={title} onError={handleImgError} />
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
const ProductImage = styled.img`
  width: 448px;
  height: 448px;
  border-radius: 4px;
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
