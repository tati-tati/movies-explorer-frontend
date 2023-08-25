import logo from "../../images/logo.svg";
import "./AuthForm.css";
import "../../blocks/link.css";
import "../../blocks/button.css";

import { Link } from "react-router-dom";
import { Validation, checkError } from "../Validation/validation";

function AuthForm(props) {
  const { register, handleSubmit, errors, isValid } = Validation();

  function handleSubmitAuth(data) {
    // evt.preventDefault();
    props.handleSubmit(data);
  }

  return (
    <div className="auth">
      <Link to="/" className="auth__logo_link">
        <img className="auth__logo" src={logo} alt="логотип приложения" />
      </Link>
      <form
        className="auth__form"
        name="login"
        onSubmit={handleSubmit(handleSubmitAuth)}
      >
        <h2 className="auth__title">{props.title}</h2>
        {props.nameInput && (
          <label className="auth__label">
            Имя
            <input
              className="auth__input"
              placeholder="Name"
              type="text"
              name={"name"}
              {...register("name", checkError("name"))}
              required
            />
            <span className="auth__input_error">
              {errors.name ? errors.name.message : ""}
            </span>
          </label>
        )}
        <label className="auth__label">
          E-mail
          <input
            className="auth__input"
            placeholder="Email"
            type="email"
            name={"email"}
            {...register("email", checkError("email"))}
            required
          />
          <span className="auth__input_error">
            {errors.email ? errors.email.message : ""}
          </span>
        </label>

        <label className="auth__label">
          Пароль
          <input
            className="auth__input"
            placeholder="Пароль"
            type="password"
            name={"password"}
            {...register("password", checkError("password"))}
            required
          />
          <span className="auth__input_error">
            {errors.password ? errors.password.message : ""}
          </span>
        </label>
        <span className="auth__form_error">
          {props.message ? props.message : ""}
        </span>
        <button
          className="auth__button button"
          type="submit"
          disabled={!isValid}
        >
          {props.buttonText}
        </button>
      </form>
      <Link to={props.path} className="auth_link link">
        <span className="auth__text">{props.pathText}</span>
        {props.pathBtn}
      </Link>
    </div>
  );
}

export default AuthForm;
