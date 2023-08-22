import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { getInitialMovies } from "../../utils/MoviesApi";

function Movies(props) {
  const [queryMovies, setQueryMovies] = useState("");
  const [isShort, setIsShort] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  // getInitialMovies()
  //   .then((res) => {
  //     console.log("getInitialMovies", res);

  //     props.setMovies(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  let filteredMovies = props.movies.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(queryMovies.toLowerCase());
  });

  if (isShort) {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.duration < 40;
    });
  }
  console.log(filteredMovies.length);
  
  const cards = filteredMovies.map((card) => {
    return createCard(card);
  });

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
      />
      <MoviesCardList card={cards} />
      <button className="movies__btn-more button" type="button">
        Ещё
      </button>
    </section>
  );
}

export default Movies;
