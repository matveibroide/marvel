import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MarvelService from "../../services/MarvelService";
import { ApiError } from "./CharList";
import { Character } from "./CharList";

// Thunk to handle loading characters
export const loadChars = createAsyncThunk(
  "charList/loadChars",
  async (offset: number = 9, { rejectWithValue }) => {
    try {
      const response = await MarvelService.getAllCharacters(offset);
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk to handle uploading more characters
export const uploadChars = createAsyncThunk(
  "charList/uploadChars",
  async (offset: number = 9, { getState, rejectWithValue }) => {
    try {
      const response = await MarvelService.getAllCharacters(offset);
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface CharListState {
  chars: Character[];
  loading: boolean;
  offset: number;
  btnLoad: boolean;
  error: ApiError | null;
}

const initialState: CharListState = {
  chars: [],
  loading: false,
  offset: 18,
  btnLoad: false,
  error: null,
};

const charListSlice = createSlice({
  name: "charList",
  initialState,
  reducers: {
    setOffset(state, action) {
      state.offset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loadChars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadChars.fulfilled, (state, action) => {
        state.chars = action.payload;
        state.loading = false;
      })
      .addCase(loadChars.rejected, (state, action) => {
        state.loading = false;
        if (action.payload instanceof Error) {
          state.error = action.payload;
        }
      })

      // uploadChars case
      .addCase(uploadChars.pending, (state) => {
        state.btnLoad = true;
        state.error = null;
      })
      .addCase(uploadChars.fulfilled, (state, action) => {
        state.chars = [...state.chars, ...action.payload];
        state.offset += 9;
        state.btnLoad = false;
      })
      .addCase(uploadChars.rejected, (state, action) => {
        state.loading = false;
        if (action.payload instanceof Error) {
          state.error = action.payload;
        }
      });
  },
});

// Export actions and reducer
export const { setOffset } = charListSlice.actions;
export default charListSlice.reducer;
