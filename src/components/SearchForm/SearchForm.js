import "./SearchForm.css";
import "../../blocks/button.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
  const [input, setInput] = useState(props.queryMovies);

  const location = useLocation();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.setQuery(input);
    props.setCounter(0);
  }

  function handleSubmitSaved(evt) {
    evt.preventDefault();
    props.setQuery(input);
  }

  function handleInput(evt) {
    setInput(evt.target.value);
  }
  
  return (
    <form
      className="search__form"
      onSubmit={
        location.pathname === "/movies" ? handleSubmit : handleSubmitSaved
      }
    >
      <div className="search__container">
        <input
          className="search__input"
          placeholder="Фильм"
          onChange={handleInput}
          value={input}
        ></input>
        <button className="search__btn button" type="submit">
          Найти
        </button>
      </div>
      <FilterCheckbox setIsShort={props.setIsShort} isShort={props.isShort} />
    </form>
  );
}

export default SearchForm;
