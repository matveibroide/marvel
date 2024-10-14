import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { useDispatch, useSelector } from "react-redux";
import Description from "../../shared/Description/Description";
import { selectChar } from "./RandomCharSlice";
import { RootState } from "../../store/store";
import { Character } from "../charList/CharList";

const RandomChar = () => {
  const dispatch = useDispatch();
  const { name, description, thumbnail} = useSelector(
    (state: RootState) => state.randomChar.activeChar
  );

  const { chars } = useSelector((state: RootState) => state.charList);

  const { path, extension } = thumbnail;

  const selectRandomChar = (chars : Character[] = []) => {
    const randomChar = chars[Math.floor(Math.random() * chars.length)];
    dispatch(selectChar(randomChar));
  };

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
        <button
          onClick={() => selectRandomChar(chars)}
          className="button button__main"
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

export default RandomChar;
