import "./MoviesCard.css";
import { IMG_BASE_URL } from "../../utils/constants";

function MoviesCard(props) {
  function countLength() {
    const hours = Math.floor(props.length / 60);
    const minutes = props.length % 60;
    if (hours === 0) {
      return `${minutes}м`;
    } else if (minutes === 0) {
      return `${hours}ч`;
    }
    return `${hours}ч ${minutes}м`;
  }

  return (
    <div className="card" key={props.key}>
      <div className="card__info">
        <h2 className="card__title">{props.title}</h2>
        <p className="card__length">{countLength()}</p>
        {props.buttonType === "liked" ? (
          <button
            className="card__like card__like_active button"
            type="button"
          />
        ) : props.buttonType === "notLiked" ? (
          <button className="card__like button" type="button" />
        ) : (
          <button
            className="card__like card__btn-remove button"
            type="button"
          />
        )}
      </div>
      <a className="card__trailer-link" href={props.trailer} target="_blank">
        <img
          className="card__image"
          src={`${IMG_BASE_URL}${props.img}`}
          alt={`обложка фильма ${props.title}`}
        />
      </a>
    </div>
  );
}

export default MoviesCard;
