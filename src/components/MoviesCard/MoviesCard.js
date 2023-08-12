import "./MoviesCard.css";
import img from '../../images/pic__COLOR_pic.jpg';

function MoviesCard(props) {
    return (
      <div className="card">
        <div className="card__info">
          <h2 className="card__title">{props.title}</h2>
          <p className="card__length">{props.length}</p>
          {props.buttonType === "liked" ? (
            <button className="card__like card__like_active button" type="button" />
          ) : props.buttonType === "notLiked" ? (
            <button className="card__like button" type="button" />
          ) : (
            <button className="card__like card__btn-remove button" type="button" />
          )}
        </div>
        <img
          className="card__image"
          src={img}
          alt={`обложка фильма ${props.title}`}
        />
      </div>
    );
}

export default MoviesCard;