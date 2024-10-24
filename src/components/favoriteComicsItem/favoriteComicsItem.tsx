import React from "react";

type FavoriteComicItemProps = {
  title: string;
  description: string;
  path: string;
  extension: string;
};

const FavoriteComicsItem = ({
  title,
  description,
  path,
  extension,
}: FavoriteComicItemProps) => {
  return (
    <li>
      <img src={`${path}.${extension}`} alt="" />
      <h4>{title}</h4>
      <p>
        {description.length === 0 ? "No description was found" : description}
      </p>
    </li>
  );
};

export default FavoriteComicsItem;
