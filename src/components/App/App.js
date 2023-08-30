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
import RouteCheckElement from "../RouteCheck/RouteCheck"
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
  const [isTokenChecked, setIsTokenChecked] = useState(false);
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
    if (!loggedIn) {
      setShowPreloader(true);
      checkToken()
        .then((res) => {
          if (res && typeof res === "object") {
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsTokenChecked(true);
          setShowPreloader(false);
        });
    }
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
    if (loggedIn) {
      setShowPreloader(true);
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
          setMessage(err.message);
          setErrorMessage(true);
        })
        .finally(() => {
          setShowPreloader(false);
        });
    }
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

  useEffect(() => {
    if (location.pathname !== "/profile") {
      setMessage("");
    }
  }, [navigate]);

  //функции обращения к апи
  function handleRegisterSubmit({ name, email, password }) {
    setShowPreloader(true);
    register(name, email, password)
      .then((res) => {
        if (res !== false) {
          navigate("/signin", { replace: true });
          handleLogInSubmit({ email, password });
        }
      })
      .catch((err) => {
        console.log(err.status);
        setMessage(err.message);
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
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
      })
      .finally(() => {
        setShowPreloader(false);
      });
  }

  function handleExit() {
    logOut()
      .then(() => {
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
        navigate("/profile", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
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
      {isTokenChecked ? (
        <CurrentUserContext.Provider value={currentUser}>
          {showHeader && <Header loggedIn={loggedIn} width={width} />}
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Main />} />
            <Route
              path="/signup"
              element={
                <RouteCheckElement
                  element={Register}
                  handleRegisterSubmit={handleRegisterSubmit}
                  message={message}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <RouteCheckElement
                  element={Login}
                  handleLogInSubmit={handleLogInSubmit}
                  message={message}
                  loggedIn={loggedIn}
                />
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
                  message={message}
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
      ) : (
        showPreloader && <Preloader />
      )}
    </div>
  );
}

export default App;
