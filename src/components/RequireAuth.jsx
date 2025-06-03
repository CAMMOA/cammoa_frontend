import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();

  if (!accessToken) {
    alert('로그인 후 이용하세요.');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
