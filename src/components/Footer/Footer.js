import "./Footer.css";
import "../../blocks/link.css";


function Footer() {
    return (
      <footer className="footer">
        <p className="footer__credit">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <ul className="footer__link-list">
          <li className="footer__link-unit">
            <a
              className="footer__link link"
              href="https://practicum.yandex.ru/"
              target="_blank"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__link-unit">
            <a
              className="footer__link link"
              href="https://github.com/tati-tati"
              target="_blank"
            >
              Github
            </a>
          </li>
        </ul>
        <p className="footer__year">© 2023</p>
      </footer>
    );
}

export default Footer;