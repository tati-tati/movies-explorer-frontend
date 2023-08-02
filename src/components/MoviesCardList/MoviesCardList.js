import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
    return (
      <section className="card-list">
        <ul className="card-list__container">
          <li className="card-list__item">
            <MoviesCard title="Бег это свобода" length="1ч 42м" />
          </li>
          <li className="card-list__item">
            <MoviesCard title="Бег это свобода" length="1ч 42м" />
          </li>
        </ul>
      </section>
    );
}

export default MoviesCardList;