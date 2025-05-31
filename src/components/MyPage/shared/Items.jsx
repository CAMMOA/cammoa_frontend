import { Container } from '@components/shared/UIStyles';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function Items({ imageUrl, title, deadline, detailText, children, onClick }) {
  const isClosed = deadline === '마감됨';

  return (
    <ProductItemContainer>
      <ProductImageContainer onClick={onClick}>
        <img src={imageUrl} alt={title} />

        {isClosed && (
          <>
            <ClosedImageStyle />
            <ClosedCircleStyle>
              <ClosedText>마감</ClosedText>
            </ClosedCircleStyle>
          </>
        )}
        {!isClosed && <DeadLine $visible={!!deadline}>{deadline}</DeadLine>}
      </ProductImageContainer>

      <ProductContentContainer>
        <Title>{title}</Title>
        <Price>{detailText}</Price>
        {children}
      </ProductContentContainer>
    </ProductItemContainer>
  );
}

Items.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  deadline: PropTypes.string,
  detailText: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

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
  cursor: pointer;

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

const ClosedImageStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); // 30% 투명도
  z-index: 1;
`;

const ClosedCircleStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 96px;
  height: 96px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ClosedText = styled.span`
  color: #ffffff;
  ${({ theme }) => theme.fontStyles.Body6};
  font-weight: 700;
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
