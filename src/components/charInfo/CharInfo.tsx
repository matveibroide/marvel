import "./charInfo.scss";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import Description from "../../shared/Description/Description";
import { useDispatch } from "react-redux";
import ComicsList from "../../shared/comicsList/ComicsList";

const CharInfo = () => {
  const { name, description, thumbnail, id } = useSelector(
    (state: RootState) => state.randomChar.activeChar
  );

  const { path, extension } = thumbnail;

  return (
    <div className="char__info">
      <div className="char__basics">
        <img src={`${path}.${extension}`} alt="abyss" />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href="#" className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href="#" className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <Description text={description} />
      <div className="char__comics">Comics:</div>
      <ComicsList />
    </div>
  );
};

export default CharInfo;
