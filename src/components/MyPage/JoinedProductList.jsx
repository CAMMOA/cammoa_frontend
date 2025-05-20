// src/components/mypage/JoinedProductList.jsx
import styled from 'styled-components';
import JoinedProductItem from '@components/MyPage/Items/JoinedProductItem'; // 위에 보여주신 카드 컴포넌트
import { joinedMock } from '../../pages/MyPage/MockData/MockData'; // MockData
import { Container } from '@components/shared/UIStyles';
import PropTypes from 'prop-types';

export default function JoinedProductList({ onCancel }) {
  if (!joinedMock.length) {
    return <p>아직 참여한 공동구매가 없습니다.</p>;
  }

  return (
    <ListContainer>
      {joinedMock.map((item) => (
        <JoinedProductItem key={item.id} item={item} onCancel={onCancel} />
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

JoinedProductList.propTypes = {
  onCancel: PropTypes.func.isRequired,
};
