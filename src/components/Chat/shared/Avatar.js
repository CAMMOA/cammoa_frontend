import styled from 'styled-components';

export const Avatar = styled.img`
  width: ${({ size }) => size || '48px'};
  height: ${({ size }) => size || '48px'};
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
`;
