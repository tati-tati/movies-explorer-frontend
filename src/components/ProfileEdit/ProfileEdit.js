import "./ProfileEdit.css";

import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Validation, checkError } from "../Validation/validation";

function ProfileEdit(props) {
  const { register, handleSubmit, isValid } = Validation();

  const currentUser = useContext(CurrentUserContext);

  function handleSubmitForm(data) {
    // evt.preventDefault();
    props.onUpdateUser(data);
  }

  return (
    <form
      className="profile-edit__form"
      name="profile"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <h2 className="profile-edit__title">Привет, {currentUser.name}!</h2>
      <label className="profile-edit__label">
        Имя
        <input
          className="profile-edit__input"
          placeholder="Name"
          type="text"
          defaultValue={currentUser.name}
          name={"name"}
          {...register("name", checkError("name"))}
        />
      </label>
      <label className="profile-edit__label">
        E-mail
        <input
          className="profile-edit__input"
          placeholder="email"
          type="email"
          defaultValue={currentUser.email}
          name={"email"}
          {...register("email", checkError("email"))}
        />
      </label>
      <span className="profile-edit__error-span">
        {props.message ? props.message : ""}
      </span>
      <button
        className="profile-edit__btn-submit button"
        type="submit"
        disabled={!isValid}
      >
        Сохранить
      </button>
    </form>
  );
}

export default ProfileEdit;
