import "./MoviesCard.css";
import img from '../../images/pic__COLOR_pic.png';

function MoviesCard(props) {
    return (
      <div className="card">
        <div className="card__info">
          <h2 className="card__title">{props.title}</h2>
          <p className="card__length">{props.length}</p>
          <div className="card__like card__like_active" />
        </div>
        <img className="card__image" src={img} alt={props.title} />
      </div>
    );
}

export default MoviesCard;