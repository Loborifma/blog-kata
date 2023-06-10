import { Navigate, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import { useAppSelector } from '../hooks/redux';

const AuthRequire = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { user: userStore } = useAppSelector((state) => state.userReducer);
  const [user] = useAuth(userStore);

  if (!user) {
    return <Navigate to={'/sign-in'} state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default AuthRequire;
