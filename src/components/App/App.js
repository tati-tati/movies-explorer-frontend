// модули
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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

import {
  checkToken,
  logIn,
  logOut,
  register,
  getCurrentUser,
  setUserInfo,
  getSavedMovies,
  deleteSavedMovie,
  saveMovie,
} from "../../utils/MainApi";

function App() {
  // функции
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [width, setWidth] = useState(window.innerWidth);

  const [movies, setMovies] = useState(
    // JSON.parse(localStorage.getItem("films"))
    []
  );
  const [savedMovies, setSavedMovies] = useState("");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

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
          // navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let resizeTimer;
  useEffect(() => {
    window.addEventListener("resize", () => {
      resizeTimer = setTimeout(setWidth(window.innerWidth), 1000);
    });
    return () => {
      window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
        clearTimeout(resizeTimer);
      });
    };
  }, []);

  useEffect(() => {
    // if (movies.length === 0) {
    setShowPreloader(true);
    getInitialMovies()
      .then((res) => {
        // console.log("getInitialMovies в useEffect из app.js", res);
        // localStorage.setItem("films", JSON.stringify(res));
        const result = res.map((item) => {
          return { ...item, class: "notLiked" };
        });
        setMovies(result);
        setErrorMessage(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(true);
      })
      .finally(() => {
        setShowPreloader(false);
      });
    // }
  }, [loggedIn]);

  useEffect(() => {
    setShowPreloader(true);
    getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        setErrorMessage(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(true);
      })
      .finally(() => {
        setShowPreloader(false);
      });
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      getCurrentUser()
        .then((res) => {
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

  function handleLogInSubmit({ email, password }) {
    setShowPreloader(true);
    logIn(email, password)
      .then((res) => {
        if (res !== false) {
          setLoggedIn(true);
          // setUserEmail(email);
          navigate("/movies", { replace: true });
          localStorage.setItem("jwt", res.token);
          console.log(res);
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
    console.log("нажат выход из аккаунта");
    logOut()
      .then((res) => {
        console.log("then выход из аккаунта", res);
        setLoggedIn(false);
        localStorage.removeItem("isShort");
        localStorage.removeItem("query");

        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(user) {
    console.log("handleUpdateUser", user);

    setUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSavedMovieDelete(movieID) {
    deleteSavedMovie(movieID)
      .then(() => {
        setSavedMovies((savedMovies) =>
          savedMovies.filter((c) => (c._id === movieID ? "" : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMovieLike(movie) {
    saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //разметка
  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        {showPreloader && <Preloader />}
        {showHeader && <Header loggedIn={loggedIn} width={width} />}
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Main />} />
          <Route
            path="/signup"
            element={<Register handleRegisterSubmit={handleRegisterSubmit} />}
          />
          <Route
            path="/signin"
            element={<Login handleLogInSubmit={handleLogInSubmit} />}
          />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                element={Movies}
                movies={movies}
                setMovies={setMovies}
                loggedIn={loggedIn}
                width={width}
                errorMessage={errorMessage}
                onLike={handleMovieLike}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                savedMovies={savedMovies}
                onMovieDelete={handleSavedMovieDelete}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                element={Profile}
                handleExit={handleExit}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/edit"
            element={
              <ProtectedRouteElement
                element={ProfileEdit}
                loggedIn={loggedIn}
                onUpdateUser={handleUpdateUser}
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
