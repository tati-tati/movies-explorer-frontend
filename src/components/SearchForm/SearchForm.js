import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "../../blocks/button.css";

function SearchForm() {
    return (
      <form className="search__form">
        <div className="search__container">
          <input className="search__input" placeholder="Фильм"></input>
          <button className="search__btn button" type="submit">
            Найти
          </button>
        </div>
        <FilterCheckbox />
      </form>
    );
}

export default SearchForm;