import { Outlet } from 'react-router';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import styled from 'styled-components';
import useAuth from '@hooks/useAuth';

const Layout = () => {
  useAuth();
  return (
    <Wrapper>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Wrapper>
  );
};

export default Layout;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const Content = styled.main`
  padding-top: 155px;
  margin: 0 auto;
  flex: 1;
`;
