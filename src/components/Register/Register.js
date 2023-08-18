import AuthForm from "../AuthForm/AuthForm";

function Register(props) {
    return (
      <AuthForm
        title="Добро пожаловать!"
        nameInput={true}
        buttonText="Зарегистрироваться"
        pathText="Уже зарегистрированы?"
        path="/signin"
        pathBtn="Войти"
        handleSubmit={props.handleRegisterSubmit}
      />
    );
}

export default Register;