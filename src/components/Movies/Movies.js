import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import MoviesCard from "../MoviesCard/MoviesCard";
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
// import { useContext } from "react";

function Movies(props) {
  // const currentUser = useContext(CurrentUserContext);

  // function initialCards () {
  //   const cards = props.movies;
  //   for(let i=0; i <= 10; i++) {

  //   }
  // }
  
  const cards = props.movies.map((card) => {
    return (
      <MoviesCard
        key={card._id}
        title={card.nameRU}
        length={card.duration}
        img={card.image.url}
        buttonType='notLiked'
        // setSelectedCard={props.setSelectedCard}
        // onCardLike={props.onCardLike}
        // onCardDelete={props.onCardDelete}
      />
    );
  });

  function createCard(card) {
    return (
      <MoviesCard
        key={card._id}
        title={card.nameRU}
        length={card.duration}
        img={card.image.url}
        buttonType='notLiked'
        // setSelectedCard={props.setSelectedCard}
        // onCardLike={props.onCardLike}
        // onCardDelete={props.onCardDelete}
      />
    );
  }

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList card={cards} />
      <button className="movies__btn-more button" type="button">
        Ещё
      </button>
    </section>
  );
}

export default Movies;
