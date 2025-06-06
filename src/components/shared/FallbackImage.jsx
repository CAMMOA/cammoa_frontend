import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FallbackIcon from '@assets/icons/fallback-image.svg';

const FallbackImage = ({ src, alt = '', ...imgProps }) => {
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setLoadError(false);
  }, [src]);

  const handleError = useCallback(() => {
    setLoadError(true);
  }, []);

  return (
    <Img
      src={loadError || !src ? FallbackIcon : src}
      alt={alt}
      onError={handleError}
      {...imgProps}
    />
  );
};

FallbackImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default FallbackImage;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;
