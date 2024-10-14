import "./comicsList.scss";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

interface Comic {
  resourceURI: string;
  name: string;
}

const ComicsList = () => {
  const [activeComicId, setActiveComicId] = useState<string | null>(null);

  const { items: comics } = useSelector(
    (state: RootState) => state.randomChar.activeChar.comics
  );

  const handleComicSelect = (id: string) => {
    if (typeof id === "string") {
      setActiveComicId(id);
    } else {
      return;
    }
  };

  return (
    <ul className="char__comics-list">
      {comics.length > 0 ? (
        comics.map((item: Comic) => {
          const { resourceURI, name } = item;
          const id = resourceURI.split("/").pop() ?? "62151";
          const isActive = id === activeComicId;
          console.log(id);

          return (
            <Link
              onClick={() => handleComicSelect(id)}
              to={`/comicsinfo/${id}`}
              key={id}
            >
              <li
                className={`comics__item ${
                  isActive ? "comics__item--active" : ""
                }`}
              >
                {name}
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

export default ComicsList;
