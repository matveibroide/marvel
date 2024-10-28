import "./charList.scss";
import { useEffect, memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadChars, loadChars } from "./CharListSlice";
import Alert from "@mui/material/Alert";
import { Skeleton } from "@mui/material";
import { selectChar } from "../randomChar/RandomCharSlice";
import { checkAuthentication } from "../../utils/authUtils";
import { AlertComponent } from "../../shared/alert/Alert";
import { RootState, AppDispatch } from "../../store/store";

export interface Character {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  description: string;
}

export interface ApiError {
  message: string;
}

const isApiError = (error: unknown): error is ApiError => {
  return typeof error === "object" && error !== null && "message" in error;
};

const CharList = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const [isAlert, setIsAlert] = useState(false);

  const { chars, loading, offset, btnLoad, error } = useSelector(
    (state: RootState) => state.charList
  );

  const { isAuthenticated } = useSelector((state: RootState) => state.appSlice);

  useEffect(() => {
    dispatch(loadChars(9));
  }, [dispatch]);

  const goToPageStart = useCallback(() => {
    document
      .querySelector(".randomchar__name")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleUploadChars = useCallback(() => {
    dispatch(uploadChars(offset));
  }, [dispatch, offset]);

  const handleCharSelect = useCallback(
    (item: Character) => {
      const isAuth = checkAuthentication(isAuthenticated, () => {
        dispatch(selectChar(item));
      });
      if (!isAuth) {
        if (!isAlert) {
          setIsAlert(true);
        }
      }
    },
    [dispatch, isAuthenticated, isAlert]
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
          type="error"
        />
      )}
      {error && isApiError(error) && (
        <Alert severity="error">{error.message}</Alert>
      )}
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
          {chars.map((item: Character) => {
            // Typing item as Character
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
