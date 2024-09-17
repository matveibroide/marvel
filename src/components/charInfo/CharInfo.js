import "./charInfo.scss";
import { useSelector } from "react-redux";
import Description from "../../shared/Description/Description";
import { loadComics } from "../randomChar/RandomCharSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Alert, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import ComicsList from "../../shared/comicsList/ComicsList";

const CharInfo = () => {
  const dispatch = useDispatch();

  console.log("render");

  const { name, description, thumbnail, id } = useSelector(
    (state) => state.randomChar.activeChar
  );
  const { comics, loading, error } = useSelector((state) => state.randomChar);
  const { path, extension } = thumbnail;

  useEffect(() => {
    if (id) {
      dispatch(loadComics(id));
    }
  }, [id]);

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
      {error && <Alert severity="error">Couldn't load comics...</Alert>}
      {loading ? (
        <ul className="char__fake-list">
          {Array(10)
            .fill()
            .map((_, i) => (
              <Skeleton
                key={i}
                sx={{ margin: "10px 0" }}
                variant="rectangular"
                width={375}
                height={25}
              />
            ))}
        </ul>
      ) : (
        <ComicsList comics={comics} />
      )}
    </div>
  );
};

export default CharInfo;
