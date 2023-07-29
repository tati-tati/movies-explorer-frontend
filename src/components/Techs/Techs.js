import "./Techs.css";
import "../../blocks/title.css";


function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title title">Технологии</h2>
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <div className="techs__container">
        <p className="techs__unit">HTML</p>
        <p className="techs__unit">CSS</p>
        <p className="techs__unit">JS</p>
        <p className="techs__unit">React</p>
        <p className="techs__unit">Git</p>
        <p className="techs__unit">Express.js</p>
        <p className="techs__unit">mongoDB</p>
      </div>
    </section>
  );
}

export default Techs;