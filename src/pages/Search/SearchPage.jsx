import styled from 'styled-components';
import { Container, PageWrapper } from '@components/shared/UIStyles';
import { useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import SearchItem from '@components/SearchItem/SearchItem';
import api from '@api/api';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const type = searchParams.get('type') || 'keyword';
  const [searchData, setSearchData] = useState([]);

  const CATEGORY_MAP = {
    FOOD: '식품',
    WATER_DRINK: '생수 · 음료',
    LIVING: '생활용품',
    STATIONERY: '문구류',
    BEAUTY: '화장품',
  };

  const displayQuery = type === 'category' && CATEGORY_MAP[query] ? CATEGORY_MAP[query] : query;

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        const response = await api.get(`/api/posts/search`, {
          params: type === 'category' ? { category: query } : { keyword: query },
        });
        console.log(response);
        setSearchData(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSearchResults();
  }, [query, type]);

  return (
    <SearchContainer>
      <SearchHeader>
        <HeaderSubText>
          {searchData.length === 0 ? (
            <>
              <span style={{ color: '#3092FA' }}>{`{${displayQuery}}`}</span> 에 대한 검색 결과가
              없습니다.
            </>
          ) : (
            <>
              <span style={{ color: '#3092FA' }}>{`{${displayQuery}}`}</span> 에 대한 공동구매들을
              발견했어요!
            </>
          )}
        </HeaderSubText>
      </SearchHeader>
      {searchData.length > 0 && (
        <ResultCountText>
          진행중인 공동구매 총&nbsp;
          <span style={{ color: '#3092FA' }}>{searchData.length}</span>건
        </ResultCountText>
      )}
      <SearchItem searchedResult={searchData} />
    </SearchContainer>
  );
};

export default SearchPage;

const SearchContainer = styled(PageWrapper)`
  margin-top: 45px;
  gap: 45px;
`;

const SearchHeader = styled(Container)`
  width: 1050px;
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

const ResultCountText = styled(HeaderSubText)`
  width: 100%;
  height: 32.2px;
  margin-bottom: -40px;

  font-size: 14px
  line-height:230%;
  letter-spacing: -0.26px;

`;
