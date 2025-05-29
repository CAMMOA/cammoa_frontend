import styled from 'styled-components';
import PropTypes from 'prop-types';
import Item from '@components/Home/Items';
import { Container } from '@components/shared/UIStyles';
import SadIcon from '@assets/icons/sad-icon.svg?react';

const SearchItem = ({ searchedResult }) => {
  return (
    <>
      {searchedResult.length === 0 ? (
        <>
          <NoresultContainer>
            <SadIcon />
            <NoresultTextContainer>
              <MainText>불편을 드려 죄송해요. 아래 방법을 한번 시도해보시겠어요?</MainText>
              <SubTextContainer>
                <SubText>• 단어의 철자를 다시 한 번 확인해 보세요.</SubText>
                <SubText>• 좀 더 일반적인 키워드로 검색해 보세요.</SubText>
                <SubText>• 띄어쓰기를 다르게 입력해 보세요.</SubText>
              </SubTextContainer>
            </NoresultTextContainer>
          </NoresultContainer>
        </>
      ) : (
        <SearchItemContainer>
          {searchedResult.map((item) => {
            console.log(item);
            return (
              <>
                <Item
                  id={item.id}
                  key={item.productId}
                  title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  deadline={item.deadline}
                  maxParticipants={item.maxParticipants}
                />
              </>
            );
          })}
        </SearchItemContainer>
      )}
    </>
  );
};

SearchItem.propTypes = {
  query: PropTypes.string.isRequired,
  searchedResult: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SearchItem;

const NoresultContainer = styled(Container)`
  margin-top: 45px;
  padding; 60px 0;
  gap: 30px;
`;
const NoresultTextContainer = styled(Container)`
  gap: 20px;
  color: #333;
  ${({ theme }) => theme.fontStyles.Body7};
  font-weight: 500;
  letter-spacing: -0.5px;
`;
const MainText = styled.p``;
const SubTextContainer = styled(Container)`
  width: fit-content;
  gap: 15px;
  align-items: flex-start;
`;
const SubText = styled.p``;

const SearchItemContainer = styled(Container)`
  width: 1065px;
  flex-direction: row;
  flex-wrap: wrap;

  row-gap: 10px;
  column-gap: 25px;
`;
