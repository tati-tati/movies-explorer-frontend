import "./PageNotFound.css";

function PageNotFound() {
    return (
        <section className="page-not-found">
            <h1 className="page-not-found__title">404</h1>
            <h2 className="page-not-found__subtitle">Страница не найдена</h2>
<button className="page-not-found__btn-back">Назад</button>
        </section>

    );
}

export default PageNotFound;