import styled from 'styled-components';
import { PageWrapper, Container } from '@components/shared/UIStyles';
import { useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import { mockItems } from '@components/SearchItem/Mock/SearchItemData';
import SearchItem from '@components/SearchItem/SearchItem';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (!query) return;

    setSearchData(mockItems);
  }, [query]);

  return (
    <SearchContainer>
      <SearchHeader>
        <HeaderSubText>공동구매들을 발견했어요!</HeaderSubText>
      </SearchHeader>
      <SearchItem query={query} searchedResult={searchData} />
    </SearchContainer>
  );
};

export default SearchPage;

const SearchContainer = styled(PageWrapper)`
  margin-top: 45px;
  gap: 45px;
`;

const SearchHeader = styled(Container)`
  width: 1065px;
  padding: 5px 0;

  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
`;

const HeaderSubText = styled.p`
  color: #333;
  ${({ theme }) => theme.fontStyles.Body6};
  font-weight: 500;
  line-height: 201%;
`;
