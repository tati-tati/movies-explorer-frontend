import "./Profile.css";

function Profile() {
    return (
      <section className="profile">
        <form className="profile__form" name="profile">
          <h2 className="profile__title-name">Привет, Виталий!</h2>
          <label className="profile__label">
            Имя
            <input
              className="profile__input"
              placeholder="Name"
              type="text"
              value="Виталий"
            />
          </label>
          <label className="profile__label">
            E-mail
            <input
              className="profile__input"
              placeholder="email"
              type="email"
              value="pochta@yandex.ru"
            />
          </label>
          <button className="profile__btn-submit" type="submit">
            Редактировать
          </button>
        </form>
        {/* <span className="profile__error-span">
          При обновлении профиля произошла ошибка.
        </span> */}
        <button className="profile__btn-exit" type="button">
          Выйти из аккаунта
        </button>
      </section>
    );
}

export default Profile;