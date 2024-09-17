import { configureStore } from "@reduxjs/toolkit";
import charListReducer from "../components/charList/CharListSlice";
import randomCharReducer from "../components/randomChar/RandomCharSlice";
import appSliceReducer from '../components/app/App.slice'

const store = configureStore({
  reducer: {
    charList: charListReducer,
    randomChar: randomCharReducer,
    appSlice:appSliceReducer
  },
});

export default store;
