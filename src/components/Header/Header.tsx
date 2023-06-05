import profileIcon from '../../assets/images/ProfileIcon.png';

import './Header.scss';

function Header() {
  return (
    <header className="header">
      <a href="#/" className="header__logo">
        Realworld Blog
      </a>
      <div className="header__sign-buttons">
        <button className="header__sign-in">Sign In</button>
        <button className="header__sign-up">Sign Up</button>
      </div>
      {/* <div className="header__profile-group">
        <button className="header__create-article">Create article</button>
        <div className="header__profile-preview">
          <span>John Doe</span>
          <div className="header__profile-icon">
            <img src={profileIcon} alt="Фото профиля" />
          </div>
        </div>
        <button className="header__log-out">Log Out</button>
      </div> */}
    </header>
  );
}

export default Header;
