import { Outlet } from 'react-router';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import styled from 'styled-components';

const Layout = () => {
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
  flex: 1;
`;
