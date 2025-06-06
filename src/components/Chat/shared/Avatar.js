import styled from 'styled-components';
import FallbackIcon from '@assets/icons/fallback-image.svg';

export const Avatar = styled.img.attrs({
  onError: (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = FallbackIcon;
  },
})`
  width: ${({ size }) => size || '48px'};
  height: ${({ size }) => size || '48px'};
  border-radius: 50%;
  object-fit: cover;
`;
