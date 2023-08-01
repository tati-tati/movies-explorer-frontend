import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../images/logo.svg";
import "./AuthForm.css";
import "../../blocks/link.css";
import "../../blocks/button.css";

function AuthForm(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleInputName(evt) {
    setName(evt.target.value);
  }
  function handleInputEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleInputPassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmitAuth(evt) {
    evt.preventDefault();
    props.handleSubmit({ name, password, email });
  }

  return (
    <div className="auth">
      <Link to="/" className="auth__logo_link">
        <img className="auth__logo" src={logo} alt="логотип приложения" />
      </Link>
      <form className="auth__form" name="login" onSubmit={handleSubmitAuth}>
        <h2 className="auth__title">{props.title}</h2>
        {props.nameInput && (
          <label className="auth__label">
            Имя
            <input
              className="auth__input"
              placeholder="Name"
              type="text"
              onChange={handleInputName}
              value={name}
            />
            {/* <span className="auth__input_error">Что-то пошло не так...</span> */}
          </label>
        )}
        <label className="auth__label">
          E-mail
          <input
            className="auth__input"
            placeholder="Email"
            type="email"
            onChange={handleInputEmail}
            value={email}
          />
          {/* <span className="auth__input_error">Что-то пошло не так...</span> */}
        </label>

        <label className="auth__label">
          Пароль
          <input
            className="auth__input"
            placeholder="Пароль"
            type="password"
            onChange={handleInputPassword}
            value={password}
          />
          <span className="auth__input_error">Что-то пошло не так...</span>
        </label>

        <button className="auth__button button" type="submit">
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
