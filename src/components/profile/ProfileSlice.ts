import { createSlice } from "@reduxjs/toolkit";
import { Comic } from "../comicsInfo/ComicsInfo";

interface profileState {
  favoriteComics: Comic[];
}

const initialState: profileState = {
  favoriteComics: [],
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    addToFavoirte: (state, action) => {
      const index = state.favoriteComics.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        return {
          favoriteComics: [
            ...state.favoriteComics.slice(0, index),
            ...state.favoriteComics.slice(index + 1),
          ],
        };
      }

      return {
        favoriteComics: [...state.favoriteComics, action.payload],
      };
    },
  },
});

export default profileSlice.reducer;

export const { addToFavoirte } = profileSlice.actions;
