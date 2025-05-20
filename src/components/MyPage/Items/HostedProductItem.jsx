import ProductItem from '@components/MyPage/shared/ProductItem';
import ChatIcon from '@assets/icons/chat-icon.svg?react';
import TrashIcon from '@assets/icons/trash-icon.svg?react';
import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';
import PropTypes from 'prop-types';

export default function HostedProductItem({ item, onEdit, onChat, onDelete }) {
  return (
    <ProductItem
      imageUrl={item.imageUrl}
      title={item.title}
      deadLine={`D - ${item.deadLine}`}
      detailText={`${item.price.toLocaleString()}원~`}
    >
      <ButtonContainer>
        <button onClick={() => onEdit(item.id)}>수정하기</button>
        <button onClick={() => onChat(item.id)}>
          <ChatIcon />
        </button>
        <button onClick={() => onDelete(item.id)}>
          <TrashIcon />
        </button>
      </ButtonContainer>
    </ProductItem>
  );
}

const ButtonContainer = styled(Container)`
  flex-direction: row;
  gap: 8px;
  margin-top: 12px;
`;

HostedProductItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    deadLine: PropTypes.number.isRequired,
    currentParticipants: PropTypes.number.isRequired,
    maxParticipants: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onChat: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
