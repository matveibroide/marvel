import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MarvelService from "../../services/MarvelService";
import { Alert, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import ComicsList from "../../shared/comicsList/ComicsList";
import { Link } from "react-router-dom";
import "./comicsInfo.scss";

const ComicsInfo = () => {
  const { id } = useParams();
  const [comicsItem, setComicsItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { comics } = useSelector((state) => state.randomChar);
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

  return (
    <div className="comics-info">
      <h1>Comic Info</h1>
      {loading && <Skeleton width={514} height={790} className="loading" />}
      {error && (
        <Alert severity="error" className="error">
          Something went wrong...
        </Alert>
      )}
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
      <ComicsList comics={comics} />
      <Link to={"/"}>
        <button className="button button__main button__long">
          <div className="inner">Home Page</div>
        </button>
      </Link>
    </div>
  );
};

export default ComicsInfo;
