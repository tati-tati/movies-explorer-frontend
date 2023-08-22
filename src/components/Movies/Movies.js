import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { DESKTOP_CARDS, MOBILE_CARDS } from "../../utils/constants";

function Movies(props) {
  const [queryMovies, setQueryMovies] = useState("");
  const [isShort, setIsShort] = useState(false);
  const [counter, setCounter] = useState(0);

  const currentUser = useContext(CurrentUserContext);

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
        key={card._id}
        title={card.nameRU}
        length={card.duration}
        img={card.image.url}
        trailer={card.trailerLink}
        buttonType="notLiked"
        // setSelectedCard={props.setSelectedCard}
        // onCardLike={props.onCardLike}
        // onCardDelete={props.onCardDelete}
      />
    );
  }

  return (
    <section className="movies">
      <SearchForm
        setQuery={setQueryMovies}
        setIsShort={setIsShort}
        isShort={isShort}
        setCounter={setCounter}
      />
      <MoviesCardList card={cards} />
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
