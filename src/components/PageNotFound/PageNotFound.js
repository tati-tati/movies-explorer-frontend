import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <section className="page-not-found">
      <h1 className="page-not-found__title">404</h1>
      <h2 className="page-not-found__subtitle">Страница не найдена</h2>
      <button className="page-not-found__btn-back" onClick={goBack}>
        Назад
      </button>
    </section>
  );
}

export default PageNotFound;
