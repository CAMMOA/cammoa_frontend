import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';
import ProductItem from '@components/MyPage/ProductItem';
import PropTypes from 'prop-types';

export default function ProductItemList({ mode, items, onEdit, onChat, onDelete, onCancel }) {
  return (
    <>
      <CountText>총 {items.length}개</CountText>

      {items.length === 0 ? (
        <EmptyMessageContainer>
          <EmptyMessage>
            {mode === 'hosted'
              ? '작성한 공동구매가 없습니다. 첫 공동구매에 도전해보세요!'
              : '참여한 공동구매가 없습니다. 공구에 참여해보세요!'}
          </EmptyMessage>
        </EmptyMessageContainer>
      ) : (
        <ListContainer>
          {items.map((item) => (
            <ProductItem
              key={item.productId} // 백엔드 응답 기준
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

ProductItemList.propTypes = {
  mode: PropTypes.oneOf(['hosted', 'joined']).isRequired,
  items: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onChat: PropTypes.func,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func,
};

// 스타일 정의는 동일
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
  padding-bottom: 105px;
`;
