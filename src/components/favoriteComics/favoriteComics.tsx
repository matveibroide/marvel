import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import s from './favoriteComics.module.scss'
import FavoriteComicsItem from "../favoriteComicsItem/FavoriteComicsItem";
import { Comic } from "../comicsInfo/ComicsInfo";

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
        {comics.map((comic:Comic) => {
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
