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
  border: 1px solid #8c8c8c;
  &:not(:last-child) {
    border-right: none;
  }
  cursor: pointer;

  color: #8c8c8c;
  ${({ theme }) => theme.fontStyles.Body7};
  line-height: 94%;

  ${({ $active }) =>
    $active &&
    `
    pdding:1px;
    border: 2px solid #3092FA;
    line-height: 94%;
    color:#333;
    ${({ theme }) => theme.fontStyles.Body7};
    &:not(:last-child) {
      border-right: 2px solid #3092FA;
    }
  `}
`;
