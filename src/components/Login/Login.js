import AuthForm from "../AuthForm/AuthForm";

function Login() {
    return (
      <AuthForm
        title="Рады видеть!"
        nameInput={false}
        buttonText="Войти"
        pathText="Ещё не зарегистрированы?"
        path="/signup"
        pathBtn="Регистрация"
      />
    );
}

export default Login;