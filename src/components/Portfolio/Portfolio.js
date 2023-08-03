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
          >
            Статичный сайт<span className="portfolio__link-icon">↗</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link link"
            href="https://tati-tati.github.io/russian-travel/"
            target="_blank"
          >
            Адаптивный сайт<span className="portfolio__link-icon">↗</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link link"
            href="https://tati-tati.github.io/react-mesto-auth/"
            target="_blank"
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
