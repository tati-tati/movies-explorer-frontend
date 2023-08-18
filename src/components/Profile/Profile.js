import { NavLink } from "react-router-dom";
import "./Profile.css";

import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


function Profile(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <h3 className="profile__info">
        Имя
        <p className="profile__info-value">{currentUser.name}</p>
      </h3>
      <h3 className="profile__info">
        E-mail
        <p className="profile__info-value">{currentUser.email}</p>
      </h3>
      <NavLink to="/edit" className="profile__btn-edit link">
        Редактировать
      </NavLink>
      <button className="profile__btn-exit link" type="button" onClick={props.handleExit}>
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
