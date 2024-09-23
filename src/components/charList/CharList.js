import "./charList.scss";
import { useEffect, useRef, memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadChars, loadChars } from "./CharListSlice";
import Alert from "@mui/material/Alert";
import { Skeleton } from "@mui/material";
import { selectChar } from "../randomChar/RandomCharSlice";
import { checkAuthentication } from "../../utils/authUtils";
import { AlertComponent } from "../../shared/alert/Alert";

const CharList = memo(() => {
  const dispatch = useDispatch();
  const [isAlert, setIsAlert] = useState(false);

  const { chars, loading, offset, btnLoad, error } = useSelector(
    (state) => state.charList
  );

  const { isAuthenticated } = useSelector((state) => state.appSlice);

  // Load characters when component mounts
  useEffect(() => {
    dispatch(loadChars());
  }, []);

  const goToPageStart = useCallback(() => {
    document
      .querySelector(".randomchar__name")
      .scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleUploadChars = useCallback(() => {
    dispatch(uploadChars(offset));
  }, [dispatch, offset]);

  const handleCharSelect = useCallback(
    (item) => {
      const isAuth = checkAuthentication(isAuthenticated, () => {
        dispatch(selectChar(item));
      });
      if (!isAuth) {
        if (!isAlert) {
          setIsAlert(true);
        }
      }
    },
    [dispatch, isAuthenticated]
  );

  const charsUploaded = chars.length > 9;

  const handleCloseAlert = () => {
    setIsAlert(false);
  };

  return (
    <div className="char__list">
      {isAlert && (
        <AlertComponent
          open={isAlert}
          onClose={handleCloseAlert}
          message="You have to be logged in!"
        />
      )}
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
                onClick={() => handleCharSelect(item)}
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
});

export default CharList;
