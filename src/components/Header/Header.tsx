import { Link, useLocation } from 'react-router-dom';

import './Header.scss';
import profileIcon from '../../assets/images/ProfileIcon.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userSlice } from '../../store/reducers/user/userSlice';
import useAuth from '../../hooks/useAuth';

function Header() {
  const location = useLocation();
  const { user: userStore } = useAppSelector((state) => state.userReducer);
  const [user, clearUser] = useAuth(userStore);
  const dispatch = useAppDispatch();

  const logOut = () => {
    localStorage.removeItem('user');
    dispatch(userSlice.actions.clearUser());
    clearUser();
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        Realworld Blog
      </Link>
      {!user && (
        <div className="header__sign-buttons">
          <Link className="header__sign-in" to={'/sign-in'}>
            Sign In
          </Link>
          <Link className="header__sign-up" to={'/sign-up'}>
            Sign Up
          </Link>
        </div>
      )}
      {user && (
        <div className="header__profile-group">
          <Link
            className="header__create-article"
            to={'/new-article'}
            state={{ from: location }}
          >
            Create article
          </Link>
          <Link to={'/profile'} className="header__profile-preview">
            <span>{user.user.username}</span>
            <div className="header__profile-icon">
              <img src={user.user.image || profileIcon} alt="Фото профиля" />
            </div>
          </Link>
          <button className="header__log-out" type="button" onClick={logOut}>
            Log Out
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
