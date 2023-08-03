// модули
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
// компоненты
import PageNotFound from "../PageNotFound/PageNotFound.js";
import Login from "../Login/Login.js";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Footer from "../Footer/Footer.js";
import Register from "../Register/Register.js";
import Preloader from "../Preloader/Preloader.js";

import "./App.css";

function App() {
  // функции
  const [loggedIn, setLoggedIn] = useState(true);
  const location = useLocation();
  const showHeaderPages = ["/", "/movies", "/saved-movies", "/profile"];
  const showHeader = showHeaderPages.includes(location.pathname);
  const showFooterPages = ["/", "/movies", "/saved-movies"];
  const showFooter = showFooterPages.includes(location.pathname);

  //разметка
  return (
    <div className="app">
      {showHeader && <Header loggedIn={loggedIn} />}
<Preloader />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
