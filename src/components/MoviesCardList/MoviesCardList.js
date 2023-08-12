import "./MoviesCardList.css";
// import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    return (
      <section className="card-list">
        <ul className="card-list__container">
          <li className="card-list__item">
            {props.card}
          </li>
        </ul>
      </section>
    );
}

export default MoviesCardList;