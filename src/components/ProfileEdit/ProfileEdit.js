import "./ProfileEdit.css";

import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Validation, checkError } from "../Validation/validation";
import { useSearchParams } from "react-router-dom";

function ProfileEdit(props) {
  const { register, watch, setValue, errors, handleSubmit, isValid } =
    Validation();
  const [formIsChanged, setFormIsChanged] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  
  useEffect(() => {
    if(currentUser) {
      setValue('name', currentUser.name);
      setValue("email", currentUser.email)
    }
  }, [currentUser, setValue]);

  useEffect(() => {
    const isNameChanged = currentUser.name !== watch("name");
    const isEmailChanged = currentUser.email !== watch("email");
    setFormIsChanged(isNameChanged || isEmailChanged);
  }, [watch("name"), watch("email")]);

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
        disabled={!isValid || !formIsChanged}
      >
        Сохранить
      </button>
    </form>
  );
}

export default ProfileEdit;
