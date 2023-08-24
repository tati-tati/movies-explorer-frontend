import "./MoviesCardList.css";
// import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    <section className="card-list">
      {props.errorMessage ? "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз" : props.card.length === 0 ? (
        "Ничего не найдено"
      ) : (
        <ul className="card-list__container">
          <li className="card-list__item">{props.card}</li>
        </ul>
      )}
      
    </section>
  );
}

export default MoviesCardList;
