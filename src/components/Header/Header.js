import { NavLink, Link} from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Header.css";
import "../../blocks/link.css";
import "../../blocks/button.css";

function Header(props) {
  const buttonText = { 
    enter: "Войти", 
    register: "Регистрация", 
    movies: "Фильмы", 
    savedMovies: "Сохранённые фильмы", 
    profile: "Аккаунт", 
    main: "Главная",
  };

  return (
    <header className={`header ${props.loggedIn ? "" : "header_pink"}`}>
      <Link to="/" className="header__logo_link">
        <img className="header__logo" src={logo} alt="логотип приложения" />
      </Link>
      {props.loggedIn ? (
        <div className="header__container">
          <NavLink
            to="/movies"
            className="header__profile-link header__profile-link_active link"
          >
            {buttonText.movies}
          </NavLink>
          <NavLink to="/saved-movies" className="header__profile-link link">
            {buttonText.savedMovies}
          </NavLink>
          <NavLink to="/profile" className="header__btn header__btn_profile">
            {buttonText.profile}
          </NavLink>
        </div>
      ) : (
        <div className="header__container">
          <NavLink to="/signup" className="header__link link">
            {buttonText.register}
          </NavLink>
          <NavLink to="/signup" className="header__btn button">
            {buttonText.enter}
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
