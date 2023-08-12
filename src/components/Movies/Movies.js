import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import MoviesCard from "../MoviesCard/MoviesCard";


function Movies() {
  const cards = [
    <MoviesCard title="Бег это свобода" length="1ч 42м" buttonType="liked" />,
    <MoviesCard
      title="Бег это свобода"
      length="1ч 42м"
      buttonType="notLiked"
    />,
    <MoviesCard
      title="Бег это свобода"
      length="1ч 42м"
      buttonType="notLiked"
    />,
    <MoviesCard
      title="Бег это свобода"
      length="1ч 42м"
      buttonType="notLiked"
    />,
    <MoviesCard
      title="Бег это свобода"
      length="1ч 42м"
      // buttonType="notLiked"
    />,
  ];
           

    return (
      <section className="movies">
        <SearchForm />
        <MoviesCardList card={cards}/>
        <button className="movies__btn-more button" type="button">
          Ещё
        </button>
      </section>
    );
}

export default Movies;