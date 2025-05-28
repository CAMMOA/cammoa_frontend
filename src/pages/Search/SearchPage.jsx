import styled from 'styled-components';
import { PageWrapper } from '@components/shared/UIStyles';
import { useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import SearchItem from '@components/SearchItem/SearchItem';
import api from '@api/api';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        const response = await api.get(`/api/posts/search`, {
          params: { keyword: query },
        });
        console.log(response);
        setSearchData(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSearchResults();
  }, [query]);

  return (
    <SearchContainer>
      <SearchItem query={query} searchedResult={searchData} />
    </SearchContainer>
  );
};

export default SearchPage;

const SearchContainer = styled(PageWrapper)`
  margin-top: 45px;
  gap: 45px;
`;
