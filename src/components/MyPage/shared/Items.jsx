import { Container } from '@components/shared/UIStyles';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function Items({ imageUrl, title, deadLine, detailText, children }) {
  return (
    <ProductItemContainer>
      <ProductImageContainer>
        <img src={imageUrl} alt={title} />
        <DeadLine $visible={!!deadLine}>{deadLine}</DeadLine>
      </ProductImageContainer>
      <ProductContentContainer>
        <Title>{title}</Title>
        <Price>{detailText}</Price>
        {children}
      </ProductContentContainer>
    </ProductItemContainer>
  );
}

const ProductItemContainer = styled(Container)`
  width: 247px;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 15px;

  gap: 15px;
`;
const ProductImageContainer = styled(Container)`
  position: relative;
  width: 100%;
  height: 222px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DeadLine = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  background: #3092fa;
  color: #fff;
  padding: 4px 9px;
  border-radius: 4px;
  ${({ theme }) => theme.fontStyles.Body6};
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
`;

const ProductContentContainer = styled(Container)`
  width: 100%;
  align-items: flex-start;
  gap: 10px;
`;

const Title = styled.p`
  ${({ theme }) => theme.fontStyles.Body6};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.p`
  ${({ theme }) => theme.fontStyles.Body6};
  font-weight: 800;
  padding: 5px 0;
`;

Items.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  deadLine: PropTypes.string,
  detailText: PropTypes.string.isRequired,
  children: PropTypes.node,
};
