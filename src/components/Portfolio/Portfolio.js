import "./Portfolio.css";
function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link link"
            href="https://tati-tati.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт<span className="portfolio__link-icon">↗</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link link"
            href="https://tati-tati.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт<span className="portfolio__link-icon">↗</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link link"
            href="https://tati-tati.github.io/mesto/"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
            <span className="portfolio__link-icon">↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
