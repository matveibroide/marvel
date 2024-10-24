import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import FavoriteComicsItem from "../favoriteComicsItem/favoriteComicsItem";

const FavoriteComics = () => {
  const favoriteComics = useSelector(
    (state: RootState) => state.profileSlice.favoriteComics
  );

  if (favoriteComics) {
    return (
      <div>
        {favoriteComics.length === 0 && <h4>You didn't add any comics yet</h4>}
        <ul>
          {favoriteComics.map((item) => {
            const {
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
