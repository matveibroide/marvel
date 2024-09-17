import "./charList.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadChars, loadChars } from "./CharListSlice";
import Alert from "@mui/material/Alert";
import { Skeleton } from "@mui/material";
import { selectChar } from "../randomChar/RandomCharSlice";

const CharList = () => {
  const dispatch = useDispatch();

  const { chars, loading, offset, btnLoad, error } = useSelector(
    (state) => state.charList
  );

  // Load characters when component mounts
  useEffect(() => {
    dispatch(loadChars());
  }, []);

  // Handle "Go Up" button scroll to top
  const goToPageStart = () => {
    document
      .querySelector(".randomchar__name")
      .scrollIntoView({ behavior: "smooth" });
  };

  // Handle uploading more characters
  const handleUploadChars = () => {
    dispatch(uploadChars(offset));
  };

  const charsUploaded = chars.length > 9;

  return (
    <div className="char__list">
      {error && <Alert severity="error">{error.message}</Alert>}
      {loading && (
        <Skeleton
          sx={{ bgcolor: "grey.200" }}
          animation="wave"
          variant="rounded"
          width={600}
          height={900}
        />
      )}
      {!loading && (
        <ul className="char__grid">
          {chars.map((item) => {
            const { name, id, thumbnail } = item;
            return (
              <li
                onClick={() => dispatch(selectChar(item))}
                key={id}
                className="char__item"
              >
                <img
                  src={`${thumbnail?.path}.${thumbnail?.extension}`}
                  alt={name}
                />
                <div className="char__name">{name}</div>
              </li>
            );
          })}
        </ul>
      )}
      <div className="btns__container">
        <button
          onClick={handleUploadChars}
          className="button button__main button__long"
        >
          <div className="inner">{btnLoad ? "Loading..." : "load more"}</div>
        </button>
        {charsUploaded && (
          <button
            onClick={goToPageStart}
            className="button button__main button__long"
          >
            <div className="inner">Go Up</div>
          </button>
        )}
      </div>
    </div>
  );
};

export default CharList;
