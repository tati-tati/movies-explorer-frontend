import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";

function SavedMovies() {
      const cards = [
        <MoviesCard
          title="Бег это свобода"
          length="1ч 42м"
        />,
        <MoviesCard
          title="Бег это свобода"
          length="1ч 42м"
        />,
        <MoviesCard
          title="Бег это свобода"
          length="1ч 42м"
        />,
        <MoviesCard
          title="Бег это свобода"
          length="1ч 42м"
        />,
        <MoviesCard
          title="Бег это свобода"
          length="1ч 42м"
        />,
      ];
    return(
        <>
        <SearchForm />
        <MoviesCardList  card={cards}/>
        </>
    )
}

export default SavedMovies;