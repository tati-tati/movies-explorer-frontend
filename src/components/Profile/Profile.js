import { NavLink } from "react-router-dom";
import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <h3 className="profile__info">
        Имя
        <p className="profile__info-value">Виталий</p>
      </h3>
      <h3 className="profile__info">
        E-mail
        <p className="profile__info-value">pochta@yandex.ru</p>
      </h3>
      <NavLink to="/edit" className="profile__btn-edit link">
        Редактировать
      </NavLink>
      <button className="profile__btn-exit link" type="button">
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
