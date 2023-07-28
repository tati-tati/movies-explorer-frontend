// модули
// import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// компоненты
import PageNotFound  from "../PageNotFound/PageNotFound.js";
import AuthForm from "../AuthForm/AuthForm.js";

import './App.css';
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import { useState } from "react";

function App() {
  // функции
  const [loggedIn, setLoggedIn] = useState(false);

  //разметка
  return (
    <div className="app">
              <Header loggedIn={loggedIn} />

      <Routes>
      <Route path="/" element={<Main />} />
        <Route path="/notfound" element={<PageNotFound />} />
        <Route path="/signup" element= {<AuthForm title="Добро пожаловать!" buttonText="Зарегистрироваться" />} />
      </Routes>
    </div>
  );
}

export default App;
