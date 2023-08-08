import "./ProfileEdit.css";

function ProfileEdit() {
  return (
    <form className="profile-edit__form" name="profile">
      <h2 className="profile-edit__title">Привет, Виталий!</h2>
      <label className="profile-edit__label">
        Имя
        <input
          className="profile-edit__input"
          placeholder="Name"
          type="text"
          defaultValue="Виталий"
        />
      </label>
      <label className="profile-edit__label">
        E-mail
        <input
          className="profile-edit__input"
          placeholder="email"
          type="email"
          defaultValue="pochta@yandex.ru"
        />
      </label>
      <span className="profile-edit__error-span">
        При обновлении профиля произошла ошибка.
      </span>
      <button className="profile-edit__btn-submit button" type="submit">
        Сохранить
      </button>
    </form>
  );
}

export default ProfileEdit;
