import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <label className="checkbox__label">
      <input className="checkbox__input" type="checkbox" />
      <span className="checkbox__design" />
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
