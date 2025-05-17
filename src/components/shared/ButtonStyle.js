import styled from 'styled-components';

export const ButtonStyle = styled.button`
  color: #fff;
  background: #3092fa;
  border-radius: 3px;
  ${({ theme }) => theme.fontStyles.Body6};

  font-weight: 700;
  line-height: 100%;
`;
