import PropTypes from 'prop-types';
import styled from 'styled-components';
import Items from '@components/MyPage/shared/Items';
import { Container } from '@components/shared/UIStyles';
import ChatIcon from '@assets/icons/chat-icon.svg?react';
import TrashIcon from '@assets/icons/trash-icon.svg?react';
import { useNavigate } from 'react-router-dom';

const getDday = (deadline) => {
  if (!deadline) return null;

  const now = new Date();
  const end = new Date(deadline);
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  const diff = Math.ceil((endDate - nowDate) / (1000 * 60 * 60 * 24));

  if (diff === 0) return 'D - day';
  if (diff > 0) return `D - ${diff}`;
  return '마감됨';
};

export default function ProductItem({ item, mode, onEdit, onChat, onDelete, onCancel }) {
  const navigate = useNavigate();
  return (
    <Items
      imageUrl={item.imageUrl}
      title={item.title}
      deadline={getDday(item.deadline)}
      detailText={item.price ? `${item.price.toLocaleString()}원~` : '가격 미정'}
      onClick={() => navigate(`/detail/${item.id}`)}
    >
      <Actions mode={mode}>
        {mode === 'hosted' ? (
          <ButtonContainer>
            <ModificationButton onClick={() => onEdit(item.id)}>수정하기</ModificationButton>
            <IconButton onClick={() => onChat(item.id)}>
              <ChatIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(item.id)}>
              <TrashIcon />
            </IconButton>
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <CancelButton onClick={() => onCancel(item.id)}>취소하기</CancelButton>
            <IconButton onClick={() => onChat(item.id)}>
              <ChatIcon />
            </IconButton>
          </ButtonContainer>
        )}
      </Actions>
    </Items>
  );
}

ProductItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    price: PropTypes.number,
    hostName: PropTypes.string,
  }).isRequired,
  mode: PropTypes.oneOf(['hosted', 'joined']).isRequired,
  onEdit: PropTypes.func,
  onChat: PropTypes.func,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func,
};

const ButtonContainer = styled(Container)`
  width: 100%;
  height: 35px;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
  align-self: stretch;
`;

const ModificationButton = styled.button`
  width: 139px;
  height: 100%;
  padding: 4px 0;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fontStyles.Body6};
  line-height: 193.25%;

  border: 1px solid #ddd;
  border-radius: 4px;
`;

const IconButton = styled.button`
  width: 35px;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const CancelButton = styled.button`
  width: 177px;
  height: 100%;
  padding: 4px 0;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fontStyles.Body6};
  line-height: 193.25%;

  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Actions = styled.div``;
