// модули
import { Route, Routes, useLocation, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
//стиль
import "./App.css";
// компоненты
import PageNotFound from "../PageNotFound/PageNotFound.js";
import Login from "../Login/Login.js";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import ProfileEdit from "../ProfileEdit/ProfileEdit.js";
import Profile from "../Profile/Profile.js";
import Footer from "../Footer/Footer.js";
import Register from "../Register/Register.js";
import Preloader from "../Preloader/Preloader.js";

//функции
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute.js";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

import { getInitialMovies } from "../../utils/MoviesApi.js";

import { checkToken, logIn, logOut, register, getInfoUser } from "../../utils/MainApi";

function App() {
  // функции
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [movies, setMovies] = useState([]);

  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const showHeaderPages = [
    "/",
    "/movies",
    "/saved-movies",
    "/profile",
    "/edit",
  ];
  const showHeader = showHeaderPages.includes(location.pathname);
  const showFooterPages = ["/", "/movies", "/saved-movies"];
  const showFooter = showFooterPages.includes(location.pathname);

  useEffect(() => {
    checkToken()
      .then((res) => {
        if (res && typeof res === "object") {
          setLoggedIn(true);
          // console.log(res);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  
}, []);

  useEffect(() => {
    if (loggedIn) {
      getInitialMovies()
        .then((res) => {
          console.log(res);
          setMovies(res);
        })
        .catch((err) => {
          console.log(err); 
        });

      getInfoUser()
      .then((res) => {
        console.log("getInfoUser работает", res)
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err); 
      });
    }
  }, [loggedIn]);

  function handleRegisterSubmit({ name, email, password }) {
    // console.log(password, email);
    setShowPreloader(true);
    register(name, email, password)
      .then((res) => {
        if (res !== false) {
          navigate("/signin", { replace: true });
          setMessage("Вы успешно зарегистрировались!");
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("Что-то пошло не так! Попробуйте еще раз.");
      })
      .finally(() => {
        setShowPreloader(false);
      });
  }

  function handleLogInSubmit({ email,password }) {
    setShowPreloader(true);
    logIn(email,password)
      .then((res) => {
        if (res !== false) {
          setLoggedIn(true);
          // setUserEmail(email);
          navigate("/movies", { replace: true });
          localStorage.setItem("jwt", res.token);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("Что-то пошло не так! Попробуйте еще раз.");
      })
      .finally(() => {
        setShowPreloader(false);
      });
  }

  function handleExit() {
    // setUserEmail("");
    logOut()
    .then()
    .catch((err) => {
      console.log(err);
    });
  }

  //разметка
  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        {showPreloader && <Preloader />}
        {showHeader && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register handleRegisterSubmit={handleRegisterSubmit} />} />
          <Route path="/signin" element={<Login handleLogInSubmit={handleLogInSubmit} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                element={Movies}
                movies={movies}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                movies={movies}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement element={Profile} handleExit={handleExit} loggedIn={loggedIn} />
            }
          />
          <Route
            path="/edit"
            element={
              <ProtectedRouteElement
                element={ProfileEdit}
                loggedIn={loggedIn}
              />
            }
          />
        </Routes>
        {showFooter && <Footer />}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
