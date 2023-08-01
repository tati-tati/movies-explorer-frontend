import AuthForm from "../AuthForm/AuthForm";

function Register() {
    return (
      <AuthForm
        title="Добро пожаловать!"
        nameInput={true}
        buttonText="Зарегистрироваться"
        pathText="Уже зарегистрированы?"
        path="/signin"
        pathBtn="Войти"
      />
    );
}

export default Register;