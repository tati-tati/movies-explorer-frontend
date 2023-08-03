import './AboutProject.css';
import '../../blocks/title.css';

function AboutProject() {
    return (
      <section className="project">
        <h2 className="project__title title">О проекте</h2>
        <article className="project__container">
          <p className="project__subtitle">Дипломный проект включал 5 этапов</p>

          <p className="project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
          <p className="project__subtitle">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </article>

        <div className="project__scale">
          <p className="project__week">1 неделя</p>
          <p className="project__weeks">4 недели</p>
          <p className="project__underline">Back-end</p>
          <p className="project__underline">Front-end</p>
        </div>
      </section>
    );
}

export default AboutProject;