import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CategoryTabItem = ({ label }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive((prev) => !prev); // 클릭 시 토글
  };

  return (
    <Tab onClick={handleClick} $active={active}>
      {label}
    </Tab>
  );
};
CategoryTabItem.propTypes = {
  label: PropTypes.string.isRequired,
};

export default CategoryTabItem;

const Tab = styled.button`
  width: 146px;
  padding: 15.5px 0;

  border: 1px solid #b2b2b2;

  color: #8c8c8c;
  ${({ theme }) => theme.fontStyles.Body7};
  line-height: 94%;

  ${({ $active }) =>
    $active &&
    `
    font-weight: bold;
    border-color: #3092FA;
    color: #333;
  `}
`;
