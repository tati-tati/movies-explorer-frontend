import logo from "../../images/logo.svg";
import "./Header.css";
import "../../blocks/link.css";
import "../../blocks/button.css";
import Menu from "../Menu/Menu.js";
import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { BUTTON_TEXT } from "../../utils/constants";

function Header(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const [mainPage, setMainPage] = useState(false);

  const locationHeader = useLocation();

  useEffect(() => {
    if (locationHeader.pathname === "/") {
      setMainPage(true);
    } else {
      setMainPage(false);
    }
  }, [locationHeader]);

  function handleOpenMenu() {
    setOpenMenu(true);
  }

  function handleCloseMenu() {
    setOpenMenu(false);
  }

  return (
    <header className={`header ${mainPage ? "header_pink" : ""}`}>
      <Link to="/" className="header__logo-link">
        <img className="header__logo" src={logo} alt="логотип приложения" />
      </Link>
      {props.loggedIn ? (
        props.width > 770 ? (
          <div className="header__container">
            <NavLink to="/movies" className="header__profile-link link">
              {BUTTON_TEXT.movies}
            </NavLink>
            <NavLink to="/saved-movies" className="header__profile-link link">
              {BUTTON_TEXT.savedMovies}
            </NavLink>
            <NavLink
              to="/profile"
              className="header__btn header__btn_profile link"
            >
              {BUTTON_TEXT.profile}
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
              <Menu width={props.width} handleCloseMenu={handleCloseMenu} />
            )}
          </>
        )
      ) : (
        <div className="header__container">
          <NavLink to="/signup" className="header__link link">
            {BUTTON_TEXT.register}
          </NavLink>
          <NavLink to="/signin" className="header__btn button">
            {BUTTON_TEXT.enter}
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
