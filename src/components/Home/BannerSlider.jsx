import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function BannerSlider({ images, interval = 3000, height = '300px' }) {
  const [current, setCurrent] = useState(0);
  const length = images.length;
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (length <= 1) return;

    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, interval);

    return () => clearTimeout(timeoutRef.current);
  }, [current, interval, length]);

  const goToSlide = (idx) => {
    clearTimeout(timeoutRef.current);
    setCurrent(idx);
  };

  return (
    <SliedeWrapper style={{ height }}>
      <SlidesContainer style={{ height }}>
        {images.map((imgSrc, idx) => {
          const offset = (idx - current) * 100;
          return (
            <Slide key={idx} style={{ transform: `translateX(${offset}%)` }}>
              <BannerImage src={imgSrc} alt={`slide-${idx}`} />
            </Slide>
          );
        })}
      </SlidesContainer>

      <DotsContainer>
        {images.map((_, idx) => (
          <Dot key={idx} active={idx === current} onClick={() => goToSlide(idx)} />
        ))}
      </DotsContainer>
    </SliedeWrapper>
  );
}

BannerSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  interval: PropTypes.number,
  height: PropTypes.string,
};

const SliedeWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const SlidesContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Slide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  background-color: ${({ active }) => (active ? '#ffffff' : '#cccccc')};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
`;
