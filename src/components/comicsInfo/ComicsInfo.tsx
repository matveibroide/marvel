import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MarvelService from "../../services/MarvelService";
import { Skeleton, Snackbar, SnackbarContent } from "@mui/material";
import ComicsList from "../../shared/comicsList/ComicsList";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToFavoirte } from "../profile/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";

import "./comicsInfo.scss";
import { RootState } from "../../store/store";

export interface Comic {
  title: string;
  description: string;
  images: { path: string; extension: string }[];
  id: number;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const ComicsInfo = () => {
  const { id } = useParams();
  const [comicsItem, setComicsItem] = useState<Comic | null>(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const favoriteComics = useSelector(
    (state: RootState) => state.profileSlice.favoriteComics
  );
  let isInFavorite = false;

  if (id) {
    isInFavorite = favoriteComics.find((item) => +item.id === +id)
      ? true
      : false;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    MarvelService.getComicsItemInfo(id)
      .then((data) => {
        setError(null);
        setComicsItem(data.data.results[0]);
        setLoading(false);
      })
      .catch((e) => setError(e));
  }, [id]);

  const handleFavoriteIconClick = () => {
    dispatch(addToFavoirte(comicsItem));
    setIsAlert(true);
  };

  return (
    <div className="comics-info">
      {isAlert && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          open={isAlert}
          message={isInFavorite ? "Added to favorite" : "Deleted from favorite"}
          autoHideDuration={2000}
          onClose={() => setIsAlert(false)}
        >
          <SnackbarContent
            message={
              isInFavorite ? "Added to favorite" : "Deleted from from favorite"
            }
            sx={{
              backgroundColor: `${isInFavorite ? "#50c053" : "#d91111"}`,
              color: "white",
            }} // Custom background
          />
        </Snackbar>
      )}
      <div className="comics-header">
        <h1>Comic Info</h1>{" "}
        {!loading && (
          <FavoriteIcon
            onClick={handleFavoriteIconClick}
            className={isInFavorite ? "favorite-icon" : ""}
          />
        )}
      </div>
      {loading && <Skeleton width={514} height={790} className="loading" />}
      {error && <Alert severity="error">'Something went wrong...'</Alert>}
      {!loading && (
        <div className="comics-details">
          <h2>{comicsItem?.title || "No title available"}</h2>
          <p>{comicsItem?.description || "No description available"}</p>
          <img
            src={`${comicsItem?.images[0]?.path}.${comicsItem?.images[0]?.extension}`}
            alt={comicsItem?.title}
          />
        </div>
      )}
      <ComicsList />
      <Link to={"/"}>
        <button className="button button__main button__long">
          <div className="inner">Home Page</div>
        </button>
      </Link>
    </div>
  );
};

export default ComicsInfo;
