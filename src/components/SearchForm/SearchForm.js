import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "../../blocks/button.css";
import { useState } from "react";

function SearchForm(props) {
  const [input, setInput] = useState('');

  function handleSubmit(evt) {
  evt.preventDefault();
   props.setQuery(input);
   console.log(input);

  }
  function handleInput(evt) {
     setInput(evt.target.value);
  }
    return (
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__container">
          <input
            className="search__input"
            placeholder="Фильм"
            onChange={handleInput}
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