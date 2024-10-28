import { Link } from "react-router-dom";
import s from "./favoriteComicsItem.module.scss";

type FavoriteComicItemProps = {
  title: string;
  description: string;
  path: string;
  extension: string;
  id: number;
};

export const FavoriteComicsItem = ({
  title,
  description,
  path,
  extension,
  id,
}: FavoriteComicItemProps) => {
  return (
    <Link to={`/comicsinfo/${id}`}>
      <li className={s["favorite-comic-item"]}>
        <img src={`${path}.${extension}`} alt={title} />
        <h4>{title}</h4>
        <p>
          {description.length === 0 ? "No description was found" : description}
        </p>
      </li>
    </Link>
  );
};


