import styled from 'styled-components';
import { Container, Header } from '@components/shared/UIStyles';
import BannerIcon from '@assets/icons/png/banner.png';
import { mockPosts } from '@pages/Home/MockData/MockData';
import Items from '@components/Home/Items';

const Home = () => {
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
          {mockPosts.map((post) => (
            <Items key={post.id} title={post.title} price={post.price} imageUrl={post.imageUrl} />
          ))}
        </RecommendMain>
      </RecommendContainer>
      <RecommendContainer>
        <RecommendHeader>
          <HeaderMainText>⏳ 서두르세요! 곧 마감되는 공구</HeaderMainText>
          <HeaderSubText>기회를 놓치지 마세요, 곧 종료됩니다!</HeaderSubText>
        </RecommendHeader>
        <RecommendMain>
          {mockPosts.slice(0, 4).map((post) => (
            <Items key={post.id} title={post.title} price={post.price} imageUrl={post.imageUrl} />
          ))}
        </RecommendMain>
      </RecommendContainer>
      <RecommendContainer>
        <RecommendHeader>
          <HeaderMainText>🔥 방금 올라온 따끈한 공구!</HeaderMainText>
          <HeaderSubText>최신 공동구매, 가장 먼저 만나보세요!</HeaderSubText>
        </RecommendHeader>
        <RecommendMain>
          {mockPosts.slice(0, 4).map((post) => (
            <Items key={post.id} title={post.title} price={post.price} imageUrl={post.imageUrl} />
          ))}
        </RecommendMain>
      </RecommendContainer>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled(Container)`
  width: 100%;
  padding: 155px 0;

  gap: 10px;
`;

const BannerContainer = styled(Container)`
  width: 1065px;
  padding-top: 10px;
  margin-bottom: 10px;
`;
const BannerImage = styled.img`
  width: 100%;
  height: fit-content;
`;

const RecommendContainer = styled(Container)`
  width: 1065px;
  padding: 20px 0;

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

const RecommendMain = styled(Container)`
  width: fit-content;

  flex-direction: row;
  flex-wrap: wrap;
  gap: 25px;
`;
