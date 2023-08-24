import "./ProfileEdit.css";

import { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ProfileEdit(props) {
    const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);


  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({ name, email });
  }

  return (
    <form className="profile-edit__form" name="profile" onSubmit={handleSubmit}>
      <h2 className="profile-edit__title">Привет, {currentUser.name}!</h2>
      <label className="profile-edit__label">
        Имя
        <input
          className="profile-edit__input"
          placeholder="Name"
          type="text"
          value={name}
          onChange={handleChangeName}
        />
      </label>
      <label className="profile-edit__label">
        E-mail
        <input
          className="profile-edit__input"
          placeholder="email"
          type="email"
          onChange={handleChangeEmail}
          value={email}
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
