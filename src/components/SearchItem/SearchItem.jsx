import styled from 'styled-components';
import PropTypes from 'prop-types';
import Item from '@components/Home/Items';
import { Container } from '@components/shared/UIStyles';

const SearchItem = ({ query, searchedResult }) => {
  return (
    <>
      {searchedResult.length === 0 ? (
        <p>‘{query}’에 대한 검색 결과가 없습니다.</p>
      ) : (
        <SearchItemContainer>
          {searchedResult.map((item) => (
            <Item key={item.id} title={item.title} price={item.price} imageUrl={item.imageUrl} />
          ))}
        </SearchItemContainer>
      )}
      ;
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

const SearchItemContainer = styled(Container)`
  width: 1065px;

  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  row-gap: 10px;
  column-gap: 25px;
`;
