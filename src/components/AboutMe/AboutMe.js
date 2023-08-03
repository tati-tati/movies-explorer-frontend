import "./AboutMe.css";
import "../../blocks/link.css";
import photo from "../../images/Barbie Tati.png";

function AboutMe() {
  return (
    <section className="aboutme">
      <h2 className="aboutme__title title">Студентка</h2>
      <img className="aboutme_photo" alt="фото" src={photo} />
      <h2 className="aboutme__name">Тати</h2>
      <p className="aboutme__subtitle">Фронтенд-разработчик, 30 лет</p>
      <p className="aboutme__text">
        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
        есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно
        начал кодить. С 2015 года работал в компании «СКБ Контур». После того,
        как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и
        ушёл с постоянной работы.
      </p>
      <a className="aboutme__link link" href="https://github.com/tati-tati" target="_blank">
        Github
      </a>
    </section>
  );
}

export default AboutMe;
