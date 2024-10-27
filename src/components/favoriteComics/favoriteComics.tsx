import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import FavoriteComicsItem from "../favoriteComicsItem/FavoriteComicsItem";
import s from "./favoriteComics.module.scss";

const FavoriteComics = () => {
  const favoriteComics = useSelector(
    (state: RootState) => state.profileSlice.favoriteComics
  );

  if (favoriteComics) {
    return (
      <div>
        {favoriteComics.length === 0 && <h4>You didn't add any comics yet</h4>}
        {favoriteComics.length > 0 && (
          <h1 className={s.header}>Favorite comics</h1>
        )}
        <ul className={s.favoriteComics}>
          {favoriteComics.map((item) => {
            const {
              id,
              title,
              description,
              thumbnail: { path, extension },
            } = item;
            return (
              <FavoriteComicsItem
                path={path}
                extension={extension}
                title={title}
                description={description}
                id={id}
              />
            );
          })}
        </ul>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default FavoriteComics;
