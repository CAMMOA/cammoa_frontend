import { Container } from '@components/shared/UIStyles';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function ProductItem({ imageUrl, title, deadLine, detailText, children }) {
  return (
    <ProductItemContainer>
      <ProductImageContainer>
        <img src={imageUrl} alt={title} />
        {deadLine && <DeadLine>{deadLine}</DeadLine>}
      </ProductImageContainer>
      <ProductContentContainer>
        <Title>{title}</Title>
        <Detail>{detailText}</Detail>
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
`;

const ProductContentContainer = styled(Container)`
  width: 100%;
  padding: 10px;
`;

const Title = styled.p`
  ${({ theme }) => theme.fontStyles.Body6};
  margin: 0 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Detail = styled.p`
  ${({ theme }) => theme.fontStyles.Body6};
  font-weight: 800;
  margin: 0;
`;

ProductItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  deadLine: PropTypes.string,
  detailText: PropTypes.string.isRequired,
  children: PropTypes.node,
};
