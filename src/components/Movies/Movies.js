import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";
import {
  DESKTOP_CARDS,
  MOBILE_CARDS,
} from "../../utils/constants";

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
      return movie.duration < 41;
    });
  }

  let cards;
  if (props.width < 500) {
    cards = filteredMovies.slice(0, MOBILE_CARDS + counter).map((card) => {
      return createCard(card);
    });
  } else {
    cards = filteredMovies.slice(0, DESKTOP_CARDS + counter).map((card) => {
      return createCard(card);
    });
  }

  function handleCounter() {
    if (props.width < 500) {
      setCounter(counter + 5);
    } else {
      setCounter(counter + 7);
    }
  }

  function createCard(card) {
    return (
      <MoviesCard
        key={card.id}
        id={card.id}
        card={card}
        title={card.nameRU}
        length={card.duration}
        img={card.image.url}
        trailer={card.trailerLink}
        buttonType={card.class}
        onLike={props.onLike}
        onMovieDelete={props.onMovieDelete}
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
