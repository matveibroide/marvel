import "./charInfo.scss";
import { useSelector } from "react-redux";
import Description from "../../shared/description/Description";
import { loadComics } from "../randomChar/RandomCharSlice";
import { useEffect, memo, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { Alert, Skeleton } from "@mui/material";
import ComicsList from "../../shared/comicsList/ComicsList";

const CharInfo = () => {
  const dispatch = useDispatch();

  const render = useRef(0);
  render.current += 1;
  console.log(`CharInfo render:${render.current}`);

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

  const memoizedComics = useMemo(() => comics, [comics]);

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
        <ComicsList comics={memoizedComics} />
      )}
    </div>
  );
};

export default CharInfo;
