import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './Header.scss';
import profileIcon from '../../assets/images/ProfileIcon.png';
import { IUser } from '../../models/IUser';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userSlice } from '../../store/reducers/user/userSlice';

function Header() {
  const userJson = localStorage.getItem('user');
  const userParsed: IUser | null = userJson && JSON.parse(userJson);
  const [user, setUser] = useState(userParsed);
  const { user: userStore } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userParsed) {
      setUser(userParsed);
    }
  }, [userStore]);

  const logOut = () => {
    localStorage.removeItem('user');
    dispatch(userSlice.actions.clearUser());
    setUser(null);
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
          <button className="header__create-article">Create article</button>
          <Link to={'/profile'} className="header__profile-preview">
            <span>{user.user.username}</span>
            <div className="header__profile-icon">
              <img src={user.user.image || profileIcon} alt="Фото профиля" />
            </div>
          </Link>
          <button className="header__log-out" onClick={logOut}>
            Log Out
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
