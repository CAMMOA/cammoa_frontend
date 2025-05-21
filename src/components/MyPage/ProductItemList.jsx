import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';
import ProductItem from '@components/MyPage/ProductItem';
import { hostedMock, joinedMock } from '@pages/MyPage/MockData/MockData';
import PropTypes from 'prop-types';

export default function ProductItemList({ mode, onEdit, onChat, onDelete, onCancel }) {
  const items = mode === 'hosted' ? hostedMock : joinedMock;

  return (
    <>
      <CountText>총 {items.length}개</CountText>

      {items.length === 0 ? (
        <EmptyMessageContainer>
          <EmptyMessage>{(mode = '아직 기록이 없어요. 첫 공동구매에 도전해보세요!')}</EmptyMessage>
        </EmptyMessageContainer>
      ) : (
        <ListContainer>
          {items.map((item) => (
            <ProductItem
              key={item.id}
              item={item}
              mode={mode}
              onEdit={onEdit}
              onChat={onChat}
              onDelete={onDelete}
              onCancel={onCancel}
            />
          ))}
        </ListContainer>
      )}
    </>
  );
}

const CountText = styled.div`
  ${({ theme }) => theme.fontStyles.Body6};
  margin-bottom: 30px;
  line-height: 160%;
`;
const EmptyMessageContainer = styled(Container)`
  width: 100%;
  height: 250px;
  justify-content: center;
`;

const EmptyMessage = styled.p`
  ${({ theme }) => theme.fontStyles.Body6};
  line-height: 128%;
`;

const ListContainer = styled(Container)`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 25px;
  padding-bottom: 50px;
`;

ProductItemList.propTypes = {
  mode: PropTypes.oneOf(['hosted', 'joined']).isRequired,
  onEdit: PropTypes.func,
  onChat: PropTypes.func,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func,
};
