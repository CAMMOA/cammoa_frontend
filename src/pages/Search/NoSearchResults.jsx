import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';
import { useSearchParams } from 'react-router';
import SadIcon from '@assets/icons/sad-icon.svg?react';

export default function NoSearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <NoSearchResultsContainer>
      <TitleContainer>
        <Title>‘{query}’에 대한 공동구매를 발견하지 못했어요</Title>
      </TitleContainer>

      <NotificationMessageContainer>
        <SadIcon width={80} height={80} />

        <Message>불편을 드려 죄송해요. 아래 방법을 한번 시도해보시겠어요?</Message>

        <SuggestionList>
          <li>단어의 철자를 다시 한 번 확인해 보세요.</li>
          <li>좀 더 일반적인 키워드로 검색해 보세요.</li>
          <li>띄어쓰기를 다르게 입력해 보세요.</li>
        </SuggestionList>
      </NotificationMessageContainer>
    </NoSearchResultsContainer>
  );
}

const NoSearchResultsContainer = styled(Container)`
  width: 1065px;
  margin-top: 45px;
  gap: 45px;
`;

const TitleContainer = styled(Container)`
  padding: 5px 0;
  width: 100%;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
`;

const Title = styled.p`
  color: #333;
  ${({ theme }) => theme.fontStyles.Body6};
  font-weight: 500;
  line-height: 201%;
`;

const NotificationMessageContainer = styled(Container)`
  margin-top: 120px;
  margin-bottom: 100px;
  gap: 10px;
`;

const Message = styled.p`
  ${({ theme }) => theme.fontStyles.Body6};
  margin-top: 30px;
  margin-bottom: 20px;
`;

const SuggestionList = styled.ul`
  list-style: disc inside;
  ${({ theme }) => theme.fontStyles.Body6};
  line-height: 30px;

  & > li::marker {
    font-size: 0.75em;
  }
`;
