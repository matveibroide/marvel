import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MarvelService from "../../services/MarvelService";

const initialState = {
  activeChar: {
    id: 1011175,
    name: "Aginar",
    description: "",
    modified: "1969-12-31T19:00:00-0500",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
      extension: "jpg",
    },
    resourceURI: "http://gateway.marvel.com/v1/public/characters/1011175",
    comics: {
      available: 0,
      collectionURI:
        "http://gateway.marvel.com/v1/public/characters/1011175/comics",
      items: [],
      returned: 0,
    },
    series: {
      available: 0,
      collectionURI:
        "http://gateway.marvel.com/v1/public/characters/1011175/series",
      items: [],
      returned: 0,
    },
    stories: {
      available: 0,
      collectionURI:
        "http://gateway.marvel.com/v1/public/characters/1011175/stories",
      items: [],
      returned: 0,
    },
    events: {
      available: 0,
      collectionURI:
        "http://gateway.marvel.com/v1/public/characters/1011175/events",
      items: [],
      returned: 0,
    },
    urls: [
      {
        type: "detail",
        url: "http://marvel.com/characters/105/aginar?utm_campaign=apiRef&utm_source=c4e1bd0e70081aed2a98de5106235fb5",
      },
      {
        type: "wiki",
        url: "http://marvel.com/universe/Aginar?utm_campaign=apiRef&utm_source=c4e1bd0e70081aed2a98de5106235fb5",
      },
      {
        type: "comiclink",
        url: "http://marvel.com/comics/characters/1011175/aginar?utm_campaign=apiRef&utm_source=c4e1bd0e70081aed2a98de5106235fb5",
      },
    ],
  },
  loading: false,
  error: null,
  comics: [],
};

export const loadComics = createAsyncThunk(
  "randomChar/loadComics",
  async (URL, { rejectWithValue }) => {
    try {
      const response = await MarvelService.getComics(URL);
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const randomCharSlice = createSlice({
  name: "randomChar",
  initialState,
  reducers: {
    selectChar(state, action) {
      return {
        ...state,
        activeChar: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadComics.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.comics = action.payload;
      })
      .addCase(loadComics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectChar } = randomCharSlice.actions;
export default randomCharSlice.reducer;
