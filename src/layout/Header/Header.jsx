import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@components/shared/UIStyles';
import LogoIcon from '@assets/icons/logo-icon.svg?react';
import SearchBar from '@layout/SearchBar/SearchBar';
import pxToRem from '@utils/pxToRem';
import CategoryIcon from '@assets/icons/category/category-icon.svg?react';
import UserMenuDropdown from '@components/UserMenuDropdown/UserMenuDropdown';
import { useNavigate } from 'react-router';

const Header = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const navigate = useNavigate();
  const categoryRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!categoryRef.current?.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <HeaderContainer>
      <InnerHeader>
        <AccountArea>
          <AccountText onClick={() => navigate('/signup')}>회원가입</AccountText>
          <Divider></Divider>
          <AccountText onClick={() => navigate('/login')}>로그인</AccountText>
        </AccountArea>
        <MainHeader>
          <Logo onClick={() => (window.location.href = '/')}></Logo>
          <SearchBar></SearchBar>
          <FeaturePanel>
            <FeatureText onClick={() => navigate('/post')}>공구 올리기</FeatureText>
            <Divider></Divider>
            <FeatureText onClick={() => navigate('/mypage')}>마이 페이지</FeatureText>
            <Divider></Divider>
            <FeatureText>모아톡</FeatureText>
          </FeaturePanel>
        </MainHeader>
        <CategoryContainer ref={categoryRef}>
          <Category onClick={() => setIsCategoryOpen((o) => !o)}>
            <CategoryMarker />
            <CategoryText>카테고리</CategoryText>
          </Category>
          {isCategoryOpen && <UserMenuDropdown />}
        </CategoryContainer>
      </InnerHeader>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled(Container)`
  width: 100%;
  height: 155px;
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: white;

  justify-content: center;
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.07);
`;
const InnerHeader = styled(Container)`
  width: 1050px;
  justify-content: center;
`;
const AccountArea = styled(Container)`
  width: 100%;
  height: ${pxToRem(35)};
  padding: ${pxToRem(12)} ${pxToRem(5)};
  white-space: nowrap;

  flex-direction: row;
  justify-content: flex-end;
  gap: 12px;
`;

const AccountText = styled.p`
  ${({ theme }) => theme.fontStyles.Body8}
  line-height: 1.5;
  cursor: pointer;
`;

const Divider = styled.span`
  width: 1px;
  height: 13px;
  flex-shrink: 0;
  background-color: #d9d9d9;
`;

const MainHeader = styled(Container)`
  width: 100%;
  height: ${pxToRem(65)};
  padding: ${pxToRem(12)} 0;

  flex-direction: row;
  justify-content: center;
  gap: 55px;
`;

const Logo = styled(LogoIcon)`
  width: ${pxToRem(180)};
  height: ${pxToRem(40)};

  flex-shrink: 0;
  cursor: pointer;
`;

const FeaturePanel = styled(Container)`
  height: ${pxToRem(65)};

  flex-direction: row;
  justify-content: space-between;
  white-space: nowrap;
  gap: ${pxToRem(24)};

  flex-shrink: 0;
`;

const FeatureText = styled.p`
  ${({ theme }) => {
    theme.fontStyles.Body7;
  }};
  font-weight: 700;
  cursor: pointer;
`;

const CategoryContainer = styled(Container)`
  width: 100%;
  height: ${pxToRem(55)};
  white-space: nowrap;
  position: relative;

  flex-direction: row;
  justify-content: flex-start;
  gap: 145px;
`;

const Category = styled.div`
  width: ${pxToRem(100)};
  height: ${pxToRem(55)};

  display: flex;
  align-items: center;

  cursor: pointer;
`;
const CategoryMarker = styled(CategoryIcon)`
  margin-right: 14px;
`;
const CategoryText = styled.p`
  ${({ theme }) => {
    theme.fontStyles.Body6.fontStyles;
  }};
  font-weight: 700;
`;
