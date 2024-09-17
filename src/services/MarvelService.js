const BASE_API = "https://gateway.marvel.com:443/v1/public";
const KEY = "c4e1bd0e70081aed2a98de5106235fb5";

class MarvelService {
  static getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Something gone wrong in get Resource");
    } else {
      return res.json();
    }
  };

  static getAllCharacters = (offset = 9) => {
    return this.getResource(
      `https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=${KEY}`
    );
  };

  static getComics = (id) => {
    return this.getResource(
      `${BASE_API}/comics?characters=${id}id&apikey=${KEY}`
    );
  };

  static getComicsItemInfo = (id) => {
    return this.getResource(`${BASE_API}/comics/${id}?apikey=${KEY}`);
  };
}

export default MarvelService;
