import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MarvelService from "../../services/MarvelService";
import { Alert, Skeleton } from "@mui/material";
import "./comicsInfo.scss";


const ComicsInfo = () => {
  const { id } = useParams();
  const [comicsItem, setComicsItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    MarvelService.getComicsItemInfo(id)
      .then((data) => {
        setComicsItem(data.data.results[0]);
        setLoading(false);
        setError(null);
      })
      .catch((e) => setError(e));
  }, [id]);

  return (
    <div className="comics-info">
      <h1>Comic Info</h1>
      {loading && <Skeleton className="loading" />}
      {error && (
        <Alert severity="error" className="error">
          Something went wrong...
        </Alert>
      )}
      {comicsItem && (
        <div className="comics-details">
          <h2>{comicsItem.title}</h2>
          <p>{comicsItem.description || "No description available"}</p>
          <img
            src={`${comicsItem.images[0].path}.${comicsItem.images[0].extension}`}
            alt={comicsItem.title}
          />
        </div>
      )}
    </div>
  );
};

export default ComicsInfo;
