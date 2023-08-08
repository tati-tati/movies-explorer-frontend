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
      <button className="profile__btn-edit link" type="button">
        Редактировать
      </button>
      <button className="profile__btn-exit link" type="button">
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
