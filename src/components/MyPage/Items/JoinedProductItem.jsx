import ProductItem from '@components/MyPage/shared/ProductItem';
import { Container } from '@components/shared/UIStyles';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function JoinedProductItem({ item, onCancel }) {
  return (
    <ProductItem
      imageUrl={item.imageUrl}
      title={item.title}
      deadLine={`D - ${item.deadLine}`}
      detailText={item.hostName}
    >
      <ButtonContainer>
        <button onClick={() => onCancel(item.id)}>취소하기</button>
      </ButtonContainer>
    </ProductItem>
  );
}

const ButtonContainer = styled(Container)`
  margin-top: 12px;
`;

JoinedProductItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    deadLine: PropTypes.number.isRequired,
    hostName: PropTypes.string.isRequired,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};
