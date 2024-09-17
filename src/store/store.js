import { configureStore } from "@reduxjs/toolkit";
import charListReducer from "../components/charList/CharListSlice";
import randomCharReducer from "../components/randomChar/RandomCharSlice";

const store = configureStore({
  reducer: {
    charList: charListReducer,
    randomChar: randomCharReducer,
  },
});

export default store;
