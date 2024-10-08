import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { useSelector } from "react-redux";
import Description from "../../shared/Description/Description";

const RandomChar = () => {
  const { name, description, thumbnail, comics } = useSelector(
    (state) => state.randomChar.activeChar
  );
  const { path, extension } = thumbnail;

  return (
    <div className="randomchar">
      <div className="randomchar__block">
        <img
          src={`${path}.${extension}`}
          alt="Random character"
          className="randomchar__img"
        />
        <div className="randomchar__info">
          <p className="randomchar__name">{name}</p>
          <Description text={description} />
          <div className="randomchar__btns">
            <a href="#" className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href="#" className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

export default RandomChar;
