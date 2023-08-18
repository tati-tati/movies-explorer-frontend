import AuthForm from "../AuthForm/AuthForm";

function Login(props) {
    return (
      <AuthForm
        title="Рады видеть!"
        nameInput={false}
        buttonText="Войти"
        pathText="Ещё не зарегистрированы?"
        path="/signup"
        pathBtn="Регистрация"
        handleSubmit={props.handleLogInSubmit}
      />
    );
}

export default Login;