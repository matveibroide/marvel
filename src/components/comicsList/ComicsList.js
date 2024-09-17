import "./comicsList.scss";

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ComicsList = ({ comics }) => {
  return (
    <ul className="char__comics-list">
      {comics.length > 0 ? (
        comics.map((item) => {
          const { id, title } = item;
          return (
            <Link to={`/comicsinfo/${id}`} key={id}>
              <li className="char__comics-item">{title}</li>
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
