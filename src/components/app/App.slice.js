import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    },
  },
});

export const { setIsAuthenticated } = appSlice.actions;
export default appSlice.reducer;
