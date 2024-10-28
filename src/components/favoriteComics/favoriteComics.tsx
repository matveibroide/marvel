import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import s from "./favoriteComics.module.scss";
import { Link } from "react-router-dom";
import { Comic } from "../comicsInfo/ComicsInfo";


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





const FavoriteComics = () => {
  const comics = useSelector(
    (state: RootState) => state.profileSlice.favoriteComics
  );

  if (comics.length === 0) {
    return <h1>No comics added yet</h1>;
  }

  return (
    <div>
      <ul className={s.container}>
        {comics.map((comic: Comic) => {
          const {
            title,
            description,
            id,
            thumbnail: { path, extension },
          } = comic;
          return (
            <li key={id}>
              <FavoriteComicsItem
                title={title}
                description={description}
                id={id}
                path={path}
                extension={extension}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FavoriteComics;
