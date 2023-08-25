import { NavLink } from "react-router-dom";
import "../../blocks/button.css";
import "./Menu.css";

function Menu(props) {
  return (
    <>
      {props.width > 770 ? (
        ""
      ) : (
        <section className="menu">
          <div className="menu__container">
            <button
              className="menu__btn-exit button"
              type="button"
              onClick={props.handleCloseMenu}
            />
            <NavLink
              to="/"
              className="menu__btn link"
              onClick={props.handleCloseMenu}
            >
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              className="menu__btn link"
              onClick={props.handleCloseMenu}
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className="menu__btn link"
              onClick={props.handleCloseMenu}
            >
              Сохраненные фильмы
            </NavLink>
            <NavLink
              to="/profile"
              className="menu__btn-account link"
              onClick={props.handleCloseMenu}
            >
              Аккаунт
            </NavLink>
          </div>
        </section>
      )}
    </>
  );
}

export default Menu;
