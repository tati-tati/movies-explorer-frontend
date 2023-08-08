import { NavLink, Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Header.css";
import "../../blocks/link.css";
import "../../blocks/button.css";
import Menu from "../Menu/Menu.js";
import { useEffect, useState } from "react";

function Header(props) {
  const [width, setWidth] = useState(window.innerWidth);
  const [openMenu, setOpenMenu] = useState(false);

  function handleOpenMenu() {
    setOpenMenu(true);
  }

  function handleCloseMenu() {
    setOpenMenu(false);
  }

  const buttonText = {
    enter: "Войти",
    register: "Регистрация",
    movies: "Фильмы",
    savedMovies: "Сохранённые фильмы",
    profile: "Аккаунт",
    main: "Главная",
  };

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () =>
      window.addEventListener("resize", () => setWidth(window.innerWidth));
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
            <NavLink
              to="/profile"
              className="header__btn header__btn_profile link"
            >
              {buttonText.profile}
            </NavLink>
          </div>
        ) : (
          <>
            <button
              className="header__btn-wrapper button"
              type="button"
              onClick={handleOpenMenu}
            />
            {openMenu && (
              <Menu width={width} handleCloseMenu={handleCloseMenu} />
            )}
          </>
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
