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
//апи
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
  //стейты
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [width, setWidth] = useState(window.innerWidth);
  const [movies, setMovies] = useState([]);
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
  
//эффекты
  useEffect(() => {
    checkToken()
      .then((res) => {
        if (res && typeof res === "object") {
          setLoggedIn(true);
          setMessage("");
          navigate("/movies", { replace: true });
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
    setShowPreloader(true);
    setMessage("");
    Promise.all([getInitialMovies(), getSavedMovies()])
      .then((res) => {
        const movies = res[0];
        const savedMovies = res[1];
        const resultMovies = movies.map((item) => {
          const movieSaved = savedMovies.find((saved) => {
            return saved.movieId === item.id;
          });
          if (movieSaved) {
            return { ...item, class: "liked" };
          }
          return { ...item, class: "notLiked" };
        });
        const resultSavedMovies = savedMovies.map((item) => {
          return { ...item, class: "remove" };
        });
        setMovies(resultMovies);
        setSavedMovies(resultSavedMovies);
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

//функции обращения к апи
  function handleRegisterSubmit({ name, email, password }) {
    setShowPreloader(true);
    register(name, email, password)
      .then((res) => {
        if (res !== false) {
          navigate("/signin", { replace: true });
          setMessage("");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === "409") {
          setMessage("Пользователь с таким email уже существует.");
        } else {
          setMessage("При регистрации пользователя произошла ошибка.");
        }
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
          navigate("/movies", { replace: true });
          localStorage.setItem("jwt", res.token);
          setMessage("");
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("Вы ввели неправильный логин или пароль.");
      })
      .finally(() => {
        setShowPreloader(false);
      });
  }

  function handleExit() {
    logOut()
      .then((res) => {
        setLoggedIn(false);
        localStorage.removeItem("isShort");
        localStorage.removeItem("query");
        localStorage.clear();
        setMessage("");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(user) {
    setUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
        setMessage("Данные профиля успешно изменены.");
      })
      .catch((err) => {
        console.log(err);
        setMessage("При обновлении профиля произошла ошибка.");
      });
  }

  function handleSavedMovieDelete(movieID) {
    const removedMovie = savedMovies.find((item) => {
      return item.movieId === movieID ? item : "";
    });
    deleteSavedMovie(removedMovie._id)
      .then(() => {
        setSavedMovies((savedMovies) =>
          savedMovies.filter((c) => (c.movieId === movieID ? "" : c))
        );
        setMovies((state) => {
          return state.map((item) =>
            item.id === movieID ? { ...item, class: "notLiked" } : item
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMovieLike(movie) {
    saveMovie(movie)
      .then((newMovie) => {
        setMovies((state) => {
          return state.map((item) =>
            item.id === newMovie.movieId ? { ...item, class: "liked" } : item
          );
        });
        newMovie.class = "remove";
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
            element={
              <Register
                handleRegisterSubmit={handleRegisterSubmit}
                message={message}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login handleLogInSubmit={handleLogInSubmit} message={message} />
            }
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
                onMovieDelete={handleSavedMovieDelete}
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
