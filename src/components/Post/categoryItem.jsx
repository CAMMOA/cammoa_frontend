import styled from 'styled-components';
import PropTypes from 'prop-types';

const CategoryTabItem = ({ label, active, onClick }) => {
  return (
    <Tab onClick={onClick} $active={active}>
      {label}
    </Tab>
  );
};

CategoryTabItem.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoryTabItem;

const Tab = styled.button`
  flex: 1;
  padding: 15.5px 0;
  border: 1px solid #b2b2b2;
  &:not(:last-child) {
    border-right: none;
  }
  background-color: transparent;
  cursor: pointer;

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
