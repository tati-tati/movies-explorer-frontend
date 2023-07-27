import { NavLink, Link} from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Header.css";

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
    <header className="header header_pink">
      <Link to="/" className="header__logo_link">
      <img className="header__logo" src={logo} alt="логотип приложения" />
      </Link>
      <div className="header__container">
        <NavLink to="/signup" className="header__link">{buttonText.register}</NavLink>
        <NavLink to="/signup" className="header__btn">{buttonText.enter}</NavLink>
        </div>
    </header>
  );
}

export default Header;
