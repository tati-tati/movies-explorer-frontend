import { NavLink, Link} from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Header.css";
import "../../blocks/link.css";
import "../../blocks/button.css";
import { useEffect, useState } from "react";

function Header(props) {
    const [width, setWidth] = useState(window.innerWidth);

  const buttonText = { 
    enter: "Войти", 
    register: "Регистрация", 
    movies: "Фильмы", 
    savedMovies: "Сохранённые фильмы", 
    profile: "Аккаунт", 
    main: "Главная",
  };

  // console.log(width);
useEffect(() => {
      window.addEventListener("resize", () => setWidth(window.innerWidth));
      return () => window.addEventListener("resize", () => setWidth(window.innerWidth));
}, []);

  return (
    <header className={`header ${props.loggedIn ? "" : "header_pink"}`}>
      <Link to="/" className="header__logo_link">
        <img className="header__logo" src={logo} alt="логотип приложения" />
      </Link>
      {props.loggedIn ? (
        width > 770 ? (
          <div className="header__container">
            <NavLink to="/movies" className="header__profile-link link">
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
          <button className="header__btn-wrapper button" type="button">
          </button>
        )
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
