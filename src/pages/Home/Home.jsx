import styled from 'styled-components';
import { Container, Header } from '@components/shared/UIStyles';
import BannerIcon from '@assets/icons/png/banner.png';
import Items from '@components/Home/Items';
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://15.165.99.110:8080';

const Home = () => {
  const [recommendPosts, setRecommendPosts] = useState([]);
  const [closingPosts, setClosingPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    // 추천순
    axios
      .get(`${API_URL}/api/posts/recommend`)
      .then((res) => setRecommendPosts(res.data.data || []))
      .catch(() => setRecommendPosts([]));
    // 마감순
    axios
      .get(`${API_URL}/api/posts/closing-soon`)
      .then((res) => setClosingPosts(res.data.data || []))
      .catch(() => setClosingPosts([]));
    // 최신순
    axios
      .get(`${API_URL}/api/posts/recent`)
      .then((res) => setRecentPosts(res.data.data || []))
      .catch(() => setRecentPosts([]));
  }, []);

  return (
    <HomeContainer>
      <BannerContainer>
        <BannerImage src={BannerIcon} alt="banner" />
      </BannerContainer>
      <RecommendContainer>
        <RecommendHeader>
          <HeaderMainText>🛒오늘의 공동구매 추천</HeaderMainText>
          <HeaderSubText>똑똑한 쇼핑의 시작, 오늘의 추천템!</HeaderSubText>
        </RecommendHeader>
        <RecommendMain>
          {recommendPosts.map((post) => (
            <Items
              key={post.id} // 리스트 렌더링 시 각 항목을 고유하게 식별
              id={post.id} // 실제로 컴포넌트에 전달되는 props
              title={post.title}
              price={post.price}
              imageUrl={post.imageUrl}
              deadline={post.deadline}
              maxParticipants={post.maxParticipants}
            />
          ))}
        </RecommendMain>
      </RecommendContainer>
      <RecommendContainer>
        <RecommendHeader>
          <HeaderMainText>⏳ 서두르세요! 곧 마감되는 공구</HeaderMainText>
          <HeaderSubText>기회를 놓치지 마세요, 곧 종료됩니다!</HeaderSubText>
        </RecommendHeader>
        <RecommendMain>
          {closingPosts.slice(0, 4).map((post) => (
            <Items
              key={post.id}
              id={post.id}
              title={post.title}
              price={post.price}
              imageUrl={post.imageUrl}
              deadline={post.deadline}
              maxParticipants={post.maxParticipants}
            />
          ))}
        </RecommendMain>
      </RecommendContainer>
      <RecommendContainer>
        <RecommendHeader>
          <HeaderMainText>🔥 방금 올라온 따끈한 공구!</HeaderMainText>
          <HeaderSubText>최신 공동구매, 가장 먼저 만나보세요!</HeaderSubText>
        </RecommendHeader>
        <RecommendMain>
          {recentPosts.slice(0, 4).map((post) => (
            <Items
              key={post.id}
              id={post.id}
              title={post.title}
              price={post.price}
              imageUrl={post.imageUrl}
              deadline={post.deadline}
              maxParticipants={post.maxParticipants}
            />
          ))}
        </RecommendMain>
      </RecommendContainer>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled(Container)`
  padding-bottom: 100px;
`;

const BannerContainer = styled(Container)`
  width: 1050px;
  padding-bottom: 40px;
`;
const BannerImage = styled.img`
  width: 100%;
  height: fit-content;
`;

const RecommendContainer = styled(Container)`
  width: 1050px;
  padding: 40px 0;

  justify-content: center;
  gap: 10px;
`;
const RecommendHeader = styled(Header)`
  width: 100%;
  height: 75px;

  align-items: flex-start;
`;
const HeaderMainText = styled.p`
  ${({ theme }) => theme.fontStyles.Body2};
  font-weight: 500;
  line-height: 115%;
`;
const HeaderSubText = styled.p`
  ${({ theme }) => theme.fontStyles.Body6};
  color: #999;
  line-height: 145%;
`;

const RecommendMain = styled.div`
  width: 1050px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
