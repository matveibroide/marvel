import { configureStore } from "@reduxjs/toolkit";
import charListReducer from "../components/charList/CharListSlice";
const store = configureStore({
  reducer: {
    charList: charListReducer,
  },
});

export default store;
