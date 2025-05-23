import styled from 'styled-components';
import JoinIcon from '@assets/icons/join-icon.svg?react';
import PropTypes from 'prop-types';

const Items = ({ imageUrl, title, price, dday }) => {
  return (
    <ItemsContainer>
      <ImageWrapper>
        <ItemImage src={imageUrl} alt={title} />
        {dday && <DdayOverlay>{dday}</DdayOverlay>}
      </ImageWrapper>
      <JoinButton>
        <JoinIcon />
        참여하기
      </JoinButton>
      <ItemInformation>
        <ItemTitle>{title}</ItemTitle>
        <ItemPrice>{price}원</ItemPrice>
      </ItemInformation>
    </ItemsContainer>
  );
};

Items.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  dday: PropTypes.number.isRequired,
};

export default Items;

const ItemsContainer = styled.div`
  width: 245px;
  margin-right: 23px;
  margin-bottom: 40px;

  &:nth-child(4n) {
    margin-right: 0;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 12px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 245px;
`;
const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;
const DdayOverlay = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;

  background: #3092fa;
  color: #fff;

  font-size: 14px;
  font-weight: 400;

  border-radius: 4px;
  padding: 5px 10px;

  z-index: 2;
`;

const JoinButton = styled.button`
  width: 100%;
  padding: 4px 0;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fontStyles.Body6};
  line-height: 181.25%;

  border: 1px solid #ddd;
  border-radius: 4px;
`;
const ItemInformation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  gap: 10px;
`;
const ItemTitle = styled.p`
  width: 245px;
  height: fit-content;

  flex-wrap: wrap;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ theme }) => theme.fontStyles.Body6};
  line-height: 145%;
`;
const ItemPrice = styled.p`
  height: 23px;

  ${({ theme }) => theme.fontStyles.Body6};
  font-weight: 700;
  line-height: 152%;
`;
