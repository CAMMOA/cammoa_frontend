import styled from 'styled-components';
import JoinIcon from '@assets/icons/join-icon.svg?react';
import PropTypes from 'prop-types';

const Items = ({ imageUrl, title, price }) => {
  return (
    <ItemsContainer>
      <ItemImage src={imageUrl} alt={title} />
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
};

export default Items;

const ItemsContainer = styled.div`
  width: 245px;
  padding: 20px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 12px;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 245px;
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
  height: fit-content;
  flex-wrap: wrap;

  ${({ theme }) => theme.fontStyles.Body6};
  line-height: 145%;
`;
const ItemPrice = styled.p`
  height: 23px;

  ${({ theme }) => theme.fontStyles.Body6};
  font-weight: 800;
  line-height: 152%;
`;
