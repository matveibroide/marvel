import "./comicsList.scss";

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useRef } from "react";

const ComicsList = ({ comics }) => {
  const [activeComicId, setActiveComicId] = useState(null);

  const render = useRef(0);
  render.current += 1;
  console.log(`ComicsList render:${render.current}`);

  return (
    <ul className="char__comics-list">
      {comics.length > 0 ? (
        comics.map((item) => {
          const { id, title } = item;
          const isActive = id === activeComicId;
          return (
            <Link
              onClick={() => setActiveComicId(id)}
              to={`/comicsinfo/${id}`}
              key={id}
            >
              <li
                className={`comics__item ${
                  isActive ? "comics__item--active" : ""
                }`}
              >
                {title}
              </li>
            </Link>
          );
        })
      ) : (
        <li className="char__comics-item">No comics available</li>
      )}
    </ul>
  );
};

ComicsList.propTypes = {
  comics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ComicsList;
