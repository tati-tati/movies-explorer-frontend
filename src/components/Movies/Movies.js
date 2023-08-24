import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { DESKTOP_CARDS, MOBILE_CARDS } from "../../utils/constants";

function Movies(props) {
  const [queryMovies, setQueryMovies] = useState(() => {
    const isLocalStorageFull = localStorage.getItem("query");
    return isLocalStorageFull ? isLocalStorageFull : "";
  });
  const [isShort, setIsShort] = useState(() => {
    const isLocalStorageFull = localStorage.getItem("isShort");
    return isLocalStorageFull ? JSON.parse(isLocalStorageFull) : false;
  });
  const [counter, setCounter] = useState(0);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    localStorage.setItem("query", queryMovies);
  }, [queryMovies]);

  useEffect(() => {
    localStorage.setItem("isShort", JSON.stringify(isShort));
  }, [isShort]);

  let filteredMovies = props.movies.filter((movie) => {
    return (
      movie.nameEN.toLowerCase().includes(queryMovies.toLowerCase()) ||
      movie.nameRU.toLowerCase().includes(queryMovies.toLowerCase())
    );
  });

  if (isShort) {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.duration < 40;
    });
  }
  // console.log(filteredMovies.length);

  let cards;
  // function showCards() {
  if (props.width < 500) {
    cards = filteredMovies.slice(0, MOBILE_CARDS + counter).map((card) => {
      return createCard(card);
    });
  } else {
    cards = filteredMovies.slice(0, DESKTOP_CARDS + counter).map((card) => {
      return createCard(card);
    });
  }
  // }

  function handleCounter() {
    setCounter(counter + 1);
  }

  function createCard(card) {
    return (
      <MoviesCard
        key={card.id}
        card={card}
        title={card.nameRU}
        length={card.duration}
        img={card.image.url}
        trailer={card.trailerLink}
        buttonType={card.class}
        // setSelectedCard={props.setSelectedCard}
        onLike={props.onLike}
        // onCardDelete={props.onCardDelete}
      />
    );
  }

  return (
    <section className="movies">
      <SearchForm
        setQuery={setQueryMovies}
        queryMovies={queryMovies}
        setIsShort={setIsShort}
        isShort={isShort}
        setCounter={setCounter}
      />

      <MoviesCardList card={cards} errorMessage={props.errorMessage} />
      {props.width < 500
        ? filteredMovies.length > MOBILE_CARDS + counter && (
            <button
              className="movies__btn-more button"
              type="button"
              onClick={handleCounter}
            >
              Ещё
            </button>
          )
        : filteredMovies.length > DESKTOP_CARDS + counter && (
            <button
              className="movies__btn-more button"
              type="button"
              onClick={handleCounter}
            >
              Ещё
            </button>
          )}
    </section>
  );
}

export default Movies;
