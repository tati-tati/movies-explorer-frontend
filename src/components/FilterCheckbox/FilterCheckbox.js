import { useState } from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(props) {
  const [isChecked, setIsChecked] = useState(props.isShort);

  function handleToggle() {
    const newCheckStatus = !isChecked;
    setIsChecked(newCheckStatus);
    props.setIsShort(newCheckStatus);
  }

  return (
    <label className="checkbox__label">
      <input
        className="checkbox__input"
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
      <span className="checkbox__design" />
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
