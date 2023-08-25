import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useState } from "react";

function SavedMovies(props) {
  const [querySavedMovies, setQuerySavedMovies] = useState("");
  const [isShortSaved, setIsShortSaved] = useState(false);

  //фильтрация
  let filteredSavedMovies = props.savedMovies.filter((movie) => {
    return (
      movie.nameEN.toLowerCase().includes(querySavedMovies.toLowerCase()) ||
      movie.nameRU.toLowerCase().includes(querySavedMovies.toLowerCase())
    );
  });
  if (isShortSaved) {
    filteredSavedMovies = filteredSavedMovies.filter((movie) => {
      return movie.duration < 41;
    });
  }

  //отрисовка
  const cards = filteredSavedMovies.map((card) => {
    return createCard(card);
  });

  function createCard(card) {
    return (
      <MoviesCard
        key={card._id}
        id={card.movieId}
        title={card.nameRU}
        length={card.duration}
        img={card.image}
        trailer={card.trailerLink}
        buttonType={card.class}
        onMovieDelete={props.onMovieDelete}
      />
    );
  }
  
  return (
    <>
      <SearchForm
        setQuery={setQuerySavedMovies}
        queryMovies={querySavedMovies}
        setIsShort={setIsShortSaved}
        isShort={isShortSaved}
      />
      <MoviesCardList card={cards} />
    </>
  );
}

export default SavedMovies;
