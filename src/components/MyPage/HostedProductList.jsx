import styled from 'styled-components';
import HostedProductItem from '@components/MyPage/Items/HostedProductItem';
import { hostedMock } from '@pages/MyPage/MockData/MockData';
import { Container } from '@components/shared/UIStyles';
import PropTypes from 'prop-types';

export default function HostedProductList({ onEdit, onChat, onDelete }) {
  if (!hostedMock.length) return <p>아직 주최한 공동구매가 없습니다.</p>;

  return (
    <ListContainer>
      {hostedMock.map((item) => (
        <HostedProductItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onChat={onChat}
          onDelete={onDelete}
        />
      ))}
    </ListContainer>
  );
}

const ListContainer = styled(Container)`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 25px;
  padding-bottom: 50px;
`;

HostedProductList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onChat: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
